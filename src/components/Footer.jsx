import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <Box component="footer" className="footer">
      <div className="footer-content">
        <Typography variant="body2" className="footer-text">
          © 2026 Sorteo Viajes Riviera México. Todos los derechos reservados.
        </Typography>

        <Typography variant="body2" className="footer-links">
          <Link component={RouterLink} to="/terminos" underline="none">
            Términos y Condiciones
          </Link>
          <span className="separator">•</span>
          <Link
            component={RouterLink}
            to="/aviso-privacidad"
            underline="none"
          >
            Aviso de Privacidad
          </Link>
        </Typography>
      </div>
    </Box>
  );
}

export default Footer;
