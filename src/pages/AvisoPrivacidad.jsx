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

function AvisoPrivacidad() {
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
              <Chip color="secondary" label="Protección de datos" />
              <Typography variant="h3" fontWeight={800} color="secondary.main">
                Aviso de Privacidad
              </Typography>
            </Stack>

            <Typography variant="body1" color="text.secondary">
              Este aviso describe cómo Viajes Riviera México trata los datos
              personales recabados a través del formulario de registro para el
              Sorteo Viajes Riviera México.
            </Typography>

            <List dense disablePadding>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Datos que solicitamos"
                  secondary="Nombre completo, usuario de Instagram (obligatorio seguir @viajesrivieramexico) y número de boleto seleccionado."
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Finalidades del tratamiento"
                  secondary="(a) Registrar tu participación y asignar un cupón único, (b) validar que cumples las bases del sorteo, (c) contactar a la persona ganadora por mensaje directo en Instagram."
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Dónde se almacena"
                  secondary="Los datos se envían a nuestro servicio seguro definido en VITE_API_URL y se guardan temporalmente en tu navegador (localStorage) para mostrar tu boleto confirmado sin volver a rellenar el formulario."
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Plazo de conservación"
                  secondary="Conservamos la información solo durante la vigencia del sorteo, el proceso de validación y la entrega del premio. Después se elimina o anonimiza."
                />
              </ListItem>
              <Divider component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Tus derechos"
                  secondary="Puedes solicitar la corrección o eliminación de tus datos enviando un mensaje directo a @viajesrivieramexico desde la cuenta registrada en el formulario."
                />
              </ListItem>
            </List>

            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                backgroundColor: "rgba(79,70,229,0.08)",
                border: "1px solid rgba(79,70,229,0.18)",
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Seguridad
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tomamos medidas técnicas y administrativas para proteger la
                confidencialidad de tus datos. No vendemos ni compartimos tu
                información con terceros ajenos al sorteo.
              </Typography>
            </Box>
          </Stack>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default AvisoPrivacidad;
