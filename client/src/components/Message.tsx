import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface MessageProps {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
  currentUser: string;
}

export const Message: React.FC<MessageProps> = ({
  userId,
  text,
  createdAt,
  currentUser,
}) => {
  const isCurrentUser = userId === currentUser;

  return (
    <div
      className={cn(
        "flex items-start gap-3 w-full max-w-2xl mx-auto",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8 mt-0.5">
        <AvatarImage src={`/placeholder.svg?text=${userId}`} />
        <AvatarFallback>{userId.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[80%] break-words",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <p className="text-sm">{text}</p>
        <time className="text-[10px] opacity-50 select-none mt-1 block">
          {new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
    </div>
  );
};
