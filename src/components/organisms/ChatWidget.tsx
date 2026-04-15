import React, { useState, useEffect, useRef, useCallback } from "react";
import { Bell, MessageSquare, X, Send } from "lucide-react";
import { useChatSocket } from "../../hooks/messengin-chat/useChatSocket";
import { cn } from "@/utils/style";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

interface ChatWidgetProps {
  myRole: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ myRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");

  const targetRole =
    myRole === "SALES_ASSISTANT" ? "CASHIER" : "SALES_ASSISTANT";

  const { messages, sendMessage, unreadCount, clearUnread, isConnected } =
    useChatSocket(myRole);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [inputText, isOpen]);

  useEffect(() => {
    if (isOpen) {
      clearUnread();
    }
  }, [isOpen, messages, clearUnread]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = useCallback(() => {
    if (inputText.trim()) {
      sendMessage(targetRole, inputText);
      setInputText("");
    }
  }, [inputText, targetRole, sendMessage]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 md:w-96 h-[500px] z-50 shadow-xl flex flex-col bg-background border-border">
          <CardHeader className="p-3 border-b border-border flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat with {targetRole}
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  isConnected ? "bg-green-500" : "bg-red-500"
                )}
                title={isConnected ? "Online" : "Offline"}
              />
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full p-4">
              <div className="flex flex-col gap-3">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm mt-10">
                    No messages yet.
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isMe = msg.senderRole === myRole;
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex flex-col max-w-[80%]",
                          isMe ? "self-end items-end" : "self-start items-start"
                        )}
                      >
                        <div
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm",
                            isMe
                              ? "bg-primary text-primary-foreground rounded-br-none"
                              : "bg-muted rounded-bl-none"
                          )}
                        >
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1">
                          {new Date(
                            msg.timestamp || new Date().toISOString()
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-3 border-t border-border gap-2">
            <Textarea
              ref={textareaRef}
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 min-h-[40px] max-h-[120px] resize-none"
              rows={1}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!inputText.trim() || !isConnected}
            >
              <Send className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default React.memo(ChatWidget);
