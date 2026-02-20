import React from "react";
import { Box, Typography } from "@mui/material";
import headerImage from "../assets/bg.webp";
import xcaretLogo from "../assets/logo-xcaret.png";
import rivieraLogo from "../assets/logo.png";
import "../styles/header.css";

function Header() {
  return (
    <Box
      className="header"
      sx={{
        backgroundImage: `url(${headerImage})`,
      }}
    >
      <div className="overlay"></div>

      <div className="content">
        {/* Logos */}
        <div className="logos">
          <img src={xcaretLogo} alt="Xcaret" />
          <img src={rivieraLogo} alt="Viajes Riviera México" />
        </div>

        {/* Título */}
        <Typography variant="div" component="h1" className="title">
          Sorteo Viajes Riviera México
        </Typography>

        {/* Subtítulo */}
        <Typography variant="div" component="h2" className="subtitle">
          Para celebrar 600k seguidores, estamos sorteando un viaje a Xcaret
        </Typography>

        {/* Texto del regalo */}
        <Typography variant="div" component="p" className="giftText">
          ¡Vamos a regalar un viaje para 2 adultos y 2 menores al Hotel Xcaret
          México!
        </Typography>

        <Typography variant="div" component="p" className="drawDate">
          El sorteo se realizará con la Lotería Nacional el 6 de marzo de 2026.
        </Typography>
      </div>
    </Box>
  );
}

export default Header;
