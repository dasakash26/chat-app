import { useEffect, useState } from "react";

export function useSocket(userId: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (userId !== "" && userId !== null) {
      const socket = new WebSocket("ws://localhost:3001");

      socket.onopen = () => {
        console.log("> Connected to server");
        setWs(socket);
        socket.send(
          JSON.stringify({
            type: "NEW_USER",
            userId,
            text: `${userId} joined the chat.`,
            createdAt: new Date(),
          })
        );
      };

      socket.onclose = () => {
        console.log("> Disconnected from server");
        setWs(null);
      };

      socket.onerror = (error) => {
        console.error("> Error:", error);
        socket.close();
      };

      return () => {
        ws?.close();
        setWs(null);
      };
    }
  }, [userId]);

  return ws;
}
