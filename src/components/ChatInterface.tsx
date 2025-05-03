
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your TaxEase assistant. How can I help you with your taxes today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample tax-related questions
  const sampleQuestions = [
    "What deductions am I eligible for?",
    "Can I claim my home office as a deduction?",
    "What tax credits did I miss?",
    "How does my refund compare to last year?",
  ];

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        "What deductions am I eligible for?":
          "Based on your tax transcript, you may be eligible for several deductions: 1) Student loan interest deduction ($1,234), 2) Home mortgage interest ($8,420), 3) State and local tax deduction (up to $10,000). Would you like more information about any of these?",
        "Can I claim my home office as a deduction?":
          "Based on your employment status as a W-2 employee, you generally cannot claim a home office deduction. However, if you have self-employment income reported on Schedule C (which I don't see in your transcript), you might be eligible. Would you like to know more about requirements for home office deductions?",
        "What tax credits did I miss?":
          "Looking at your transcript, you may have missed the Child and Dependent Care Credit. With two children under 13, you could be eligible for up to $2,100 in credits. Additionally, you might qualify for the Lifetime Learning Credit for your continuing education expenses. Would you like to learn how to claim these on an amended return?",
        "How does my refund compare to last year?":
          "Your current refund of $1,842 is approximately 15% less than last year's refund of $2,168. The main factors appear to be: 1) Your income increased by $7,500, pushing you into a slightly higher tax bracket, 2) You had less tax withheld as a percentage of income. Would you like recommendations for adjusting your withholdings for next year?",
      };

      let responseText = botResponses[userMessage.text] || 
        "I don't have specific information about that based on your tax transcript. Would you like me to explain general information about this topic, or would you prefer to ask another tax-related question?";

      const botMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const selectSampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-taxblue text-white rounded-br-none"
                  : "bg-taxgray-100 text-taxgray-800 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs text-right mt-1 opacity-70">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-taxgray-100 text-taxgray-800 px-4 py-2 rounded-lg rounded-bl-none max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-taxgray-400 animate-bounce"></div>
                <div
                  className="w-2 h-2 rounded-full bg-taxgray-400 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-taxgray-400 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Sample questions */}
      <div className="px-4 py-2 bg-taxgray-50 border-t border-taxgray-200">
        <p className="text-xs text-taxgray-500 mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question) => (
            <button
              key={question}
              onClick={() => selectSampleQuestion(question)}
              className="text-xs bg-white border border-taxgray-300 text-taxgray-700 px-2 py-1 rounded-full hover:bg-taxgray-100"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-taxgray-200 bg-white">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your taxes..."
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            size="icon" 
            className="bg-taxblue hover:bg-taxblue-dark"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
