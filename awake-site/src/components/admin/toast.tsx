"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: number;
  text: string;
  type: ToastType;
}

let toastId = 0;
let listeners: Array<(msg: ToastMessage) => void> = [];

export function toast(text: string, type: ToastType = "success") {
  const msg = { id: ++toastId, text, type };
  listeners.forEach((fn) => fn(msg));
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (msg: ToastMessage) => {
      setMessages((prev) => [...prev, msg]);
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      }, 3000);
    };
    listeners.push(handler);
    return () => {
      listeners = listeners.filter((l) => l !== handler);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            "bg-[#1c1917] border border-white/13 rounded-md px-4 py-3 text-[0.84rem] max-w-[320px] animate-in slide-in-from-bottom-2",
            msg.type === "success" && "border-l-[3px] border-l-green-500 text-green-500",
            msg.type === "error" && "border-l-[3px] border-l-pink text-pink",
            msg.type === "info" && "border-l-[3px] border-l-blue-400 text-white/70"
          )}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
