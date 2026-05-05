"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, 
  ChevronLeft, Sparkles, CheckCircle2, AlertCircle 
} from "lucide-react";

export default function AccesoPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { login } = await import("@/app/actions/auth");
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const result = await login(formData);
      if (result?.success) {
        router.push("/dashboard/usuario");
      } else if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("Ocurrió un error inesperado.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ebebeb] flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#005eb8]"></div>
      
      <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-500">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#005eb8] transition-colors mb-6 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Logo & Header */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="flex flex-col items-center mb-4">
                <span className="text-3xl font-black italic leading-none text-[#005eb8]">MDP</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Market</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">¡Hola! Ingresá tu e-mail</h1>
              <p className="text-slate-500 text-sm mt-2">Para continuar, identificarte es el primer paso.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-sm text-red-600 text-sm animate-in shake duration-300">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">E-mail</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#005eb8] transition-colors" size={18} />
                  <input 
                    required
                    autoFocus
                    type="email" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="nombre@ejemplo.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm py-3.5 pl-12 pr-4 outline-none focus:bg-white focus:border-[#005eb8] focus:ring-4 focus:ring-blue-500/5 transition-all text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Contraseña</label>
                  <button type="button" className="text-[11px] font-bold text-blue-600 hover:underline">¿La olvidaste?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#005eb8] transition-colors" size={18} />
                  <input 
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tu contraseña"
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm py-3.5 pl-12 pr-12 outline-none focus:bg-white focus:border-[#005eb8] focus:ring-4 focus:ring-blue-500/5 transition-all text-slate-800"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                disabled={loading}
                type="submit"
                className="w-full bg-[#005eb8] text-white py-4 rounded-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-[#004a91] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Continuar
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-10">
              <div className="relative mb-8 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <span className="relative px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white">O también</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-sm hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-600">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-sm hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-600">
                  <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" alt="Facebook" />
                  Facebook
                </button>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
             <p className="text-xs text-slate-500">¿No tenés cuenta? <Link href="#" className="font-bold text-blue-600 hover:underline">Crear cuenta</Link></p>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale">
           <div className="flex items-center gap-2">
              <CheckCircle2 size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Pago Seguro</span>
           </div>
           <div className="flex items-center gap-2">
              <Sparkles size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">MDP Protegido</span>
           </div>
        </div>
      </div>
    </div>
  );
}
