import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface MessageProps {
  id: string;
  type: string;
  userId: string;
  text: string;
  createdAt: Date;
  currentUser: string;
}

export const Message: React.FC<MessageProps> = ({
  type,
  userId,
  text,
  createdAt,
  currentUser,
}) => {
  const isCurrentUser = userId === currentUser;

  return (
    <>
      {type === "NEW_USER" && (
        <div className="flex items-center justify-center py-2">
          <div className="text-sm font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-1 rounded-full animate-fade-in-down">
            {text}
          </div>
        </div>
      )}
      {type === "MESSAGE" && (
        <div
          className={cn(
            "flex items-start gap-3 w-full max-w-2xl mx-auto p-1 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 rounded-xl transition-all duration-300 ease-in-out animate-fade-in",
            isCurrentUser && "flex-row-reverse"
          )}
        >
          <Avatar className="h-8 w-8 mt-0.5 transform transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-3">
            <AvatarImage src={`/placeholder.svg?text=${userId}`} />
            <AvatarFallback>{userId.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "rounded-2xl px-4 py-2 max-w-[80%] break-words shadow-sm transition-all duration-300 ease-in-out",
              isCurrentUser
                ? "bg-primary text-primary-foreground hover:translate-x-[-2px] hover:bg-primary/90"
                : "bg-muted hover:translate-x-[2px] hover:bg-muted/90 text-muted-foreground"
            )}
          >
            <p className="text-sm leading-relaxed">{text}</p>
            <time className="text-[10px] opacity-70 select-none mt-1 block font-medium">
              {new Date(createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>
        </div>
      )}
    </>
  );
};
