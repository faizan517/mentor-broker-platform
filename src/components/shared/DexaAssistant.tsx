import React, { useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { useDexaStore } from '@stores/dexaStore';
import { generateDexaResponse } from '@services/dexaService';

export default function DexaAssistant() {
  const messages = useDexaStore((state) => state.messages);
  const isOpen = useDexaStore((state) => state.isOpen);
  const isLoading = useDexaStore((state) => state.isLoading);
  const currentContext = useDexaStore((state) => state.currentContext);
  const addMessage = useDexaStore((state) => state.addMessage);
  const setOpen = useDexaStore((state) => state.setOpen);
  const setLoading = useDexaStore((state) => state.setLoading);

  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: input,
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = generateDexaResponse(input, currentContext);
      const dexaMessage = {
        id: `msg-${Date.now()}`,
        role: 'dexa' as const,
        content: response.message,
        timestamp: new Date().toISOString(),
        suggestedActions: response.suggestedActions,
      };

      addMessage(dexaMessage);
      setLoading(false);
    }, 800);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-neutral-800 rounded-lg shadow-2xl flex flex-col border border-neutral-200 dark:border-neutral-700">
      <div className="h-14 bg-primary-600 rounded-t-lg flex items-center justify-between px-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          DEXA Assistant
        </h3>
        <button
          onClick={() => setOpen(false)}
          className="p-1 hover:bg-primary-700 rounded transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-900">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mb-3" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Hi! I'm DEXA, your AI assistant. Ask me about leads, quotes, claims, or renewals.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white'
              }`}
            >
              <p>{message.content}</p>
              {message.suggestedActions && message.suggestedActions.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.suggestedActions.map((action, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left text-xs px-2 py-1 rounded bg-opacity-20 hover:bg-opacity-30 transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce-slow" />
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="h-16 border-t border-neutral-200 dark:border-neutral-700 p-3 bg-white dark:bg-neutral-800 rounded-b-lg flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
