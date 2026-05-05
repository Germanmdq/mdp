"use client";

import { useState } from "react";
import { 
  Upload, Camera, Tag, DollarSign, Package, Save, ArrowLeft, 
  ChevronRight, CheckCircle2, Image as ImageIcon, Info, Plus, X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PublicarProducto() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<number[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "new",
    price: "",
    stock: "1",
    description: "",
    brand: "",
    model: ""
  });

  const steps = [
    { id: 1, name: "Título", icon: Tag },
    { id: 2, name: "Categoría", icon: Tag },
    { id: 3, name: "Detalles", icon: Info },
    { id: 4, name: "Precio y Fotos", icon: Camera },
  ];

  const handleImageUpload = () => {
    if (uploadedImages.length >= 6) return;
    const newId = Date.now();
    setUploadingImages(prev => [...prev, newId]);
    
    // Simular progreso de carga
    setTimeout(() => {
      setUploadingImages(prev => prev.filter(id => id !== newId));
      setUploadedImages(prev => [...prev, `https://picsum.photos/seed/${newId}/400/400`]);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    // Add processed data
    formData.append("images", JSON.stringify(uploadedImages));
    formData.append("attributes", JSON.stringify([
      { name: "Marca", value_name: formData.get("brand") },
      { name: "Modelo", value_name: formData.get("model") }
    ]));

    try {
      const { createProduct } = await import("@/app/actions/product");
      const result = await createProduct(formData);
      if (result.success) {
        setCompleted(true);
        setTimeout(() => {
          router.push(`/productos/${result.id}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Error publishing product:", error);
      alert("Hubo un error al publicar el producto.");
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle2 size={64} />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">¡Producto publicado!</h1>
          <p className="text-slate-500 text-lg">Tu producto ya está visible para miles de compradores en Mar del Plata.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard/vendedor" className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50">
            Ir a mis publicaciones
          </Link>
          <button onClick={() => window.location.reload()} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20">
            Publicar otro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/vendedor" className="p-2.5 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors border border-slate-100">
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Publicar en MDP Market</h1>
        </div>
        <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
          Paso {step} de 4
        </div>
      </div>

      {/* Stepper Visual */}
      <div className="flex items-center justify-between mb-12 px-4">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className={`flex flex-col items-center gap-2 relative z-10`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step >= s.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-400'
              }`}>
                {step > s.id ? <CheckCircle2 size={20} /> : <s.icon size={20} />}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s.id ? 'text-blue-600' : 'text-slate-400'}`}>
                {s.name}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${step > s.id ? 'bg-blue-600' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="p-8 md:p-12">
          
          {/* STEP 1: TITLE */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Empecemos con un título para tu producto</h2>
                <p className="text-slate-500">Evitá incluir información de contacto o promociones.</p>
              </div>
              <div className="space-y-4">
                <input 
                  required 
                  autoFocus
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ej: Taladro Percutor Bosch GSB 18V-50" 
                  className="w-full text-2xl font-medium border-b-2 border-slate-200 py-4 outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300" 
                />
                <input type="hidden" name="category" value={formData.category} />
                <div className="flex gap-2">
                   <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full font-medium">Sugerencia: Marca + Modelo + Características</span>
                </div>
              </div>
              <div className="pt-8 flex justify-end">
                <button 
                  type="button" 
                  disabled={!formData.title}
                  onClick={() => setStep(2)} 
                  className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                >
                  Siguiente <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CATEGORY */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">¿En qué categoría lo publicarías?</h2>
                <p className="text-slate-500">Detectamos que tu producto podría pertenecer a estas categorías:</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Celulares y tecnología", "Hogar y muebles", "Herramientas", "Indumentaria", "Supermercado"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setFormData({...formData, category: cat});
                      setStep(3);
                    }}
                    className="flex items-center justify-between p-6 border border-slate-200 rounded-2xl hover:border-blue-600 hover:bg-blue-50/50 transition-all group text-left"
                  >
                    <span className="font-bold text-slate-700 group-hover:text-blue-700">{cat}</span>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
              <div className="pt-8 flex justify-between items-center">
                <button type="button" onClick={() => setStep(1)} className="font-bold text-slate-400 hover:text-slate-600 transition-colors">Volver</button>
                <button type="button" className="text-blue-600 font-bold text-sm hover:underline">Elegir otra categoría</button>
              </div>
            </div>
          )}

          {/* STEP 3: DETAILS */}
          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Cuentanos más sobre el producto</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Marca</label>
                  <input name="brand" type="text" placeholder="Ej: Bosch" className="w-full rounded-xl border border-slate-200 px-5 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Modelo</label>
                  <input name="model" type="text" placeholder="Ej: GSB 18V-50" className="w-full rounded-xl border border-slate-200 px-5 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Condición</label>
                <div className="flex gap-4">
                  {['new', 'used'].map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setFormData({...formData, condition: cond})}
                      className={`flex-1 p-5 rounded-2xl border-2 transition-all font-bold ${
                        formData.condition === cond ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      {cond === 'new' ? 'Nuevo' : 'Usado'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Descripción detallada</label>
                <textarea name="description" rows={6} className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all resize-none" placeholder="Describe los detalles, garantía, qué incluye el paquete..."></textarea>
              </div>

              <div className="pt-8 flex justify-between items-center">
                <button type="button" onClick={() => setStep(2)} className="font-bold text-slate-400 hover:text-slate-600 transition-colors">Volver</button>
                <button type="button" onClick={() => setStep(4)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">Continuar</button>
              </div>
            </div>
          )}

          {/* STEP 4: PRICE & PHOTOS */}
          {step === 4 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Para terminar, precio y fotos</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Precio de venta</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400">$</span>
                      <input required name="price" type="number" placeholder="0" className="w-full text-3xl font-bold rounded-2xl border border-slate-200 pl-12 pr-6 py-5 outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <p className="text-xs text-slate-400">MDP Market cobrará una comisión del 10% por venta.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Stock</label>
                    <input name="stock" type="number" defaultValue="1" className="w-full rounded-xl border border-slate-200 px-5 py-4 outline-none focus:border-blue-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Fotos (Máx 6)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Upload Button */}
                    {uploadedImages.length < 6 && (
                      <button 
                        type="button"
                        onClick={handleImageUpload}
                        className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer group"
                      >
                        <Camera size={24} className="text-slate-300 group-hover:text-blue-500" />
                        <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600">SUBIR</span>
                      </button>
                    )}

                    {/* Uploading State */}
                    {uploadingImages.map(id => (
                      <div key={id} className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-4">
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                          <div className="h-full bg-blue-600 animate-progress-fast" />
                        </div>
                        <span className="text-[8px] font-bold text-blue-600">CARGANDO...</span>
                      </div>
                    ))}

                    {/* Uploaded Photos */}
                    {uploadedImages.map((url, i) => (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group">
                        <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setUploadedImages(prev => prev.filter((_, idx) => idx !== i))}
                          className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}

                    {/* Placeholders */}
                    {Array.from({ length: Math.max(0, 6 - uploadedImages.length - uploadingImages.length - (uploadedImages.length < 6 ? 1 : 0)) }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <ImageIcon size={20} className="text-slate-200" />
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl flex gap-3">
                    <Info size={18} className="text-amber-500 shrink-0" />
                    <p className="text-[11px] text-amber-700 leading-relaxed">Tip: Las fotos con fondo blanco y buena iluminación venden hasta un 40% más rápido.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                <button type="button" onClick={() => setStep(3)} className="font-bold text-slate-400 hover:text-slate-600 transition-colors">Volver</button>
                <button 
                  disabled={loading} 
                  type="submit" 
                  className="flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Publicando...
                    </div>
                  ) : (
                    <>
                      <Save size={22} />
                      Publicar Producto
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>
      </form>
    </div>
  );
}
