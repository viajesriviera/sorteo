import React from "react";
import { Box, Button } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import fondoBoleto from "../assets/fondo-vertical.jpeg"; // tu imagen vertical

function BoletoConfirmado({ numero, nombre }) {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = fondoBoleto;
    img.onload = () => {
      setImageLoaded(true);

      // Dimensiones más pequeñas
      const maxWidth = 400; // ancho máximo del boleto
      const scale = maxWidth / img.width;
      const width = img.width * scale;
      const height = img.height * scale;

      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);

      // Dibujar la imagen centrada
      ctx.drawImage(img, 0, 0, width, height);

      // Espacio para los textos en la parte inferior
      const paddingBottom = 50;

      // Texto blanco
      ctx.fillStyle = "#ffffff";
      ctx.font = `600 32px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(
        nombre.split(" ").slice(0, 2).join(" ").toUpperCase(),
        width / 2,
        height - paddingBottom - 70,
      );

      // Texto con color y prefijo "No."
      ctx.fillStyle = "#043153";
      ctx.font = `900 28px Arial`;
      ctx.fillText(
        `N° ${numero}`.toUpperCase(),
        width / 2,
        height - paddingBottom,
      );
    };
  }, [numero]);

  const descargarImagen = () => {
    if (!canvasRef.current || !imageLoaded) return;
    const link = document.createElement("a");
    link.download = `boleto-${numero}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <Box
      display="flex"
      flexDirection="column" // para apilar canvas y botón verticalmente
      alignItems="center" // para centrar horizontalmente
      mt={4}
      gap={2} // espacio entre canvas y botón
    >
      <canvas ref={canvasRef} style={{ borderRadius: 16 }} />

      <Button variant="contained" onClick={descargarImagen} sx={{ mt: 2 }}>
        Descargar boleto
      </Button>
    </Box>
  );
}

export default BoletoConfirmado;
