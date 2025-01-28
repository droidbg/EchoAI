const ChatBody = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Client Message */}
      <div className="border-b-amber-100 border-2 break-words rounded-lg p-2  self-end max-w-[80%]">
        <pre>
          <span>Hey Chat GPT, Can you help me?</span>
        </pre>
      </div>

      {/* AI MESSAGE */}
      <div className="border-blue-300 border-2 overflow-ellipsis break-words rounded-lg p-2 bg-black self-start max-w-[80%]">
        <pre>
          <span>Yeah, I can help you anything</span>
        </pre>
      </div>
    </div>
  );
};

export default ChatBody;
