
export class BearerToken {
  public accessToken: string = "";
  public tokenType: string = "";
  public issued: Date = new Date(0);
  public expires: Date = new Date(0);
}
