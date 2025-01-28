import ChatBody from "./components/ChatBody";

function App() {
  return (
    <div className="bg-[#1A232E] h-screen py-6 relative sm:px-28 text-white overflow-hidden flex flex-col justify-between align-middle">
      {/* Header */}
      <div className="uppercase font-bold text-2xl text-center">ChatGPT2.0</div>
      {/* Body */}
      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center">
        <ChatBody />
      </div>
      {/* Input */}
      <div>Input </div>
    </div>
  );
}

export default App;
