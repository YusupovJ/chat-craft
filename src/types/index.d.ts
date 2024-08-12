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
}

interface IMeResult {
  data: IMe;
}
