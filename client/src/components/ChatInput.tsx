import { useState } from "react";
export type Message = {
  sender: string;
  message: string;
};

type ChatInputProps = {
  isLoading: boolean;
  sendMessage: (msg: Message) => void;
};

const ChatInput: React.FC<ChatInputProps> = (props) => {
  const { sendMessage, isLoading } = props;

  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (value === "") return;

    sendMessage({ sender: "user", message: value });
    setValue("");
  };
  return (
    <div className="w-full bg-gray-600 rounded-xl px-2 py-4 max-h-40 overflow-auto relative flex">
      {isLoading ? (
        <img src="/loader.gif" className="w-8 m-auto" />
      ) : (
        <>
          <textarea
            rows={1}
            onKeyDown={(e) => e.keyCode === 13 && !e.shiftKey && handleSubmit()}
            className=" border-0 bg-transparent outline-none w-11/12 "
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <img
            src="/send.png"
            alt="send-button"
            className="mx-2 hover:cursor-pointer ease-in duration-100 hover:scale-125 h-8 self-center"
            onClick={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;
