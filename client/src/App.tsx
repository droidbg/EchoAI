import { useState } from "react";
import ChatBody from "./components/ChatBody";
import ChatInput, { Message } from "./components/ChatInput";
import { fetchResponse } from "./utils/Api";
import { useMutation } from "react-query";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [chats, setChats] = useState<Message[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [suggestionPrompt, setSuggestionPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (messages: Message[]) => {
      return fetchResponse(messages);
    },
    onSuccess: (data: { message: string }) => {
      setChats((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Error fetching response:', error);
      setChats((prev) => [
        ...prev,
        { sender: "ai", message: "Sorry, I encountered an error. Please try again." },
      ]);
      setIsLoading(false);
    },
    onSettled: () => {
      // This runs after both success and error
      setIsLoading(false);
    },
  });

  const sendMessage = async (message: Message) => {
    await Promise.resolve(setChats((prev) => [...prev, message]));
    setIsLoading(true);
    mutation.mutate([message]);
  };


  const handleSuggestionClick = (suggestion: string) => {
    // Map suggestions to better AI prompts
    const promptMap: { [key: string]: string } = {
      "Explain quantum computing": "Please explain quantum computing in simple terms, covering the basic concepts like qubits, superposition, and entanglement, and how it differs from classical computing.",
      "Write a creative story": "Help me write a creative short story. Please provide an engaging plot with interesting characters and a compelling narrative structure.",
      "Help with coding": "I need help with coding. Please assist me with best practices, debugging techniques, and provide clear explanations with examples.",
      "Plan a vacation": "Help me create a comprehensive vacation plan including popular destinations, must-visit attractions, recommended hotels, local cuisine, and travel tips."
    };
    
    const prompt = promptMap[suggestion] || suggestion;
    setSuggestionPrompt(prompt);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-blue-50'} min-h-screen transition-all duration-500`} style={{ minHeight: '100vh' }}>
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen" style={{ minHeight: '100vh' }}>
        {/* Header */}
        <header className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 backdrop-blur-sm">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative">
              <img src="/logo.webp" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg" alt="EchoAI Logo" />
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                EchoAI
              </h1>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hidden sm:block`}>
                Your intelligent AI assistant
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex-1 overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
            <div className="h-full overflow-auto p-3 sm:p-6">
              <ChatBody chats={chats} isDarkMode={isDarkMode} isLoading={isLoading} onSuggestionClick={handleSuggestionClick} />
            </div>
          </div>

          {/* Chat Input */}
          <div className="mt-4 sm:mt-6">
            <ChatInput 
              sendMessage={sendMessage} 
              isLoading={isLoading} 
              isDarkMode={isDarkMode}
              suggestionPrompt={suggestionPrompt}
              onSuggestionPromptUsed={() => setSuggestionPrompt("")}
            />
          </div>
        </main>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
