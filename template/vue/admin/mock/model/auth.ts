interface UserModel extends Partial<Auth.UserInfo> {
  token: string
  refreshToken: string
  password: string
}

export const userModel: Partial<UserModel>[] = [
  {
    token: '__toKEN_ZhengHaoXian__',
    id: '0',
    name: 'admin',
    userRole: 'super',
    password: 'Zr@123456.',
  },
  {
    token: '__TOKEN_SUPER__',
    refreshToken: '__REFRESH_TOKEN_SUPER__',
    id: '1',
    name: 'Super',
    userRole: 'super',
    password: 'super123',
  },
  {
    token: '__TOKEN_ADMIN__',
    refreshToken: '__REFRESH_TOKEN_ADMIN__',
    id: '2',
    name: 'Admin',
    userRole: 'admin',
    password: 'admin123',
  },
  {
    token: '__TOKEN_USER01__',
    refreshToken: '__REFRESH_TOKEN_USER01__',
    id: '3',
    name: 'User01',
    userRole: 'user',
    password: 'user01123',
  },
]
