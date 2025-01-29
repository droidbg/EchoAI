import { FC } from "react";
import { Message } from "./ChatInput";
import UserChat from "./UserChat";
import AiChat from "./AiChat";

const ChatBody: FC<{ chats: Message[] }> = (props) => {
  const chats: Message[] = props.chats;

  return (
    <div className="flex flex-col gap-4">
      {chats.map((chat: Message, index) => {
        return chat.sender === "user" ? (
          <UserChat key={index} message={chat.message} />
        ) : (
          <AiChat key={index} message={chat.message} />
        );
      })}
    </div>
  );
};

export default ChatBody;
