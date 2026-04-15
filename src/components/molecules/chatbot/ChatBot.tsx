import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Send, Bot, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/user/useAuth";
import { useAuthStore } from "@/store/user-auth-store";
import { useAiChatStore } from "@/store/ai-chat-store";
import { useAiChatMutation } from "@/hooks/ragchat/useAiChat";
import { cn } from "@/utils/style";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const tenantId = useAuthStore((state) => state.tenantId);
  const { messages, inputValue, setInputValue, resetMessages } =
    useAiChatStore();

  useEffect(() => {
    if ((!user || !tenantId) && messages.length > 1) {
      resetMessages();
    }
  }, [user, tenantId, messages.length, resetMessages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { mutate: sendMessage, isPending } = useAiChatMutation();

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isPending) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-9998 bg-black/20 w-full h-full transition-opacity duration-300 opacity-100 cursor-default"
        onClick={onClose}
        aria-label="Close Chat Overlay"
      />
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-112.5 bg-layout-bg shadow-2xl z-9999 
        transform transition-transform duration-300 ease-in-out flex flex-col translate-x-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-nav-bg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-support-button flex items-center justify-center">
              <Bot className="w-6 h-6 text-support-button-text" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-nav-text">
                Fabriq AI Assistant
              </h2>
              <p className="text-xs text-support-text">Always here to help</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-hover-bg rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-icon-default" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-main-bg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.sender === "user"
                    ? "bg-support-button text-support-button-text"
                    : "bg-card border border-border text-text-color"
                )}
              >
                <p className="text-sm whitespace-pre-wrap wrap-break-word">
                  {message.text}
                </p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    message.sender === "user"
                      ? "text-support-button-text opacity-70"
                      : "text-support-text"
                  )}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isPending && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 text-support-button animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-nav-bg">
          <form className="flex gap-2" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isPending}
              className="flex-1 px-4 py-3 rounded-xl border border-input-border bg-layout-bg 
              text-text-color placeholder:text-support-text focus:outline-none 
              focus:border-input-active-border transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isPending}
              className="px-4 py-3 bg-support-button hover:bg-support-button-hover 
              text-support-button-text rounded-xl transition-colors disabled:opacity-50 
              disabled:cursor-not-allowed flex items-center justify-center min-w-12.5"
              aria-label="Send message"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
}

export default ChatBot;
