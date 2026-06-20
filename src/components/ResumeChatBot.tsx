// client\src\components\ResumeChatBot.tsx
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, BotIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { resumeApi } from "@/services/api/resume";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const TypingIndicator = () => (
  <div className="flex gap-1">
    <div
      className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    />
    <div
      className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
      style={{ animationDelay: "150ms" }}
    />
    <div
      className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"
      style={{ animationDelay: "300ms" }}
    />
  </div>
);

const resumeCorrectAgent = async (resumeText: string) => {
  const response = await resumeApi.resumeCorrectAgent(resumeText);
  return response.response;
};

const ResumeChatBot = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Resume AI Assistant. I can help you improve your resume with tips on formatting, content, keywords, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];
  const isAuthPage = authPages.includes(location.pathname);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponseText = await resumeCorrectAgent(input);

      const aiMessage: Message = {
        role: "assistant",
        content: aiResponseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        role: "assistant",
        content:
          "Something went wrong while connecting to the AI service. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthPage || !user) return null;

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 rounded-full gradient-primary text-white shadow-lg hover:scale-110 transition-transform z-40"
            size="icon"
          >
            <BotIcon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat with Hirelyze AI Assistant</p>
        </TooltipContent>
      </Tooltip>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-background rounded-2xl w-full max-w-md h-[600px] flex flex-col shadow-2xl">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                  <BotIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Hirelyze GPT</h3>
                  <p className="text-sm text-primary-foreground/80">
                    AI-Powered Resume Help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:text-primary-foreground/80 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 text-xs p-3 sm:p-4 overflow-y-auto bg-muted/30" ref={scrollRef}>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <BotIcon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-medium">Ask me about your resume</p>
                  <p className="text-sm mt-1 max-w-xs">
                    I'll help you improve your resume with tips on formatting, content, keywords, and more
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 mb-4 ${message.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <BotIcon className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`min-w-0 max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 ${message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-card text-card-foreground border border-border rounded-bl-none"
                        }`}
                    >
                      <p className="text-sm whitespace-pre-line break-words">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${message.role === "user"
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                          }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <BotIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-none p-3">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-3 sm:p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about your resume..."
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                AI will help improve your resume
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeChatBot;