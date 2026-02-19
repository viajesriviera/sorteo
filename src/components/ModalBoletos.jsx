import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

import {
  obtenerBloques,
  obtenerBoletosPorRango,
} from "../services/boletosService";

function ModalBoletos({ open, onClose, onSelect }) {
  const [bloques, setBloques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rangoActivo, setRangoActivo] = useState(null);
  const [boletos, setBoletos] = useState([]);

  // Cargar bloques al abrir
  useEffect(() => {
    if (open) cargarBloques();
  }, [open]);

  const cargarBloques = async () => {
    setLoading(true);
    const data = await obtenerBloques();
    setBloques(data);
    setLoading(false);
  };

  const cargarBoletos = async (bloque) => {
    setLoading(true);
    const data = await obtenerBoletosPorRango(bloque.inicio, bloque.fin);
    setBoletos(data);
    setRangoActivo(bloque);
    setLoading(false);
  };

  const volver = () => {
    setRangoActivo(null);
    setBoletos([]);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {rangoActivo
          ? `Boletos ${rangoActivo.inicio} - ${rangoActivo.fin}`
          : "Selecciona un rango"}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading && (
          <Box textAlign="center" py={4}>
            <CircularProgress />
          </Box>
        )}

        {!loading && !rangoActivo && (
          <Grid container spacing={2}>
            {bloques.map((bloque, index) => (
              <Grid item xs={6} md={4} key={index}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={bloque.disponibles === 0}
                  onClick={() => cargarBoletos(bloque)}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    backgroundColor:
                      bloque.disponibles === 0
                        ? "#ccc"
                        : bloque.disponibles < 20
                          ? "#f59e0b"
                          : "#10b981",
                    "&:hover": {
                      opacity: 0.9,
                    },
                  }}
                >
                  <Box>
                    <Typography fontWeight="bold">
                      {bloque.inicio} - {bloque.fin}
                    </Typography>
                    <Typography variant="caption">
                      {bloque.disponibles} disponibles
                    </Typography>
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && rangoActivo && (
          <>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={volver}
              sx={{ mb: 2 }}
            >
              Volver a rangos
            </Button>

            <Grid container spacing={1}>
              {boletos.map((numero) => (
                <Grid item xs={3} md={2} key={numero}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      onSelect(numero);
                      onClose();
                    }}
                    sx={{
                      borderRadius: 2,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#10b981",
                        color: "#fff",
                      },
                    }}
                  >
                    {numero}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ModalBoletos;
