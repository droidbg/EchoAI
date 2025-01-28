const ChatInput = () => {
  return (
    <div className="w-full bg-gray-300 rounded-xl px-2 py-4 max-h-40 overflow-auto relative ">
      <textarea className=" border-0 bg-transparent outline-none w-11/12 text-black" />
      <img src="/send.png" width={20} className="absolute top-4 right-3" />
    </div>
  );
};

export default ChatInput;
