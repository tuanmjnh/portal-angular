export class Auth {
  username: string = '';
  password: string = '';
  remember: boolean = false;
}

export class Header {
  user: string = 'auth_user';
  token: string = 'auth_token';
  remember: string = 'auth_remember';
}
