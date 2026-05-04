
import { services } from "@/lib/data";
import { ShieldCheck, Star, Clock, CheckCircle2, Calendar, MessageSquare, MapPin, Award, ChevronRight, GraduationCap, Briefcase } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = services.find(s => s.id === id);
  
  if (!service) notFound();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Professional Header */}
      <div className="bg-white border-b pt-12 pb-24">
        <div className="container mx-auto px-4">
          <nav className="mb-8 flex items-center space-x-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={14} />
            <Link href="/servicios" className="hover:text-blue-600">Servicios</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900">{service.category}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-3xl border-4 border-white shadow-xl">
              <img src={service.image} alt={service.professionalName} className="h-full w-full object-cover" />
              {service.verified && (
                <div className="absolute bottom-2 right-2 rounded-full bg-blue-600 p-1.5 text-white shadow-lg">
                  <ShieldCheck size={24} />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="mb-2 inline-flex items-center space-x-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wide">
                <CheckCircle2 size={14} />
                <span>Profesional Verificado</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{service.professionalName}</h1>
              <p className="text-xl text-slate-600 mb-6">{service.name}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="text-amber-400 fill-amber-400" size={20} />
                  <span className="text-lg font-bold">{service.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({service.reviews} opiniones)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="text-blue-500" size={20} />
                  <span className="text-sm font-bold text-slate-700">{service.completedJobs} trabajos realizados</span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 border-t border-slate-100 pt-6">
                <div className="flex items-center space-x-3 text-slate-600">
                  <GraduationCap className="text-slate-400" size={20} />
                  <span className="text-sm font-semibold">{service.education}</span>
                </div>
                <div className="hidden md:block w-px bg-slate-200"></div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <Briefcase className="text-slate-400" size={20} />
                  <span className="text-sm font-semibold">{service.experienceYears} años de experiencia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* About */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Sobre el servicio</h2>
              <p className="text-slate-600 leading-relaxed text-lg italic mb-8 border-l-4 border-blue-500 pl-6">
                "{service.description}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Zonas de cobertura</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.zone.map((z, i) => (
                      <span key={i} className="flex items-center rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 border border-slate-100">
                        <MapPin size={14} className="mr-2 text-slate-400" />
                        {z}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Disponibilidad</h3>
                  <div className="flex items-center rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-green-700 border border-green-100 w-fit">
                    <Calendar size={16} className="mr-2" />
                    Disponible {service.availability}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Simulation */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-8">Opiniones de clientes</h2>
              <div className="space-y-8">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className={i !== 0 ? "border-t pt-8" : ""}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100"></div>
                        <span className="font-bold">Usuario Marplatense</span>
                      </div>
                      <div className="flex text-amber-400">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                      </div>
                    </div>
                    <p className="text-slate-600">Excelente atención y puntualidad. Muy recomendable para trabajos en el centro.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Presupuesto inicial</div>
                <div className="text-4xl font-extrabold text-slate-900 mb-8">${service.priceFrom.toLocaleString("es-AR")}</div>
                
                {service.availableSlots && service.availableSlots.length > 0 && (
                  <div className="mb-8">
                    <div className="text-sm font-bold text-slate-900 mb-4">Horarios disponibles para hoy</div>
                    <div className="grid grid-cols-3 gap-2">
                      {service.availableSlots.map((time, i) => (
                        <button key={i} className="py-2 px-1 text-center rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <Link href={`/checkout?type=service&id=${service.id}`} className="flex w-full items-center justify-center rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-200">
                    Reservar Turno Protegido
                  </Link>
                  <button className="flex w-full items-center justify-center rounded-2xl border border-slate-200 py-4 text-lg font-bold text-slate-700 transition-all hover:bg-slate-50">
                    <MessageSquare className="mr-2" size={20} />
                    Solicitar presupuesto
                  </button>
                </div>

                <div className="mt-8 rounded-2xl bg-blue-600 p-6 text-white">
                  <div className="flex items-start space-x-3 mb-4">
                    <ShieldCheck className="shrink-0 mt-1" size={20} />
                    <div className="text-sm font-bold uppercase tracking-wide">Reserva Protegida MDP</div>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Tu pago queda en custodia de la plataforma. Solo se libera al profesional una vez que confirmás la realización del servicio.
                  </p>
                  <div className="mt-4 flex items-center space-x-2 text-[10px] font-bold text-blue-200">
                    <Clock size={12} />
                    <span>Responde en menos de {service.responseTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
