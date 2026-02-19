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
  Chip,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";

import {
  obtenerBloques,
  obtenerBoletosPorRango,
} from "../services/boletosService";

const availabilityTone = (disponibles) => {
  if (disponibles === 0) {
    return {
      color: "#64748b",
      chipBg: "rgba(100,116,139,0.12)",
      badgeBg: "rgba(100,116,139,0.16)",
    };
  }
  if (disponibles < 20) {
    return {
      color: "#f97316",
      chipBg: "rgba(249,115,22,0.12)",
      badgeBg: "rgba(249,115,22,0.18)",
    };
  }
  return {
    color: "#16a34a",
    chipBg: "rgba(22,163,74,0.12)",
    badgeBg: "rgba(22,163,74,0.18)",
  };
};

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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 28px 60px rgba(15,23,42,0.35)",
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
          color: "#fff",
        }}
      >
        <Stack spacing={0.3}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 1.2, color: "rgba(255,255,255,0.78)" }}
          >
            Elige tu suerte
          </Typography>
          <Typography variant="h6" fontWeight={800} color="#fff">
            {rangoActivo
              ? `Boletos ${rangoActivo.inicio} - ${rangoActivo.fin}`
              : "Selecciona un rango de boletos"}
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
          sx={{
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.16)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          backgroundColor: "#f8fafc",
          pb: 4,
        }}
      >
        {loading && (
          <Box textAlign="center" py={5}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" mt={2}>
              Cargando disponibilidad en tiempo real...
            </Typography>
          </Box>
        )}

        {!loading && !rangoActivo && (
          <>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              mb={2}
              mt={4}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <LocalActivityOutlinedIcon sx={{ color: "#0ea5e9" }} />
                <Typography variant="body2" color="text.secondary">
                  Selecciona el bloque que prefieras para ver sus números.
                </Typography>
              </Stack>
              <Chip
                label="Disponibilidad actualizada"
                size="small"
                sx={{ bgcolor: "rgba(14,165,233,0.12)", fontWeight: 600 }}
              />
            </Stack>

            <Grid container spacing={2.5}>
              {bloques.map((bloque, index) => {
                const tone = availabilityTone(bloque.disponibles);
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Button
                      fullWidth
                      onClick={() => cargarBoletos(bloque)}
                      disabled={bloque.disponibles === 0}
                      sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: 1.5,
                        textAlign: "left",
                        p: 2.5,
                        borderRadius: 3,
                        border: "1px solid rgba(15,23,42,0.06)",
                        backgroundColor: "#fff",
                        boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
                        transition:
                          "transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 16px 40px rgba(14,165,233,0.18)",
                          backgroundColor: "#fff",
                        },
                        "&:disabled": {
                          opacity: 0.45,
                          transform: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          backgroundColor: tone.badgeBg,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <ConfirmationNumberOutlinedIcon
                          sx={{ color: tone.color }}
                        />
                      </Box>

                      <Box flex={1}>
                        <Typography variant="caption" color="text.secondary">
                          Rango
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          color="#0f172a"
                        >
                          {bloque.inicio} - {bloque.fin}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          mt={1}
                          alignItems="center"
                        >
                          <Chip
                            size="small"
                            label={`${bloque.disponibles} disponibles`}
                            sx={{
                              color: tone.color,
                              bgcolor: tone.chipBg,
                              fontWeight: 700,
                            }}
                          />
                          {bloque.disponibles > 0 &&
                            bloque.disponibles < 20 && (
                              <Chip
                                size="small"
                                label="¡Quedan pocos!"
                                sx={{
                                  bgcolor: "rgba(249,115,22,0.16)",
                                  color: "#c2410c",
                                }}
                              />
                            )}
                        </Stack>
                      </Box>
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}

        {!loading && rangoActivo && (
          <>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              mb={2}
            >
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={volver}
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Volver a rangos
              </Button>
              <Chip
                label={`${boletos.length} números disponibles`}
                sx={{
                  bgcolor: "rgba(14,165,233,0.12)",
                  fontWeight: 700,
                  color: "#0ea5e9",
                }}
              />
            </Stack>

            <Grid container spacing={1.25}>
              {boletos.map((numero) => (
                <Grid item xs={4} sm={3} md={2} key={numero}>
                  <Button
                    fullWidth
                    onClick={() => {
                      onSelect(numero);
                      onClose();
                    }}
                    sx={{
                      borderRadius: 2.5,
                      fontWeight: 800,
                      py: 1.2,
                      textTransform: "none",
                      backgroundColor: "#fff",
                      border: "1px solid rgba(15,23,42,0.08)",
                      boxShadow: "0 8px 18px rgba(15,23,42,0.06)",
                      "&:hover": {
                        backgroundColor: "#0ea5e9",
                        color: "#fff",
                        boxShadow: "0 10px 22px rgba(14,165,233,0.35)",
                      },
                    }}
                  >
                    #{numero}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {boletos.length === 0 && (
              <Box textAlign="center" py={4}>
                <Typography variant="body2" color="text.secondary">
                  Este rango ya no tiene boletos disponibles. Elige otro rango.
                </Typography>
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ModalBoletos;
