
import { Briefcase, Calendar, Star, Clock, CheckCircle2, MessageSquare, Plus, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

export default function ProfessionalDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-3xl font-bold text-slate-900">Panel Profesional</h1>
            <div className="flex items-center space-x-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 uppercase">
              <CheckCircle2 size={12} />
              <span>Verificado Plus</span>
            </div>
          </div>
          <p className="text-slate-500">Gestioná tus servicios y turnos en Mar del Plata.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
            Ver Agenda
          </button>
          <button className="flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            <Plus size={20} className="mr-2" />
            Nuevo Servicio
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Upcoming Reservations */}
          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Próximos Turnos</h2>
            <div className="space-y-4">
              {[
                { time: "16:00", client: "María García", service: "Revisión de Gas", zone: "Güemes", status: "Confirmado" },
                { time: "18:30", client: "Pedro Soler", service: "Instalación Cocina", zone: "La Perla", status: "Pendiente" },
              ].map((job, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 bg-slate-50/50">
                  <div className="flex items-center space-x-4">
                    <div className="text-center bg-white rounded-xl p-2 border border-slate-100 shadow-sm min-w-[60px]">
                      <div className="text-xs font-bold text-blue-600">{job.time}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Hoy</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{job.client}</div>
                      <div className="text-xs text-slate-500">{job.service} • {job.zone}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${job.status === 'Confirmado' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                      {job.status}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full text-center py-3 text-sm font-bold text-blue-600 hover:underline">
              Ver calendario completo
            </button>
          </div>

          {/* Active Services List */}
          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Mis Servicios</h2>
            <div className="space-y-4">
              {[
                { name: "Revisión de Gasista Matriculado", price: "$5.500", reviews: 48, status: "Activo" },
                { name: "Instalación de Termotanque", price: "$12.000", reviews: 32, status: "Activo" },
              ].map((srv, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{srv.name}</div>
                      <div className="flex items-center text-xs text-slate-400">
                        <Star size={12} className="text-amber-400 fill-amber-400 mr-1" />
                        <span className="font-bold text-slate-500 mr-2">4.9</span>
                        <span>{srv.reviews} opiniones</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{srv.price}</div>
                    <div className="text-[10px] font-bold text-blue-600 uppercase">{srv.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Resumen Profesional</h3>
            <div className="space-y-6">
              <div>
                <div className="text-3xl font-bold text-blue-400">4.9</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Reputación General</div>
              </div>
              <div>
                <div className="text-3xl font-bold">128</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Servicios Realizados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500">$42.300</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Cobros Pendientes</div>
              </div>
            </div>
            <hr className="my-8 border-slate-800" />
            <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors">
              Ver Billetera
            </button>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">Zonas de Cobertura</h3>
            <div className="space-y-2">
              {["Centro", "Güemes", "Punta Mogotes", "La Perla"].map((zone, i) => (
                <div key={i} className="flex items-center text-sm text-slate-600">
                  <MapPin size={14} className="mr-2 text-blue-500" />
                  <span>{zone}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 text-xs font-bold text-blue-600 hover:underline">
              Editar zonas de atención
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
