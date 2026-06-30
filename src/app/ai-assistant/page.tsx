"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function AiAssistantPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm an AI assistant trained exclusively on Kanish's portfolio, projects, and engineering philosophies. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "What is Aazhi / Suvidhaa?",
    "Explain your backend architecture.",
    "What are your core AI skills?",
    "Tell me about your accessibility work."
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Mock response for now (to be replaced by actual Genkit API call)
    setTimeout(() => {
      setMessages([...newMessages, { role: "assistant", content: "This is a simulated response. The backend API is currently being configured with Genkit. Check back soon for full conversational capabilities based on my portfolio data!" }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 lg:px-24 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 flex-1 flex flex-col">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            AI-Powered Interaction
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Chat with my Digital Twin</h1>
        </div>

        {/* Chat Interface */}
        <Card className="flex-1 flex flex-col overflow-hidden border-2 shadow-lg">
          <CardContent className="flex-1 p-0 flex flex-col h-[600px]">
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/20">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border shadow-sm"}`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="bg-card border rounded-2xl p-4 shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t space-y-4">
              
              {/* Suggested Questions */}
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Field */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex gap-2"
              >
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Kanish's experience..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!input.trim() || isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
                <AlertCircle className="w-3 h-3" />
                AI responses are generated based on portfolio data and may contain inaccuracies.
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
