import Container from "./container";
import MessageList from "./messageList";

const users: IUser[] = [
  { id: 1, username: "Alice", avatar: 0 },
  { id: 2, username: "Bob", avatar: 1 },
  { id: 3, username: "Charlie", avatar: 2 },
];

const messages: IMessage[] = [
  { id: 1, content: "Привет!", user: users[0] }, // Alice
  { id: 2, content: "Как дела?", user: users[1] }, // Bob
  { id: 3, content: "Всё хорошо, спасибо!", user: users[2] }, // Charlie
  { id: 4, content: "Рад это слышать!", user: users[0] }, // Alice
  { id: 5, content: "Чем занимаешься?", user: users[1] }, // Bob
  { id: 6, content: "Работаю над проектом.", user: users[2] }, // Charlie
  { id: 7, content: "Звучит интересно.", user: users[0] }, // Alice
  { id: 8, content: "Да, это так.", user: users[2] }, // Charlie
  { id: 9, content: "Может, встретимся позже?", user: users[1] }, // Bob
  { id: 10, content: "Конечно, договорились!", user: users[0] }, // Alice
];

const me: IUser = users[1];

const Chat = () => {
  return (
    <main>
      <Container className="bg-gray-200">
        <MessageList messages={messages} me={me} />
      </Container>
    </main>
  );
};

export default Chat;
