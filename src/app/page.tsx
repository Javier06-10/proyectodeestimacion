"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleclick = () => {
    router.push("/estimaciontiempo");
  };
  const handleclickcoste = () => {
    router.push("/estimacioncoste");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-800">AppEstimación</h1>
          <p className="text-gray-600 mt-2">
            Herramienta profesional de estimación de proyectos
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Estima tus proyectos con precisión
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              AppEstimación es una plataforma diseñada para ayudar a equipos de
              desarrollo a realizar estimaciones precisas y realistas en sus
              proyectos de software.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="text-indigo-600 font-bold mr-3">✓</span>
                Análisis detallado de tareas
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 font-bold mr-3">✓</span>
                Seguimiento en tiempo real
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 font-bold mr-3">✓</span>
                Reportes y métricas avanzadas
              </li>
              <li className="flex items-center">
                <span className="text-indigo-600 font-bold mr-3">✓</span>
                Colaboración en equipo
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Por qué usar AppEstimación?
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Precisión:</strong> Reduce errores en tus estimaciones y
                mejora la planificación.
              </p>
              <p>
                <strong>Eficiencia:</strong> Ahorra tiempo en el análisis y
                evaluación de proyectos.
              </p>
              <p>
                <strong>Visibilidad:</strong> Mantén a todos informados sobre el
                progreso del proyecto.
              </p>
              <p>
                <strong>Datos:</strong> Toma decisiones basadas en métricas y
                datos históricos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h3>
          <button
            onClick={handleclick}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Crear Proyecto
          </button>
        </div>
      </section>
    </div>
  );
}
