import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  InputAdornment,
  Chip,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import ModalBoletos from "./ModalBoletos";
import { registrarParticipante } from "../services/boletosService";
import BoletoConfirmado from "./BoletoConfirmado";

const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  instagram: yup
    .string()
    .matches(/^@[\w.]+$/, "Debe iniciar con @")
    .required("Instagram es obligatorio"),
  boleto: yup.number().required("Debes seleccionar un boleto"),
});

const formatNumero = (valor) => {
  if (valor === null || valor === undefined || valor === "") return "";
  const num = Number(valor);
  if (Number.isNaN(num) || num < 0) return "";
  // Hasta 99999 => 5 dígitos con ceros a la izquierda
  const capped = Math.min(num, 99999);
  return String(capped).padStart(5, "0");
};

const getApiErrorMessage = (error) => {
  const data = error?.response?.data;
  const status = error?.response?.status;
  const statusText = error?.response?.statusText;

  const candidates = [
    data?.message,
    data?.error,
    data?.detail,
    data?.descripcion,
    data?.descripcionError,
    data?.msg,
    data?.mensaje,
  ].filter(Boolean);

  if (candidates.length) return candidates[0];
  if (status) return `Error ${status}${statusText ? ` - ${statusText}` : ""}`;
  return error?.message || "Ocurrió un error al registrar tu boleto.";
};

function FormRegistro() {
  const [modalOpen, setModalOpen] = useState(false);
  const [boletoGuardado, setBoletoGuardado] = useState(null);
  const [nombreGuardado, setNombreGuardado] = useState(null);
  const [folioGuardado, setFolioGuardado] = useState(null);
  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { boleto: "" },
  });

  const boletoSeleccionado = useWatch({ control, name: "boleto" });
  const boletoVisual = formatNumero(boletoSeleccionado);

  // Leer localStorage al montar
  useEffect(() => {
    const boletoLS = localStorage.getItem("boletoRifa");
    if (boletoLS !== null) {
      const parsed = Number(boletoLS);

      setBoletoGuardado(Number.isNaN(parsed) ? boletoLS : parsed);
      setNombreGuardado(localStorage.getItem("nombreRifa") || "");
      setFolioGuardado(localStorage.getItem("SVRM") || "");
    }
  }, []);

  const handleSelectNumero = (numero) => {
    setValue("boleto", Number(numero), {
      shouldValidate: true,
      shouldDirty: true,
    });
    trigger("boleto");
    setModalOpen(false);
  };

  const onSubmit = async (data) => {
    const payload = { ...data, boleto: Number(data.boleto) };
    try {
      const response = await registrarParticipante(payload);

      setFeedback({
        open: true,
        message: "Registro enviado con éxito. ¡Mucha suerte!",
        severity: "success",
      });

      // Guardar en localStorage
      localStorage.setItem("boletoRifa", payload.boleto);
      localStorage.setItem("nombreRifa", response.data.nombre);
      localStorage.setItem("SVRM", response.data.vrfol);

      setBoletoGuardado(payload.boleto);
      setNombreGuardado(payload.nombre);
    } catch (error) {
      const apiMessage = getApiErrorMessage(error);
      setFeedback({
        open: true,
        message: apiMessage,
        severity: "error",
      });
      console.error("Error al registrar participante:", error);
    }
  };

  // Si ya tiene boleto -> mostrar vista de confirmación
  if (boletoGuardado !== null && boletoGuardado !== undefined) {
    return (
      <>
        <BoletoConfirmado
          numero={formatNumero(boletoGuardado)}
          nombre={nombreGuardado}
          folio={folioGuardado}
        />

        {import.meta.env.DEV && (
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => {
              localStorage.removeItem("boletoRifa");
              window.location.reload();
            }}
          >
            Reset (DEV)
          </Button>
        )}
      </>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 640,
        mx: "auto",
        px: { xs: 1.5, sm: 0 },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
          p: 1,
          borderRadius: 5,
          boxShadow: "0 24px 48px rgba(15,23,42,0.22)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            p: { xs: 3, sm: 4 },
            backgroundColor: "#f8fafc",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 18% 18%, rgba(14,165,233,0.12), transparent 30%), radial-gradient(circle at 82% 8%, rgba(34,197,94,0.12), transparent 26%)",
            }}
          />

          <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
            <Chip
              icon={<AutoAwesomeIcon fontSize="small" />}
              label="Sorteo Riviera"
              sx={{
                bgcolor: "rgba(14,165,233,0.08)",
                borderColor: "rgba(14,165,233,0.2)",
                fontWeight: 600,
              }}
              variant="outlined"
            />
            <Chip
              size="small"
              label="Cupón único por persona"
              sx={{ bgcolor: "rgba(34,197,94,0.12)", fontWeight: 600 }}
            />
          </Stack>

          <Typography
            variant="h4"
            fontWeight={800}
            color="#0f172a"
            mb={1}
            sx={{ letterSpacing: "-0.5px" }}
          >
            ¡Regístrate y elige tu boleto ganador!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Completa tus datos y escoge tu número favorito para participar en el
            sorteo exclusivo de VIAJES RIVIERA.
          </Typography>

          <Stack
            component="form"
            spacing={2.25}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              label="Nombre completo"
              placeholder="Ej. María López"
              {...register("nombre")}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Instagram"
              placeholder="@usuario"
              {...register("instagram")}
              error={!!errors.instagram}
              helperText={errors.instagram?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InstagramIcon sx={{ color: "#e11d48" }} />
                  </InputAdornment>
                ),
              }}
            />

            <input
              type="hidden"
              {...register("boleto", {
                setValueAs: (v) => (v === "" ? "" : v),
              })}
            />

            <Box>
              <Button
                variant="contained"
                fullWidth
                startIcon={<ConfirmationNumberOutlinedIcon />}
                onClick={() => setModalOpen(true)}
                sx={{
                  py: 1.35,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #0ea5e9, #22c55e)",
                  boxShadow: "0 12px 30px rgba(14,165,233,0.25)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #0284c7, #16a34a)",
                  },
                }}
              >
                {boletoVisual ? (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <Typography fontWeight={700}>
                      Boleto seleccionado
                    </Typography>
                    <Chip
                      label={`#${boletoVisual}`}
                      color="success"
                      sx={{
                        fontWeight: 700,
                        bgcolor: "#ecfdf3",
                        color: "#166534",
                      }}
                    />
                  </Stack>
                ) : (
                  "Elegir número"
                )}
              </Button>

              {errors.boleto && (
                <Typography
                  variant="caption"
                  color="error"
                  display="block"
                  mt={0.5}
                >
                  {errors.boleto.message}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                py: 1.6,
                fontWeight: 800,
                borderRadius: 3,
                textTransform: "none",
                backgroundColor: "#0f172a",
                boxShadow: "0 14px 35px rgba(15,23,42,0.35)",
                "&:hover": { backgroundColor: "#0b1220" },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Confirmar participación"}
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <CelebrationOutlinedIcon color="primary" />
          </Divider>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <AutoAwesomeIcon sx={{ color: "#0ea5e9" }} />
              <Typography variant="body2" color="text.secondary">
                Sorteo avalado por VIAJES RIVIERA
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <ConfirmationNumberOutlinedIcon sx={{ color: "#22c55e" }} />
              <Typography variant="body2" color="text.secondary">
                Cupos limitados, asegura tu número hoy
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <ModalBoletos
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectNumero}
      />

      <Snackbar
        open={feedback.open}
        autoHideDuration={5000}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
          severity={feedback.severity}
          variant="filled"
          sx={{
            borderRadius: 3,
            boxShadow: "0 12px 30px rgba(15,23,42,0.25)",
            minWidth: 320,
          }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FormRegistro;
