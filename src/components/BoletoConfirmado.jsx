import { Box, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import rivieraLogo from "../assets/logo.png";

const formatBoleto = (value) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return "00000";
  // Máximo 100,000 boletos → 6 dígitos. Se rellena con ceros a la izquierda.
  return String(Math.max(0, numeric)).padStart(5, "0").slice(-6);
};

function BoletoConfirmado({ boleto }) {
  const canvasRef = useRef(null);
  const formattedBoleto = formatBoleto(boleto);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1300;
    const height = 760;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = "100%";
    canvas.style.aspectRatio = `${width} / ${height}`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const drawGlow = (x, y, r, color, alpha = 0.22) => {
      const alphaHex = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0");
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `${color}${alphaHex}`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTicket = (logoImg) => {
      ctx.clearRect(0, 0, width, height);

      // Fondo suave
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#f8f7f5");
      bg.addColorStop(1, "#eef2ff");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Brillos abstractos
      drawGlow(width * 0.22, height * 0.18, 240, "#f48c25");
      drawGlow(width * 0.82, height * 0.78, 260, "#2e7d32");

      const cardX = 90;
      const cardY = 150;
      const cardW = 1120;
      const cardH = 480;
      const radius = 38;

      // Tarjeta principal
      ctx.save();
      ctx.shadowColor = "rgba(15, 23, 42, 0.15)";
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 10;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, radius);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.restore();

      // Patrón sutil
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, radius);
      ctx.clip();
      ctx.strokeStyle = "rgba(244,140,37,0.08)";
      ctx.lineWidth = 18;
      ctx.setLineDash([26, 28]);
      for (let i = -cardH; i < cardW + cardH; i += 46) {
        ctx.beginPath();
        ctx.moveTo(cardX + i, cardY);
        ctx.lineTo(cardX + i - cardH, cardY + cardH);
        ctx.stroke();
      }
      ctx.restore();

      // Encabezado superior
      ctx.fillStyle = "#2e7d32";
      ctx.font = '700 64px "Segoe UI", "Plus Jakarta Sans", Arial';
      ctx.textAlign = "center";
      ctx.fillText("¡Felicidades!", width / 2, 110);

      ctx.fillStyle = "#475569";
      ctx.font = '500 26px "Segoe UI", "Plus Jakarta Sans", Arial';
      // Más espacio entre título y subtítulo
      ctx.fillText(
        "Tu participación ha sido registrada con éxito",
        width / 2,
        190,
      );

      // Etiqueta sorteo
      ctx.fillStyle = "rgba(244,140,37,0.12)";
      ctx.beginPath();
      ctx.roundRect(cardX + 28, cardY + 26, 170, 36, 14);
      ctx.fill();
      ctx.fillStyle = "#f48c25";
      ctx.font = '700 16px "Segoe UI", "Plus Jakarta Sans", Arial';
      ctx.textAlign = "left";
      ctx.fillText("SORTEO PREMIUM", cardX + 46, cardY + 50);

      // Marca
      ctx.fillStyle = "#0f172a";
      ctx.font = '800 42px "Segoe UI", "Plus Jakarta Sans", Arial';
      ctx.fillText("Viajes Riviera México", cardX + 28, cardY + 105);

      // Ícono avión
      ctx.textAlign = "right";
      ctx.font = '700 52px "Segoe UI Emoji", "Segoe UI Symbol"';
      ctx.fillStyle = "#f48c25";
      ctx.fillText("✈", cardX + cardW - 32, cardY + 86);

      // Número de boleto
      ctx.textAlign = "center";
      ctx.fillStyle = "#64748b";
      ctx.font = '600 20px "Segoe UI", "Plus Jakarta Sans", Arial';
      ctx.fillText("Tu número de boleto", cardX + cardW / 2, cardY + 225);

      const boxW = 540;
      const boxH = 150;
      const boxX = cardX + cardW / 2 - boxW / 2;
      const boxY = cardY + 250;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, 26);
      ctx.strokeStyle = "#f48c25";
      ctx.lineWidth = 4;
      ctx.setLineDash([18, 14]);
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = "#0f172a";
      ctx.font = '900 78px "Segoe UI", "Plus Jakarta Sans", Arial';
      ctx.fillText(
        `#${formattedBoleto}`,
        cardX + cardW / 2,
        boxY + boxH / 2 + 26,
      );

      // Info inferior
      ctx.textAlign = "left";
      ctx.fillStyle = "#94a3b8";
      ctx.font = '700 13px "Segoe UI", "Plus Jakarta Sans", Arial';
      const infoLabelY = cardY + cardH - 60;
      ctx.fillText("Fecha del sorteo", cardX + 32, infoLabelY);
      ctx.textAlign = "right";
      ctx.fillText("Sitio oficial", cardX + cardW - 32, infoLabelY);

      ctx.fillStyle = "#0f172a";
      ctx.font = '700 22px "Segoe UI", "Plus Jakarta Sans", Arial';
      const infoValueY = cardY + cardH - 30;
      ctx.textAlign = "left";
      ctx.fillText("15 de julio, 2026", cardX + 32, infoValueY);
      ctx.textAlign = "right";
      ctx.fillText("www.viajesriviera.com", cardX + cardW - 32, infoValueY);

      // Leyenda
      ctx.textAlign = "center";
      ctx.fillStyle = "#94a3b8";
      ctx.font = '500 16px "Segoe UI", "Plus Jakarta Sans", Arial';
      ctx.fillText(
        //"Este boleto es digital y transferible. Presenta tu identificación para validar.",
        "",
        width / 2,
        height - 50,
      );

      // Logo como marca de agua
      if (logoImg && logoImg.complete) {
        const maxLogo = 220;
        const scale = maxLogo / logoImg.width;
        const logoW = logoImg.width * scale;
        const logoH = logoImg.height * scale;
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.drawImage(
          logoImg,
          cardX + cardW - logoW - 24,
          cardY + cardH / 2 - logoH / 2,
          logoW,
          logoH,
        );
        ctx.restore();
      }
    };

    const logo = new Image();
    logo.src = rivieraLogo;
    logo.onload = () => drawTicket(logo);

    drawTicket();
  }, [formattedBoleto]);

  const descargarImagen = () => {
    const link = document.createElement("a");
    link.download = `boleto-${formattedBoleto}.png`;
    link.href = canvasRef.current.toDataURL("image/png", 1.0);
    link.click();
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(120deg, #f8f7f5, #eef2ff)",
        padding: { xs: 3, md: 4 },
        borderRadius: 4,
        maxWidth: 1100,
        mx: "auto",
        boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "90%",
          maxWidth: "960px",
          margin: "0 auto",
          borderRadius: "24px",
          display: "block",
        }}
      />

      <Button
        variant="contained"
        size="large"
        onClick={descargarImagen}
        sx={{
          mt: 4,
          background: "linear-gradient(120deg, #2e7d32, #0f9d58)",
          fontWeight: "bold",
          fontSize: { xs: "0.95rem", sm: "1rem" },
          px: { xs: 2.8, sm: 4 },
          py: { xs: 1.1, sm: 1.4 },
          borderRadius: 3,
          width: { xs: "100%", sm: "auto" },
          maxWidth: 380,
          boxShadow: "0 18px 40px rgba(16,185,129,0.25)",
          "&:hover": {
            background: "linear-gradient(120deg, #2a7430, #0d8a4c)",
          },
        }}
      >
        Descargar boleto
      </Button>
    </Box>
  );
}

export default BoletoConfirmado;
