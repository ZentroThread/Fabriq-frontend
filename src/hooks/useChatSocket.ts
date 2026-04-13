import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useChatStore, type ChatMessage } from "../store/chat-store";
import { useAuthStore } from "@/store/user-auth-store";
import { API_BASE_URL } from "@/constants/constdata";

export const useChatSocket = (myRole: string) => {
  // Use Zustand store instead of local state
  const { messages, unreadCount, addMessage, clearUnread, cleanupOldMessages } =
    useChatStore();
  const tenantId = useAuthStore((state) => state.tenantId);

  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!myRole) return;

    // Cleanup old messages on mount
    cleanupOldMessages();

    const wsUrl = tenantId
      ? `${API_BASE_URL}/ws?tenantId=${tenantId}`
      : `${API_BASE_URL}/ws`;

    const socket = new SockJS(wsUrl);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: () => {
        //  // reduce noise
      },
      onConnect: () => {
        setIsConnected(true);

        // Subscribe to my role's topic
        client.subscribe(`/topic/${myRole}`, (message) => {
          if (message.body) {
            const receivedMsg: ChatMessage = JSON.parse(message.body);
            // Ensure timestamp exists
            if (!receivedMsg.timestamp) {
              receivedMsg.timestamp = new Date().toISOString();
            }
            // Add to persistent store
            addMessage(receivedMsg, myRole);
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onStompError: (frame) => {},
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [myRole, addMessage, cleanupOldMessages, tenantId]);

  const sendMessage = (targetRole: string, content: string) => {
    if (clientRef.current && clientRef.current.connected) {
      const chatMessage: ChatMessage = {
        senderRole: myRole,
        receiverRole: targetRole,
        content: content,
        // Backend sets timestamp usually, but for local store consistency we might want it?
        // Actually, backend broadcasts back to sender. We rely on that echo to add to store.
        // So we don't add to store here manually.
      };

      clientRef.current.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
    } else { /* empty */ }
  };

  return { messages, sendMessage, unreadCount, clearUnread, isConnected };
};
