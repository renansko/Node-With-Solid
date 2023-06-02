# App

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
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
- ```JSON "baseUrl": "./",                                     /* Specify the base directory to resolve non-relative module names. */
    
    #Conversão para node, aceita a versão 2020
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

E entãop para ver o bd acessar um editor de banco ex: Beekeper/DBever ou com o prisma rodar esse comando:
- ```powershell
    npx prisma studio   
    ```
## Docker compose