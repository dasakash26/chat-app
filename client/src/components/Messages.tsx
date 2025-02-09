import { MessageType } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Message } from "./Message";

export const Messages = ({
  messages,
  messagesEndRef,
  userId,
}: {
  messages: MessageType[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  userId: string;
}) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <Message key={index} {...message} currentUser={userId} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
