import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AiMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string; // Sticking to string for JSON serialization safety
}

interface AiChatStore {
  messages: AiMessage[];
  inputValue: string;
  addMessage: (message: AiMessage) => void;
  setInputValue: (value: string) => void;
  resetMessages: () => void;
}

const INITIAL_MESSAGES: AiMessage[] = [
  {
    id: "welcome",
    text: "Hello! I'm your Fabriq AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date().toISOString(),
  },
];

export const useAiChatStore = create<AiChatStore>()(
  persist(
    (set) => ({
      messages: INITIAL_MESSAGES,
      inputValue: "",
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setInputValue: (value) => set({ inputValue: value }),
      resetMessages: () => set({ messages: INITIAL_MESSAGES, inputValue: "" }),
    }),
    {
      name: "fabriq_ai_chat_messages",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
