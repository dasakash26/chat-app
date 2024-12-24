import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { IdCard } from "./components/IdCard";
import { Header } from "./components/Header";
import { MessageType } from "./lib/utils";
import { Messages } from "./components/Messages";
import { ChatInput } from "./components/ChatInput";

let socket: Socket | null = null;
if (!socket) {
  socket = io("http://localhost:3000");
}

export default function App() {
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for incoming messages and add them to the state when received from the server
  useEffect(() => {
    socket?.on("receive_message", (message: MessageType) => {
      message.createdAt = new Date(message.createdAt);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket?.off("receive_message");
    };
  }, []);

  return userId ? (
    <div className="flex flex-col h-screen bg-background">
      <Header userId={userId} />
      <Messages
        messages={messages}
        messagesEndRef={messagesEndRef}
        userId={userId}
      />
      {(socket)? (<ChatInput userId={userId} socket={socket} />):(<h1>Loading...</h1>)}
    </div>
  ) : (
    <IdCard setUserId={setUserId} />
  );
}
