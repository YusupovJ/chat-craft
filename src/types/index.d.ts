interface IUser {
  id: number;
  username: string;
  avatar: number;
}

interface IMessage {
  id: number;
  content: string;
  user: IUser;
}

interface IMe {
  username: string;
  avatar: number;
  id: number;
  refreshToken: string | undefined;
  accessToken: string | undefined;
}

interface IMeResult {
  data: IMe;
}

interface IAuthStor {
  updateUser: (username: IMe["username"]) => void;
  updateAvatar: (avatar: IMe["avatar"]) => void;
  updateId: (id: IMe["id"]) => void;
  updateRefreshToken: (token: IMe["refreshToken"]) => void;
  updateAccessToken: (token: IMe["accessToken"]) => void;
}
