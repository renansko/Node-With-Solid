export class LateCheckInValidation extends Error {
  constructor() {
    super(
      'The check-in van only be validated until 20 minutes after your creation.',
    )
  }
}
