import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";

function App() {
  return (
    <div className="bg-[#1A232E] h-screen py-6 relative sm:px-28 text-white overflow-hidden flex flex-col justify-between align-middle">
      <div className="uppercase font-bold text-2xl text-center">ChatGPT2.0</div>

      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center">
        <ChatBody />
      </div>

      <div className=" w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput />
      </div>
    </div>
  );
}

export default App;
