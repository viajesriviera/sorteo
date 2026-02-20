import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <Box component="footer" className="footer">
      <div className="footer-content">
        <Typography variant="body2" className="footer-note">
          {"Bases: seguir la cuenta @viajesrivieramexico en Instagram y ser una persona real. Si no se cumplen las bases, se repetir\u00e1 el sorteo el siguiente viernes."}
        </Typography>

        <Typography variant="body2" className="footer-text">
          {"\u00a9 2026 Sorteo Viajes Riviera M\u00e9xico. Todos los derechos reservados."}
        </Typography>

        <Typography variant="body2" className="footer-links">
          <Link component={RouterLink} to="/terminos" underline="none">
            {"T\u00e9rminos y Condiciones"}
          </Link>
          <span className="separator">{"\u2022"}</span>
          <Link component={RouterLink} to="/aviso-privacidad" underline="none">
            Aviso de Privacidad
          </Link>
        </Typography>
      </div>
    </Box>
  );
}

export default Footer;
