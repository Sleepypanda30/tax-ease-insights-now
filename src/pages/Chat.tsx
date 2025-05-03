
import React from "react";
import Layout from "@/components/Layout";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-taxgray-800">Tax Assistant</h1>
          <p className="text-taxgray-600 text-sm">
            Ask questions about your tax situation
          </p>
        </div>
        
        <ChatInterface className="flex-1 -mx-4 -mb-4" />
      </div>
    </Layout>
  );
};

export default Chat;
