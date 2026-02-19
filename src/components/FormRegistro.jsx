import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";

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

function FormRegistro() {
  const [modalOpen, setModalOpen] = useState(false);
  const [boletoGuardado, setBoletoGuardado] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const boletoSeleccionado = watch("boleto");

  // 🔥 Leer localStorage al montar
  useEffect(() => {
    const boletoLS = localStorage.getItem("boletoRifa");
    if (boletoLS) {
      setBoletoGuardado(boletoLS);
    }
  }, []);

  const onSubmit = async (data) => {
    await registrarParticipante(data);

    // Guardar en localStorage
    localStorage.setItem("boletoRifa", data.boleto);

    setBoletoGuardado(data.boleto);
  };

  // 🔥 Si ya tiene boleto → mostrar vista confirmación
  if (boletoGuardado) {
    return (
      <>
        <BoletoConfirmado boleto={boletoGuardado} />

        {import.meta.env.DEV && (
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => {
              localStorage.removeItem("boletoRifa");
              window.location.reload();
            }}
          >
            🧹 Reset (DEV)
          </Button>
        )}
      </>
    );
  }

  return (
    <Box
      sx={{
        background: "#fff",
        padding: 4,
        borderRadius: 4,
        maxWidth: 500,
        mx: "auto",
        boxShadow: 4,
      }}
    >
      <Typography variant="h5" mb={3} textAlign="center" fontWeight="bold">
        Registro al Sorteo
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Nombre completo"
          margin="normal"
          {...register("nombre")}
          error={!!errors.nombre}
          helperText={errors.nombre?.message}
        />

        <TextField
          fullWidth
          label="Instagram"
          margin="normal"
          placeholder="@usuario"
          {...register("instagram")}
          error={!!errors.instagram}
          helperText={errors.instagram?.message}
        />

        <Box mt={2}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setModalOpen(true)}
            sx={{ py: 1.5, borderRadius: 3, fontWeight: "bold" }}
          >
            {boletoSeleccionado
              ? `Boleto seleccionado: ${boletoSeleccionado}`
              : "Elegir número"}
          </Button>

          {errors.boleto && (
            <Typography variant="caption" color="error">
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
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: 3,
            backgroundColor: "#10b981",
            "&:hover": { backgroundColor: "#059669" },
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Participar"}
        </Button>
      </form>

      <ModalBoletos
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={(numero) => setValue("boleto", numero)}
      />
    </Box>
  );
}

export default FormRegistro;
