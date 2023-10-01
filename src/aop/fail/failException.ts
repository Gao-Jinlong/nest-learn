export class FailException {
  constructor(
    public msg: string,
    public cause: string,
  ) {}
}
