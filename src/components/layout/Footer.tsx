
import Link from "next/link";
import { ShieldCheck, Globe, Share2, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <ShieldCheck className="text-blue-500" size={32} />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">MDP Market</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">& Services</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              El ecosistema digital de confianza para comprar, vender y contratar servicios en Mar del Plata.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="hover:text-blue-500 transition-colors"><Globe size={20} /></Link>
              <Link href="#" className="hover:text-blue-500 transition-colors"><Share2 size={20} /></Link>
              <Link href="#" className="hover:text-blue-500 transition-colors"><Mail size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-bold text-white uppercase text-xs tracking-widest">Plataforma</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/productos" className="hover:text-white transition-colors">Productos</Link></li>
              <li><Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link></li>
              <li><Link href="/como-funciona" className="hover:text-white transition-colors">Cómo funciona</Link></li>
              <li><Link href="/pago-protegido" className="hover:text-white transition-colors">Pago Protegido</Link></li>
              <li><Link href="/inversores" className="hover:text-white transition-colors">Inversores</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-bold text-white uppercase text-xs tracking-widest">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Centro de ayuda</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Reglas de convivencia</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Términos y condiciones</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacidad</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-bold text-white uppercase text-xs tracking-widest">Contacto Local</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span>Güemes 2500, Mar del Plata, Argentina</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+54 223 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>hola@mdpmarket.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} MDP Market & Services. Todos los derechos reservados. Desarrollado en Mar del Plata.</p>
        </div>
      </div>
    </footer>
  );
}
