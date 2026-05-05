"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, User, Bot, ShoppingBag, Search, MessageSquare, Zap, Loader2 } from 'lucide-react';
import { products } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string, action?: { label: string, href: string } }[]>([
    { role: 'bot', content: '¡Hola! Soy tu asesor personal de compras. 🎩\n\nNo pierdas tiempo navegando, preguntame directamente qué necesitás y yo lo encuentro por vos.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const handleGuideEvent = (e: any) => {
      setIsOpen(true);
      if (e.detail?.message) {
        handleSend(e.detail.message);
      }
    };
    window.addEventListener('mdp-ai-guide', handleGuideEvent);
    return () => window.removeEventListener('mdp-ai-guide', handleGuideEvent);
  }, []);

  const handleSend = (text?: string) => {
    const userQuery = text || input.trim();
    if (!userQuery) return;

    setMessages(prev => [...prev, { role: 'user', content: userQuery }]);
    setInput('');
    setIsTyping(true);

    // AI Logic for MDP Market
    setTimeout(() => {
      const q = userQuery.toLowerCase();
      let response = "";
      let action = null;

      if (q.includes("taladro") || q.includes("herramienta") || q.includes("bosch")) {
        response = "Excelente elección. El Taladro Bosch GSB 18V-50 es el más potente que tenemos. Es Brushless y viene con maletín. ¿Querés que te lo muestre?";
        action = { label: "Ver Taladro Bosch", href: "/productos/PROD_BOSCH_GSB18V" };
      } else if (q.includes("iphone") || q.includes("apple") || q.includes("celular")) {
        response = "En tecnología, el iPhone 15 Pro Max Titanium Natural es el rey. Lo tenemos con envío gratis en Mar del Plata.";
        action = { label: "Ver iPhone 15 Pro Max", href: "/productos/PROD_IPHONE15_PM" };
      } else if (q.includes("limpieza") || q.includes("skip") || q.includes("detergente")) {
        response = "El Skip para diluir de 500ml es un éxito total porque rinde 3 litros y es súper económico. Está en oferta ahora mismo.";
        action = { label: "Ver Jabón Skip", href: "/productos/PROD_SKIP_DILUIR" };
      } else if (q.includes("oferta") || q.includes("barato") || q.includes("descuento")) {
        response = "Tengo varias ofertas destacadas hoy. ¿Buscás algo para el hogar o tecnología?";
        action = { label: "Ver todas las Ofertas", href: "/ofertas" };
      } else if (q.includes("hola") || q.includes("buen")) {
        response = "¡Hola! Estoy listo para ahorrarte tiempo. Decime qué producto buscás o qué presupuesto tenés y yo te guío.";
      } else {
        response = `Entendido, estoy buscando "${userQuery}" en el catálogo... Tenemos varias opciones premium que coinciden. ¿Te gustaría ver los resultados de búsqueda?`;
        action = { label: `Resultados para "${userQuery}"`, href: `/productos?q=${encodeURIComponent(userQuery)}` };
      }

      setMessages(prev => [...prev, { role: 'bot', content: response, action: action || undefined }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          id="ai-assistant-trigger"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-slate-900 p-2 pr-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all hover:scale-105 active:scale-95 border border-white/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg group-hover:rotate-12 transition-transform">
            <Sparkles size={24} fill="currentColor" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Asesor AI</span>
            <span className="text-sm font-bold leading-tight">¿Qué buscás hoy?</span>
          </div>
          <div className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[550px] w-[380px] flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.4)] animate-in slide-in-from-bottom-8 fade-in duration-500 border border-slate-100">
          {/* Header */}
          <div className="flex items-center justify-between bg-slate-900 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 rotate-3 shadow-lg">
                  <Bot size={24} />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 bg-green-500"></div>
              </div>
              <div>
                <div className="text-base font-bold">Asesor de Compras</div>
                <div className="text-[11px] font-medium text-blue-400">Mar del Plata • Inteligencia Artificial</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`relative max-w-[85%] rounded-[1.5rem] p-4 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  
                  {msg.action && (
                    <div className="mt-4">
                      <button 
                        onClick={() => {
                          setIsOpen(false);
                          router.push(msg.action!.href);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 px-4 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-all hover:translate-y-[-2px] active:translate-y-0"
                      >
                        <Zap size={14} fill="currentColor" className="text-amber-400" />
                        {msg.action.label}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-[1.5rem] rounded-tl-none p-4 shadow-sm border border-slate-100">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          {!isTyping && (
            <div className="flex gap-2 overflow-x-auto p-4 bg-white border-t border-slate-50 scrollbar-hide">
              {["¿Qué ofertas hay hoy?", "Buscame un iPhone", "Taladro Bosch", "Jabón Skip"].map((sug, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="whitespace-now800 shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all active:scale-95"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 bg-white pt-2">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Preguntame qué querés y te ahorro tiempo..."
                className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 py-4 pl-5 pr-14 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 disabled:bg-slate-300 disabled:shadow-none"
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Sparkles size={10} className="text-blue-500" />
              <span>MDP Market AI Guide</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
