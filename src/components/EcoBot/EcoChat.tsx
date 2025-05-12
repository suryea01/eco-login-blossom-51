
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send, X, MinusCircle, Loader, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const EcoChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant", 
      content: "👋 Hello! I'm EcoBot, your sustainability assistant. Ask me anything about recycling, eco-friendly practices, or how to reduce your carbon footprint!",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Send request to OpenAI via our edge function
      const response = await fetch('/api/ecobot-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputMessage,
          userId: user?.id || 'anonymous'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from EcoBot');
      }
      
      const data = await response.json();
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: data.message,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      // Save to chat logs if user is authenticated
      if (user) {
        await supabase.from('chat_logs').insert({
          user_id: user.id,
          message: inputMessage,
          response: data.message
        });
      }
      
    } catch (error) {
      console.error('Error communicating with EcoBot:', error);
      toast.error('Failed to get a response from EcoBot. Please try again.');
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant' as const,
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const minimizeChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-green-600 hover:bg-green-700 text-white z-50"
          aria-label="Open EcoBot Chat"
        >
          <Bot size={24} />
        </Button>
      )}
      
      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] shadow-xl z-50 flex flex-col border-2 border-green-500/20 animate-[fadeIn_0.3s_ease-out]">
          <CardHeader className="p-3 border-b bg-green-50 dark:bg-green-900/30">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-green-600">
                  <AvatarFallback><Leaf size={16} /></AvatarFallback>
                </Avatar>
                <CardTitle className="text-md">EcoBot</CardTitle>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={minimizeChat}
                  className="h-8 w-8"
                  aria-label="Minimize chat"
                >
                  <MinusCircle size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon" 
                  onClick={toggleChat}
                  className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-grow overflow-y-auto p-3 pb-0">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-4'
                        : 'bg-muted mr-4'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-[10px] opacity-70 text-right mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-3 py-2 rounded-lg bg-muted mr-4">
                    <div className="flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      <p className="text-sm">EcoBot is thinking...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="p-3 border-t mt-auto">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Ask about sustainability..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Send size={18} />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};
