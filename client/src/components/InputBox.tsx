import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendIcon, SmilePlus } from "lucide-react";

interface Message {
  id: number;
  userId: string;
  text: string;
  createdAt: Date;
}

export default function InputBox({
  addMessage,
}: {
  addMessage: (text: string) => void;
}) {
  const [input, setInput] = useState<any>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = () => {
    addMessage(input);
    setInput("");
  };

  return (
    <>
      <div className="flex w-full max-w-3xl items-center space-x-2 fixed bottom-4">
        <Button type="submit" onClick={() => console.log("clicked")}>
          <SmilePlus />
        </Button>
        <Input
          type="message"
          placeholder="Type your message here..."
          onChange={handleChange}
          value={input}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleClick();
          }}
        />
        <Button type="submit" onClick={handleClick}>
          <SendIcon />
        </Button>
      </div>
    </>
  );
}
