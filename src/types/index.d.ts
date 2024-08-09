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
