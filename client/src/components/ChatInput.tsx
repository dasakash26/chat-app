import { MessageType } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { SendHorizontal, SmilePlus } from "lucide-react";
import { Input } from "./ui/input";

export const ChatInput = ({
  userId,
  ws,
}: {
  userId: string;
  ws: WebSocket;
}) => {
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: MessageType = {
      id: Math.random().toString(36).substring(2, 9),
      type: "MESSAGE",
      userId: userId,
      text: input,
      createdAt: new Date(),
    };

    ws.send(JSON.stringify(newMessage));
    //setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    setInput("");
  };

  return (
    <div className="p-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 max-w-2xl mx-auto">
        <Button size="icon" variant="ghost">
          <SmilePlus className="h-5 w-5" />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button size="icon" onClick={handleSend}>
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
