import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// MUI
import {
  TextField,
  Button,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useForm } from "react-hook-form";

/* ===============================
   Validaciones (Schema)
================================*/
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),

  celular: yup
    .string()
    .matches(/^[0-9]{10}$/, "Debe tener 10 dígitos")
    .required("El celular es obligatorio"),

  instagram: yup
    .string()
    .matches(/^@[\w.]+$/, "Debe iniciar con @")
    .required("Instagram es obligatorio"),
});

/* ===============================
   Componente
================================*/
function FormRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  /* ===============================
     Submit
  ================================*/
  const onSubmit = async (data) => {
    console.log("Datos:", data);

    // Aquí luego mandamos a Supabase / API
    alert("Registro exitoso 🎉");

    reset();
  };

  return (
    <Box
      component="section"
      sx={{
        background: "#fff",
        padding: 4,
        borderRadius: 3,
        maxWidth: 450,
        mx: "auto",
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" mb={3} textAlign="center" fontWeight="bold">
        Registro al Sorteo
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre */}
        <TextField
          fullWidth
          label="Nombre completo"
          margin="normal"
          {...register("nombre")}
          error={!!errors.nombre}
          helperText={errors.nombre?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Celular */}
        <TextField
          fullWidth
          label="Celular"
          margin="normal"
          type="tel"
          {...register("celular")}
          error={!!errors.celular}
          helperText={errors.celular?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Instagram */}
        <TextField
          fullWidth
          label="Instagram"
          margin="normal"
          placeholder="@usuario"
          {...register("instagram")}
          error={!!errors.instagram}
          helperText={errors.instagram?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InstagramIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Botón */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
          className="
            mt-6
            !rounded-xl
            !py-3
            !text-lg
            !font-semibold
            !bg-emerald-600
            hover:!bg-emerald-700
            active:scale-95
            transition-all
            duration-200
            shadow-lg
            disabled:opacity-60
          "
        >
          {isSubmitting ? "Enviando..." : "Participar"}
        </Button>
      </form>
    </Box>
  );
}

export default FormRegistro;
