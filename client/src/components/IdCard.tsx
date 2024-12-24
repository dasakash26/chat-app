import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const IdCard = ({ setUserId }: { setUserId: (userId: string) => void }) => {
  const [userIdInput, setUserIdInput] = useState("");
  const [error, setError] = useState("");

  const handleSetUserId = () => {
    if (userIdInput.trim() === "") {
      setError("User ID cannot be empty");
      return;
    }
    setError("");
    setUserId(userIdInput);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="p-4 bg-surface rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center">
          Enter your user ID
        </h1>
        <Input
          value={userIdInput}
          onChange={(e) => setUserIdInput(e.target.value)}
          placeholder="Enter User Name"
          className="mt-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSetUserId();
            }
          }}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Button onClick={handleSetUserId} className="mt-4 w-full">
          Enter Chat
        </Button>
      </div>
    </div>
  );
};
