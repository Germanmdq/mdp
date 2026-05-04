"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bot, X, Sparkles, Send, Loader2 } from "lucide-react";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  action?: { label: string; url: string };
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", text: "¡Hola! Soy tu Asistente de Compra ✨. ¿Qué producto o servicio estás buscando hoy?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryToUse = customQuery || input.trim();
    if (!queryToUse || isTyping) return;

    const query = queryToUse;
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", text: query };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      setIsTyping(false);
      
      const isService = /plomer|gasista|electric|cerrajer|repar|pint|albañil/i.test(query);
      const isOffers = /oferta|oportunidad|barato/i.test(query);
      const isBestSellers = /vendido|popular/i.test(query);
      
      let url = "";
      let label = "";

      if (isOffers) {
        url = "/ofertas";
        label = "Ver Ofertas y Oportunidades";
      } else if (isBestSellers) {
        url = "/mas-vendidos";
        label = "Ver Los Más Vendidos";
      } else if (isService) {
        url = `/servicios?q=${encodeURIComponent(query)}`;
        label = `Ver servicios de ${query}`;
      } else {
        url = `/productos?q=${encodeURIComponent(query)}`;
        label = `Ver resultados para "${query}"`;
      }

      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now().toString(), 
          role: "bot", 
          text: `¡Perfecto! Encontré excelentes opciones para tu búsqueda.`,
          action: { label, url }
        }
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl transition-transform hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} md:bottom-8 md:right-8`}
      >
        <Sparkles size={24} className="animate-pulse text-blue-400" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-0 right-0 z-50 h-[85vh] w-full bg-white shadow-2xl transition-transform duration-300 ease-out sm:bottom-6 sm:right-6 sm:h-[500px] sm:w-[380px] sm:rounded-3xl border border-slate-100 ${
          isOpen ? "translate-y-0" : "translate-y-[120%]"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-3xl bg-slate-900 px-6 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20">
                <Bot size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold leading-none">MDP Assistant</h3>
                <span className="text-[10px] font-medium text-green-400">En línea</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white text-slate-700 border border-slate-100 rounded-tl-sm"}`}>
                  <p>{msg.text}</p>
                  {msg.action && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        router.push(msg.action!.url);
                        setTimeout(() => {
                          setMessages([{ id: "1", role: "bot", text: "¡Hola! Soy tu Asistente de Compra ✨. ¿Qué producto o servicio estás buscando hoy?" }]);
                        }, 500);
                      }}
                      className="mt-3 block w-full rounded-xl bg-blue-50 py-2.5 text-center font-bold text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      {msg.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-4 border border-slate-100 shadow-sm">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {!isTyping && messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-6 pb-4">
              {["🔥 Busco ofertas", "⭐ Los más vendidos", "⚡ Oportunidades"].map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSubmit(undefined, sug)}
                  className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={(e) => handleSubmit(e)} className="border-t border-slate-100 bg-white p-4 sm:rounded-b-3xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ej: Necesito zapatillas talle 42..."
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500 focus:bg-white"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 shadow-sm"
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
              </button>
            </div>
            <div className="mt-3 text-center text-[10px] text-slate-400 font-medium">
              Asistente virtual impulsado para conectar con vendedores locales
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
