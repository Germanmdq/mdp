
"use client";

import { useState, useEffect, useRef } from "react";
import { Send, ShieldAlert, User, ShieldCheck, ArrowLeft, Phone, Mail, Link as LinkIcon, Info } from "lucide-react";
import Link from "next/link";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  blocked?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hola! ¿Tenés stock del iPhone?", sender: "user", timestamp: "14:00" },
    { id: 2, text: "Hola! Sí, tengo stock para entrega inmediata en la zona de Güemes.", sender: "other", timestamp: "14:02" },
    { id: 3, text: "Buenísimo, ¿podemos coordinar para hoy?", sender: "user", timestamp: "14:03" },
  ]);
  const [inputText, setInputText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Anti-bypass logic
    const bypassPatterns = [
      /\d{2,}\s?\d{2,}\s?\d{2,}/, // Phone numbers with spaces
      /\d{8,}/, // Long numbers
      /whatsapp/i,
      /wpp/i,
      /wsp/i,
      /teléfono/i,
      /telefono/i,
      /llámame/i,
      /llamame/i,
      /mail/i,
      /correo/i,
      /transferime/i,
      /directo/i,
      /por fuera/i,
      /@/, // Email
      /www\./, // Links
      /\.com/
    ];

    const isBypass = bypassPatterns.some(pattern => pattern.test(inputText));

    if (isBypass) {
      setShowAlert(true);
      setMessages([...messages, { 
        id: Date.now(), 
        text: inputText, 
        sender: "user", 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        blocked: true
      }]);
    } else {
      setMessages([...messages, { 
        id: Date.now(), 
        text: inputText, 
        sender: "user", 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setShowAlert(false);
    }
    
    setInputText("");
  };

  return (
    <div className="bg-slate-50 h-[calc(100vh-64px)] flex flex-col">
      <div className="container mx-auto max-w-4xl flex-1 flex flex-col bg-white border-x shadow-sm">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <Link href="/productos/p-celulares-y-tecnología-0" className="md:hidden p-2 text-slate-400">
              <ArrowLeft size={20} />
            </Link>
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
              T
            </div>
            <div>
              <div className="font-bold text-slate-900">Tienda Celu</div>
              <div className="flex items-center text-[10px] text-green-500 font-bold uppercase tracking-wider">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></div>
                En línea
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-1 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600 border border-blue-100 uppercase tracking-widest">
              <ShieldCheck size={14} className="mr-1" />
              <span>Chat Protegido</span>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-600 p-3 text-white text-center text-xs font-medium">
          Por seguridad, operá siempre dentro de MDP Market para mantener tu pago protegido.
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          <div className="text-center">
            <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase border border-slate-100">Hoy</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-slate-900 rounded-tl-none border border-slate-100"}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={`text-[10px] mt-2 flex items-center ${msg.sender === "user" ? "text-blue-200 justify-end" : "text-slate-400"}`}>
                  {msg.timestamp}
                </div>
                {msg.blocked && (
                  <div className="mt-3 pt-3 border-t border-white/20 flex items-start space-x-2 text-[10px] font-bold bg-white/10 p-2 rounded-lg">
                    <ShieldAlert size={14} className="shrink-0" />
                    <span>MENSAJE BLOQUEADO: El intercambio de datos de contacto está restringido para garantizar tu protección.</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {showAlert && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-amber-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center space-x-3 mb-3">
                <ShieldAlert size={24} className="text-amber-600" />
                <h3 className="font-bold text-lg">Aviso de Seguridad</h3>
              </div>
              <p className="text-sm mb-4 leading-relaxed">
                Por seguridad, los datos de contacto se habilitan únicamente cuando existe una operación protegida activa. Operar por fuera de la plataforma elimina la protección, el respaldo y la posibilidad de reclamo.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-1 rounded-lg bg-white/50 px-2 py-1 text-[10px] font-bold border border-amber-200 uppercase">
                  <Phone size={12} />
                  <span>No Teléfonos</span>
                </div>
                <div className="flex items-center space-x-1 rounded-lg bg-white/50 px-2 py-1 text-[10px] font-bold border border-amber-200 uppercase">
                  <Mail size={12} />
                  <span>No Emails</span>
                </div>
                <div className="flex items-center space-x-1 rounded-lg bg-white/50 px-2 py-1 text-[10px] font-bold border border-amber-200 uppercase">
                  <LinkIcon size={12} />
                  <span>No Links Externos</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t sticky bottom-0">
          <form onSubmit={handleSend} className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribí un mensaje..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
                <Send size={16} />
              </button>
            </div>
          </form>
          <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center">
            <Info size={10} className="mr-1" />
            Este chat está siendo monitoreado por el sistema de seguridad de MDP Market.
          </p>
        </div>
      </div>
    </div>
  );
}
