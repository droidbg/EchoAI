import { FC, useEffect, useRef } from "react";
import { Message } from "./ChatInput";
import UserChat from "./UserChat";
import AiChat from "./AiChat";
import autoAnimate from "@formkit/auto-animate";

const ChatBody: FC<{ chats: Message[] }> = (props) => {
  const chats: Message[] = props.chats;
  const parent = useRef(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  //for animation
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  // for scrolling
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex flex-col gap-4" ref={parent}>
      {chats.map((chat: Message, index) => {
        return chat.sender === "user" ? (
          <UserChat key={index} message={chat.message} />
        ) : (
          <AiChat key={index} message={chat.message} />
        );
      })}
      {chats.length === 0 && (
        <div>
          <div className="text-3xl font-bold m-auto mt-40 text-center text-yellow-50">
            What can I help with?
          </div>
        </div>
      )}
      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

export default ChatBody;
