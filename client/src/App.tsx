import { useEffect, useState, useRef } from "react";
import { IdCard } from "./components/IdCard";
import { Header } from "./components/Header";
import { MessageType } from "./lib/utils";
import { Messages } from "./components/Messages";
import { ChatInput } from "./components/ChatInput";
import { useSocket } from "./hooks/useSocket";
import { Loader2 } from "lucide-react";

export default function App() {
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socket = useSocket(userId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (socket && userId) {
      socket.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        console.log("> Received message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
    }
  }, []);

  return userId ? (
    <div className="flex flex-col h-screen bg-background">
      <Header userId={userId} />
      <Messages
        messages={messages}
        messagesEndRef={messagesEndRef}
        userId={userId}
      />
      {socket ? (
        <ChatInput userId={userId} ws={socket} />
      ) : (
        <Loader2 className="m-auto h-10 w-10 text-primary" />
      )}
    </div>
  ) : (
    <IdCard setUserId={setUserId} />
  );
}
