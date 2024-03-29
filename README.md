![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/renansko/d1f9a5938ef6ba5bd3694b8176caab66/raw/Node-With-Solid__heads_master.json)

# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

# Configuração developer:
Resumo de como foi configurado o projeto

### Dependencias do projeto:
```powershell
# Desenvolvimento
npm i typescript @types/node tsx tsup -D
npm i fastify

# Eslitização
npm i eslint
"npx eslint --init"

#Variaveis ambiente
npm i dotnet
npm i zod

# ORM
npm i prisma -D
"npx prisma init"
"npx prisma generate" -> criar tipagem
npm i @prisma/client

```

scripts:

```JSON
"dev": "tsx watch src/server.ts",
"start": "node build/server.js",
"build": "tsup src --out-dir build"
```

### Arquivos de configuração

**Eslint**
- .eslintignore -> ignorar arquivos que não é necessario a estilização
- .eslintrc.json -> para configuração da estilização

**typescript**
- tsconfig.json -> configuração para o typescript
- ```JSON 
    "baseUrl": "./", /* Specify the base directory to resolve non-relative module names. */
    
    # Conversão para node, aceita a versão 2020
    "target": "ES2020",  

    # essa configuração server para criar alias do caminho de arquivos
    "paths": {
      "@/*": ["./src/*"]
    },     
    ```
**npm**
- .npmrc -> configuração das dependencias node
- ```save-exact=true ``` essa configuração faz com que as versões das dependencias se mantenham a mesma

**env**
- .env -> todas variaveis de ambiente que vamos utilizar no projeto

# ORM - Object Relational Mapper

**Criando tipagem para schema**
- ``` npx prisma generate ```
- integração typescript com prisma, ele vai criar tipagem para os arquivos orm/prisma

**Primas em produção para acessar o banco de dados**
- ``` npm i @prisma/client  ```
- Com a dependencia client baixada podemos manipular o prisma, exemplo abaixo:
    - ```typescript
        import { PrismaClient } from '@prisma/client' 
        
        prisma.user.create({
                data: {
                name: 'Fulano',
                email: 'Fulano@gmail.com',
            },
        }) 
        ```
## Docker para o banco de dados
- Vamos subir nossa imagem do banco de dados postegres no docker
- Criamos um container que contenha o "postgres" configurado "user/password"
- Rodamos o comando a seguir para subir o conteiner 
    - ```powershell
        docker pull -e POSTGRESQL_USERNAME=my_user -e POSTGRESQL_PASSWORD=password123 -e POSTGRESQL_DATABASE=my_database -p 5432:5432 bitnami/postgresql:latest 
        ```
- **docker pull** faz o pull da imagaem do BD
- **-e** variaveis de ambiente do banco
- **-p** qual a porta que ele escuta e fala do banco

Com o docker inicializado temos nosso banco de dados rodando, para testar podemos gerar nossas migrations ("*controle de versionamento bd*"):
-   ```powershell
    npx prisma migrate dev 
    ```

E então para visualizar o bd acessar um editor de banco ex: Beekeper/DBever ou com o prisma rodar esse comando:
- ```powershell
    npx prisma studio   
    ```
## Docker compose

Docker compose é uma ferramenta do docker para deixar claro as açoes que o docker deve seguir para subir o container.
Você configura o docker e o que ele deve fazer.

exemplo de um arquivo docker-compose.yml - o arquivo .yml precisa ter uma identação expecifica
```docker
    version: '3'

    services:
    api-solid-pg:
        image: bitnami/postgresql
        ports:
        - 5432:5432
        environment:
        - POSTGRESQL_USERNAME=docker
        - POSTGRESQL_PASSWORD=docker
        - POSTGRESQL_DATABASE=apisolid

```

aqui é configurado um serviço "container" **chamado api-solid-pg** pegando a imagem: **bitnami/postgresql** e setando as demais variaveis:
- ports -> porta que o docker escuta e disponibiliza
- variaveis de ambiente, nesse caso configuramos para o ambiente de um banco "postgres"

#  Prisma criação de tabelas e relacionamento

No arquivo de schemas do prisma vamos configurar as tabelas e colunas de nosso banco de dados, para criar uma nova tabela utilizamos o '**model** "nome da tabela"{"**colunas**   *tipo da coluna*"}'
### Criação de tabela
- Exemplo:
    - ```prisma 
        model Exemple{
        "colunas"
        }

        ```

### Criação de coluna
Colunas com prismas são de facil adição, colocamos o "nome" "tipo" 'opções': a baixo vamos criar um **id** tipo string que tem um valod default = uuid e outra coluna description com o tipo String

- Exemlpo:
    - ```prisma 
        model Exemple{
        id      String @id @default(uuid())
        description String
        }

        ```

### Criação de relacionamento
Criar relacionamento entre tabelas pode ser facil caso você tenha configurado o eslint para verificar o prisma, para isso se você tiver o eslint já configurado basta adicionar esse json nas configurações de usuario:

```JSON 
"[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
    "editor.formatOnSave": true
    }
``` 

Para relacionar as colunas então basta colocar um "nome" para esse relacionamento e a "tabela" que sera relacionada: **'gym    Gym'** o eslint configura automaticamente.

Exemplo:
- ```prisma
    model Gym {
    id          String   @id @default(uuid())

    checkIns    Chekin[]

    @@map("gyms")
    }

    model Chekin {
    id           String    @id @default(uuid())
    gym    Gym    @relation(fields: [gyn_id], references: [id])
    gyn_id String

    @@map("check_ins")
    }
    ```

A tabela gym está sendo relacionada referenciando seu campo "id" da tabela propria "Gym" no campo criado "gyn_id" no "Chekin". Depois que definimos a relação é criada um campo nas duas tabelas que vai ser a coluna que contem essa relação, no caso na tabela 

- Gym: 'chekIns Chekin[] -> chekIns é uma coluna que contem uma lista de chekIns'
- Chekin: 'gyn_id String -> é o id de qual Gym ele pertence'

### Hash De senha:

Biblioteca para hash:
```sh
    npm i -D bcryptjs
    npm i -D @types/bcryptjs
```

### Design Patterns
Separação de funcionalidades da API, é separado nos arquivos algumas funções na pasta

"controllers" vai ser responsavel pela entrada de dados e o retorno dela. \
"Services/Use-Case" Manipulação desses dados da forma que for necessaria.

- Pastas Controller
    - ele vai receber os dados idependende de como chega, e controlar para aonde será enviado esses dados, dependendo de qual controller ele é, depois retorna qual foi o resultado se deu um erro ou sucesso
    - Controller pode pegar uma requisição HTTP ou informações de uma mensageria enviar para use-case/Services tratar esses dados, e então retornar seu resultado.

- Pastas use-case
    - casos de uso da aplicação, por exemplo o cadastro de um usuario, verificando e tratando os dados da maneira requisitada no projeto.
    - registrar algum registro e retornar se esse registro estava com erro ou retornar um sucesso.

### Repository Pattern  

*-* Pasta repositoriers
- todo codigo de comunicação com o "banco de dados" pode ser separado assim facilitando a mudança, aonde você salve e como salva os dados em um tipo de banco.

### SOLID

### D - Dependency inversion Principle

Utilizamos essa inversão de dependencias para testes também, quando separamos a instancia do repositorio do Prisma para outro arquivo, podemos utilizar qualquer outro tipo de repositorio quando instanciamos o registerUseCase.

Por exemplo; no cenario de testes existe um patern chamado 'InMemoryTest DataBase', que nada mais é que um fake repositorio feito para simular um banco de dados em memoria.

Do mesmo jeito que a clase do prisma repositories utiliza a interface do userRepository ela também utilizara, porem invez de usar o prisma que é uma ORM ele vai usar apenas a **'Array[]** do javaScript

# Testes

### Vitest

Para essa aplicação sera utilizado a biblioteca "vitest" para realizar os testes de nossas aplicações.

### Instalando vitest:
```Powershell
npm i vitest vite-tsconfig-paths -D
```

criamos um arquivo chamado 'vite.config.ts' e colocamos o seguinte conteudo nele:

```TS
    import { defineConfig } from 'vitest/config'
    import tsconfigPaths from 'vite-tsconfig-paths'

    export default defineConfig({
    plugins: [tsconfigPaths()],
    })
```

ao intalar o vitest podemos verificar se está ok criando um arquivo, "register.spec.ts" com o seguinte conteudo dentro dele:

```TS 
    import { expect, test } from 'vitest'

    test('check if it works', () => {
    expect(2 + 2).toBe(4)
    })
```

**Começando os testes**
Criar uma pasta ou arquivo aonde desejar, importante estar organizado no contexto de teste que você fara.

Aqui criamos nosso arquivo 'spec' na pasta use-cases, aonde iremos testar nosso caso de uso register, nele vamos verificar todas as situações possiveis ("Todas as linhas");

Vamos criar um contexto de teste, 'describe' ele descreve qual caso vai ser testado.
após isso vamos criar nossos cenarios de testes com o 'it'

dentro do it vamos simular o cenario que queremos por exemplo a criação de um registro:

instanciamos nosso repositorio para criação do registro.
instaciamos nosso use-case de registro
criamos o registro,
por fim verificamos o registro.

```TS Teste unitario registro
    const userRepositoryInMemory = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(userRepositoryInMemory)

    const { user } = await registerUseCase.execute({
        name: 'Joe Doe',
        email: 'JoeDoe@gmail.com',
        password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))

```
para a validação do teste utilizamos o 'expect'("Alguma coisa").'demais verificações'

no cenario a cima estamos esperando que o "id" gerado no registro de usuario seja igual a qualquer tipo de String.

### Vitest Covarage

```JSON 
    "test:coverage": "vitest run --coverage"
```

### Vitest UI
```PowerShell
    npm i -D @vitest/ui
```

### Factory Patern

# TDD -> Test driven development


NPM run all
Conversão dos scripts package.json/ Rodar comandos a +


npm i @fastify/cookie

### Integrando Front-End com a autenticação

Caso precise integrar com o front-end, você deve ter se deparado com o refreshToken não sendo setado nos cookies do navegador, para resolver esse problema, ilustraremos a solução utilizando o Axios:

1. No servidor, adicione a propriedade credentials como true:

```Typescript
app.register(cors, {
  origin: true,
  credentials: true,
})
```

No create ou nas requisições do Axios, adicione o withCredentials como true:

```Typescript
const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})
```

# RBAC - Role-Base Access Control

# CI - Continuous Integration

