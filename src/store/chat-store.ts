import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ChatMessage {
  id?: number;
  senderId?: string;
  senderRole: string;
  receiverRole: string;
  content: string;
  timestamp?: string; // ISO string
  isRead?: boolean;
}

interface ChatStore {
  messages: ChatMessage[];
  unreadCount: number;
  addMessage: (message: ChatMessage, myRole: string) => void;
  clearUnread: () => void;
  cleanupOldMessages: () => void;
  setUnreadCount: (count: number) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      unreadCount: 0,
      addMessage: (message, myRole) =>
        set((state) => {
          const exists = state.messages.some((m) => {
            if (m.id !== undefined && message.id !== undefined) {
              return m.id === message.id;
            }
            return (
              m.content === message.content &&
              m.timestamp === message.timestamp &&
              m.senderRole === message.senderRole
            );
          });
          if (exists) return state;

          const isIncoming = message.senderRole !== myRole;
          return {
            messages: [...state.messages, message],
            unreadCount: isIncoming ? state.unreadCount + 1 : state.unreadCount,
          };
        }),
      clearUnread: () => set({ unreadCount: 0 }),
      setUnreadCount: (count) => set({ unreadCount: count }),
      cleanupOldMessages: () =>
        set((state) => {
          const oneDayAgo = new Date(
            Date.now() - 24 * 60 * 60 * 1000
          ).toISOString();
          return {
            messages: state.messages.filter(
              (msg) => (msg.timestamp || new Date().toISOString()) > oneDayAgo
            ),
          };
        }),
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
