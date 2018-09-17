export class Users {
  user_id: string = '';
  parent_id: string = '';
  group_id: string = '';
  username: string = '';
  password: string = '';
  repassword: string = '';
  salt: string = '';
  full_name: string = '';
  mobile: string = '';
  email: string = '';
  address: string = '';
  details: string = '';
  images: string = '';
  orders: number = 0;
  roles: string = '';
  created_by: string = '';
  created_at: Date = new Date();
  updated_by: string = '';
  updated_at: Date = null;
  deleted_by: string = '';
  deleted_at: Date = null;
  last_login: Date = null;
  last_change_password: Date = null;
  flag: number = 1;
}
