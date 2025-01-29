import { FC } from "react";

const UserChat: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="border-b-amber-100 border-2 break-words rounded-lg p-2  self-end max-w-[80%]">
      <pre>
        <span>{message}</span>
      </pre>
    </div>
  );
};

export default UserChat;
