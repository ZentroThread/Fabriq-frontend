import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/constants/api.constants";
import { apiClient } from "@/lib/client";
import { useAiChatStore } from "@/store/ai-chat-store";

export function useAiChatMutation() {
  const { addMessage } = useAiChatStore();

  return useMutation({
    mutationFn: async (question: string) => {
      const data = (await apiClient.request(API_ENDPOINTS.RAG.BACKEND_CHAT, {
        method: "POST",
        data: { question },
      })) as { answer: string };
      return data.answer;
    },
    onMutate: (question) => {
      addMessage({
        id: Date.now().toString(),
        text: question,
        sender: "user",
        timestamp: new Date().toISOString(),
      });
    },
    onSuccess: (answer) => {
      addMessage({
        id: (Date.now() + 1).toString(),
        text: answer,
        sender: "bot",
        timestamp: new Date().toISOString(),
      });
    },
    onError: () => {
      addMessage({
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please make sure the AI service is running and try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      });
    },
  });
}
