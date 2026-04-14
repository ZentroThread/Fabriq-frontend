import { useState } from "react";
import ChatBot from "./ChatBot";
import FloatingChatIcon from "./FloatingChatIcon";

function AIAssistant() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <FloatingChatIcon
        onClick={() => setIsChatOpen(true)}
        isVisible={!isChatOpen}
      />

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

export default AIAssistant;
