import { Message } from "../components/ChatInput";
export const fetchResponse = async (chats: Message[]) => {
  try {
    const message = chats
      .map((chat) => chat.sender === "user" && chat.message)
      .join(" \n");
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
