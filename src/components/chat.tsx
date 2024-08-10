import ChatInfo from "./chatInfo";
import MessageList from "./messageList";
import WriteMessage from "./writeMessage";

const users: IUser[] = [
  { id: 1, username: "Alice", avatar: 0 },
  { id: 2, username: "Bob", avatar: 1 },
  { id: 3, username: "Charlie", avatar: 2 },
  { id: 4, username: "Dave", avatar: 3 },
  { id: 5, username: "Eve", avatar: 4 },
];

const messages: IMessage[] = [
  { id: 1, content: "Привет всем!", user: users[0] }, // Alice
  { id: 2, content: "Как настроение?", user: users[1] }, // Bob
  { id: 3, content: "Всё отлично, спасибо!", user: users[2] }, // Charlie
  { id: 4, content: "Рад слышать!", user: users[3] }, // Dave
  { id: 5, content: "Что нового?", user: users[4] }, // Eve
  { id: 6, content: "Работаю над проектом.", user: users[0] }, // Alice
  { id: 7, content: "Удачи с проектом!", user: users[1] }, // Bob
  { id: 8, content: "Спасибо, пригодится!", user: users[0] }, // Alice
  { id: 9, content: "Какие планы на выходные?", user: users[4] }, // Eve
  { id: 10, content: "Думаю съездить за город.", user: users[3] }, // Dave
  { id: 11, content: "Отличная идея!", user: users[2] }, // Charlie
  { id: 12, content: "Кто-нибудь хочет присоединиться?", user: users[3] }, // Dave
  { id: 13, content: "Я бы с удовольствием!", user: users[1] }, // Bob
  { id: 14, content: "Звучит здорово!", user: users[4] }, // Eve
  { id: 15, content: "Тогда договорились!", user: users[3] }, // Dave
  { id: 16, content: "Какое время выезда?", user: users[0] }, // Alice
  { id: 17, content: "Предлагаю утром, часов в 9.", user: users[3] }, // Dave
  { id: 18, content: "Подходит, будем на связи.", user: users[2] }, // Charlie
  { id: 19, content: "Не забудьте взять перекус!", user: users[4] }, // Eve
  { id: 20, content: "Обязательно, спасибо за напоминание!", user: users[1] }, // Bob
];
const me: IUser = users[3];

const Chat = () => {
  return (
    <main className="bg-gray-200 h-full px-4 pb-20 pt-5">
      <ChatInfo />
      <MessageList messages={messages} me={me} />
      <WriteMessage />
    </main>
  );
};

export default Chat;
