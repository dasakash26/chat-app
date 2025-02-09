import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface MessageType {
  id: string;
  type: string;
  userId: string;
  text: string;
  createdAt: Date;
}
