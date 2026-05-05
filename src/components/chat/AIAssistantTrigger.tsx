"use client";

import { MessageSquare } from "lucide-react";

export default function AIAssistantTrigger() {
  const handleClick = () => {
    const btn = document.getElementById('ai-assistant-trigger');
    if (btn) btn.click();
  };

  return (
    <button 
      onClick={handleClick}
      className="mt-4 rounded-sm bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
    >
      <MessageSquare size={18} />
      Consultar al Asesor
    </button>
  );
}
