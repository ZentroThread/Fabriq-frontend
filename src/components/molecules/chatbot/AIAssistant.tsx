import { useState } from "react";
import ChatBot from "./ChatBot";
import FloatingChatIcon from "./FloatingChatIcon";

function AIAssistant() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon - appears when chat is closed */}
      <FloatingChatIcon
        onClick={() => setIsChatOpen(true)}
        isVisible={!isChatOpen}
      />

      {/* Chat Window */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

export default AIAssistant;
