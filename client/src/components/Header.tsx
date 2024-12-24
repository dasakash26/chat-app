import { MessageCircleDashed } from "lucide-react";
import { Button } from "./ui/button";

export const Header = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 max-w-2xl mx-auto justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2"><MessageCircleDashed/> Secret Chat</h1>
        <Button className="text-xl font-thin" variant={"secondary"}>
          {" "}
          User ID: {userId}
        </Button>
      </div>
    </div>
  );
};
