import Header from "../components/Header";
import FormRegistro from "../components/FormRegistro";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import FiestaConfeti from "../components/Confeti";

function Home() {
  const [celebrando, setCelebrando] = useState(false);

  const handleParticipar = () => {
    // Aquí podría ir tu lógica de backend o alerta de inscripción
    setCelebrando(true); // dispara confeti
  };

  useEffect(() => {
    handleParticipar();
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="relative z-10">
          <FormRegistro />
        </div>
      </main>
      <Footer />
      <FiestaConfeti trigger={celebrando} />
    </>
  );
}

export default Home;
