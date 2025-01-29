const ChatInput = () => {
  return (
    <div className="w-full bg-gray-600 rounded-xl px-2 py-4 max-h-40 overflow-auto relative flex">
      <textarea
        rows={1}
        className=" border-0 bg-transparent outline-none w-11/12 "
      />
      <img
        src="/send.png"
        className="mx-2 hover:cursor-pointer ease-in duration-100 hover:scale-125 h-8 self-center"
      />
    </div>
  );
};

export default ChatInput;
