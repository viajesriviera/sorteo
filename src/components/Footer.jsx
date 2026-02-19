import React from "react";
import { Box, Typography, Link } from "@mui/material";
import "../styles/footer.css";

function Footer() {
  return (
    <Box component="footer" className="footer">
      <div className="footer-content">
        <Typography variant="body2" className="footer-text">
          © 2026 Sorteo Xcaret. Todos los derechos reservados.
        </Typography>

        <Typography variant="body2" className="footer-links">
          <Link href="#" underline="none">
            Términos y Condiciones
          </Link>
          <span className="separator">•</span>
          <Link href="#" underline="none">
            Aviso de Privacidad
          </Link>
        </Typography>
      </div>
    </Box>
  );
}

export default Footer;
