"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, User, Bot, ShoppingBag, Search, MessageSquare } from 'lucide-react';
import { products } from '@/lib/data';
import Link from 'next/link';

export default function ShoppingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string, action?: any }[]>([
    { role: 'bot', content: '¡Hola! Soy tu asistente de MDP Market. ¿Qué estás buscando hoy? Te ayudo a encontrar lo mejor al mejor precio.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulated AI Logic
    setTimeout(() => {
      const lowerMsg = userMessage.toLowerCase();
      let response = "";
      let action = null;

      if (lowerMsg.includes("taladro") || lowerMsg.includes("herramienta")) {
        const drill = products.find(p => p.id === "PROD_BOSCH_GSB18V");
        response = "Te recomiendo el Taladro Bosch GSB 18V-50. Es motor Brushless, viene con maletín y es de lo mejor que tenemos en stock hoy.";
        action = { label: "Ver Taladro Bosch", href: "/productos/PROD_BOSCH_GSB18V" };
      } else if (lowerMsg.includes("iphone") || lowerMsg.includes("celular")) {
        response = "El iPhone 15 Pro Max Natural Titanium acaba de entrar y tiene envío gratis. ¿Te interesa ver los detalles técnicos?";
        action = { label: "Ver iPhone 15 Pro Max", href: "/productos/PROD_IPHONE15_PM" };
      } else if (lowerMsg.includes("limpieza") || lowerMsg.includes("skip")) {
        response = "¡Excelente elección! El Skip para diluir rinde 3 litros y es súper económico. Lo tenés con envío Full.";
        action = { label: "Ver Jabón Skip", href: "/productos/PROD_SKIP_DILUIR" };
      } else if (lowerMsg.includes("hola") || lowerMsg.includes("buen")) {
        response = "¡Hola! Estoy listo para ayudarte. Podés preguntarme por productos específicos, categorías o incluso pedirme recomendaciones de ofertas.";
      } else {
        response = "Entiendo. Dejame buscar en nuestro catálogo... Tenemos excelentes opciones en Tecnología, Hogar y Herramientas. ¿Buscás algo de alguna marca en especial?";
      }

      setMessages(prev => [...prev, { role: 'bot', content: response, action }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 p-1 pr-4 text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg group-hover:rotate-12 transition-transform">
            <Sparkles size={20} fill="currentColor" />
          </div>
          <span className="text-sm font-bold tracking-tight">Asesor AI</span>
          <div className="absolute -right-2 -top-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[500px] w-[350px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-in slide-in-from-bottom-4 duration-300 border border-slate-100">
          {/* Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <Bot size={18} />
              </div>
              <div>
                <div className="text-sm font-bold">Asesor de Compras</div>
                <div className="flex items-center gap-1 text-[10px] text-blue-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                  En línea ahora
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/10">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.content}
                  
                  {msg.action && (
                    <div className="mt-3">
                      <Link 
                        href={msg.action.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2 px-3 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                      >
                        <ShoppingBag size={14} />
                        {msg.action.label}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-slate-100">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-75"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-100 p-4 bg-white">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="¿Qué buscás hoy?"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:bg-slate-300"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-2 text-center text-[10px] text-slate-400">
              Asistente inteligente basado en tus preferencias
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
