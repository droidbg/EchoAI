import { FC } from "react";

const AiChat: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="border-blue-300 border-2 overflow-ellipsis break-words rounded-lg p-2 bg-black self-start max-w-[80%]">
      <pre>
        <span>{message}</span>
      </pre>
    </div>
  );
};

export default AiChat;
