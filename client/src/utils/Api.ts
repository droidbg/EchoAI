import { Message } from "../components/ChatInput";

export const fetchResponse = async (chats: Message[]) => {
  try {
    const message = chats
      .map((chat) => (chat.sender === "user" ? chat.message : ""))
      .join(" \n");
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    console.log("message: ", message);

    const response = await fetch(
      serverUrl ?? "https://chatgpt2-0-wvv8.vercel.app/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      }
    );

    const data = await response.json();
    if (data.status == 401) {
      data.message = "Something went wrong!!! \nPlease check after sometime...";
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch response from server");
  }
};
