import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Terminos() {
  return (
    <>
      <Header />
      <main>
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
          <Stack spacing={3}>
            <Button
              component={RouterLink}
              to="/"
              startIcon={<ArrowBackIcon />}
              sx={{ alignSelf: "flex-start" }}
            >
              Volver al inicio
            </Button>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip color="primary" label="Bases del sorteo" />
              <Typography variant="h3" fontWeight={800} color="primary.main">
                Términos y Condiciones
              </Typography>
            </Stack>

            <Typography variant="body1" color="text.secondary">
              Al participar aceptas las siguientes reglas para el Sorteo Viajes
              Riviera México. El sorteo se realizará con la Lotería Nacional el
              6 de marzo de 2026 y está dirigido a la comunidad de seguidores de
              Viajes Riviera en Instagram.
            </Typography>

            <List dense disablePadding>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Requisito principal"
                  secondary="Seguir a la cuenta @viajesrivieramexico en Instagram y ser una persona real. Si no se cumplen las bases, se volverá a repetir el sorteo el siguiente viernes."
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Registro"
                  secondary="Completar el formulario con nombre, usuario de Instagram y seleccionar un único número de boleto disponible."
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Un boleto por persona"
                  secondary="Cada participante puede registrar solo un cupón. Registros duplicados o sospechosos podrán anularse."
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Mecánica de selección"
                  secondary="El número ganador se definirá con el resultado de la Lotería Nacional del 6 de marzo de 2026. Si el número no corresponde a un boleto válido, se correrá el sorteo nuevamente el viernes siguiente."
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Aviso y entrega"
                  secondary="Se contactará al ganador mediante mensaje directo a su cuenta de Instagram registrada. Si no responde dentro de 72 horas, se seleccionará un suplente."
                />
              </ListItem>
            </List>

            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                backgroundColor: "rgba(14,165,233,0.08)",
                border: "1px solid rgba(14,165,233,0.18)",
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Transparencia
              </Typography>
              <Typography variant="body2" color="text.secondary">
                El sorteo es gratuito y no requiere compra. La participación
                supone aceptar estas bases y el aviso de privacidad publicado en
                este sitio.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Terminos;
