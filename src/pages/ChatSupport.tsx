import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Phone } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isHighRisk?: boolean;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your MindMate AI assistant. I'm here to provide mental health first aid and support. How are you feeling today? Remember, this is a safe, anonymous space.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // High-risk keywords detection
  const detectHighRisk = (message: string): boolean => {
    const highRiskKeywords = [
      'suicide', 'kill myself', 'end it all', 'hurt myself', 'self-harm',
      'die', 'death', 'hopeless', 'worthless', 'no point'
    ];
    return highRiskKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const generateBotResponse = (userMessage: string): string => {
    const isHighRisk = detectHighRisk(userMessage);
    
    if (isHighRisk) {
      return "I'm concerned about what you've shared. Your life has value and you deserve support. Please consider reaching out to a crisis helpline immediately: National Suicide Prevention Lifeline (988) or text HOME to 741741. Would you like me to help you find local emergency resources?";
    }

    // Simple keyword-based responses
    if (userMessage.toLowerCase().includes('stress') || userMessage.toLowerCase().includes('anxious')) {
      return "I understand you're feeling stressed or anxious. Let's try a quick grounding exercise: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This can help bring you back to the present moment.";
    }
    
    if (userMessage.toLowerCase().includes('sad') || userMessage.toLowerCase().includes('depressed')) {
      return "I hear that you're going through a difficult time. It's okay to feel sad sometimes. Remember that these feelings are temporary. Have you tried any self-care activities today? Sometimes small actions like taking a walk, calling a friend, or listening to music can help.";
    }

    if (userMessage.toLowerCase().includes('exam') || userMessage.toLowerCase().includes('test')) {
      return "Exam stress is very common among students. Here are some strategies: Break study sessions into smaller chunks, practice deep breathing, get adequate sleep, and remember that one exam doesn't define your worth. Would you like specific study techniques or relaxation exercises?";
    }

    // Default supportive response
    return "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what's on your mind? Sometimes talking through our thoughts and feelings can provide clarity and relief.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
        isHighRisk: detectHighRisk(inputMessage)
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-2xl p-6 shadow-sm border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Bot className="text-blue-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI Mental Health Support</h1>
            <p className="text-sm text-gray-600">Anonymous • Confidential • Always Available</p>
          </div>
        </div>
      </div>

      {/* Crisis Hotline Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center space-x-3">
        <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
        <div className="flex-1 text-sm">
          <p className="text-red-800 font-medium">In Crisis? Get immediate help:</p>
          <p className="text-red-700">National Suicide Prevention Lifeline: 988 | Crisis Text Line: Text HOME to 741741</p>
        </div>
        <Phone className="text-red-600 flex-shrink-0" size={20} />
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600' 
                    : message.isHighRisk 
                      ? 'bg-red-100' 
                      : 'bg-gray-100'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="text-white" size={16} />
                  ) : (
                    <Bot className={message.isHighRisk ? 'text-red-600' : 'text-gray-600'} size={16} />
                  )}
                </div>
                <div className={`rounded-2xl p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.isHighRisk
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bot className="text-gray-600" size={16} />
                </div>
                <div className="bg-gray-100 rounded-2xl p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex space-x-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... (Press Enter to send)"
              className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 text-white rounded-xl px-4 py-3 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This is AI-powered support. For emergencies, please contact professional services immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;