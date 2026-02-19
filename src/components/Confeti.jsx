import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // para que se adapte al tamaño de la pantalla

function FiestaConfeti({ trigger }) {
  const { width, height } = useWindowSize();
  const [show, setShow] = useState(false);

  const segundos = 1000;
  const milisegundos = segundos * 1000;

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), milisegundos);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return show ? (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Confetti
        width={width}
        height={height}
        colors={["#FFD700", "#FF4500", "#32CD32", "#00BFFF"]}
      />
    </div>
  ) : null;
}

export default FiestaConfeti;
