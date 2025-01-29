import { useState } from "react";
import ChatBody from "./components/ChatBody";
import ChatInput, { Message } from "./components/ChatInput";
import { fetchResponse } from "./utils/Api";
import { useMutation } from "react-query";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [chats, setChats] = useState<Message[]>([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chats);
    },
    onSuccess: (data: { message: string }) =>
      setChats((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message: Message) => {
    await Promise.resolve(setChats((prev) => [...prev, message]));
    mutation.mutate();
  };

  return (
    <div className="bg-[#1A232E] h-screen py-6 relative sm:px-28 text-white overflow-hidden flex flex-col justify-between align-middle px-10">
      <div className="uppercase font-bold text-2xl text-center">ChatGPT2.0</div>

      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center">
        <ChatBody chats={chats} />
      </div>

      <div className="w-full max-w-4xl min-w-[20rem] self-center ">
        <ChatInput sendMessage={sendMessage} isLoading={mutation.isLoading} />
      </div>
      <Analytics />
    </div>
  );
}

export default App;
