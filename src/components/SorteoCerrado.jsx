import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { Alert, Box, Button, Chip, Stack, Typography } from "@mui/material";

export default function SorteoCerrado() {
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
          background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
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
                "radial-gradient(circle at 15% 18%, rgba(29,78,216,0.12), transparent 30%), radial-gradient(circle at 85% 12%, rgba(14,165,233,0.14), transparent 28%)",
            }}
          />

          <Stack spacing={2.5} sx={{ position: "relative" }}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Chip
                icon={<EmojiEventsOutlinedIcon fontSize="small" />}
                label="Sorteo Riviera"
                sx={{
                  bgcolor: "rgba(29,78,216,0.08)",
                  borderColor: "rgba(29,78,216,0.2)",
                  fontWeight: 700,
                }}
                variant="outlined"
              />
              <Chip
                icon={<AccessTimeFilledOutlinedIcon fontSize="small" />}
                label="Registro cerrado"
                color="warning"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
            </Stack>

            <Box>
              <Typography
                variant="h4"
                fontWeight={800}
                color="#0f172a"
                mb={1}
                sx={{ letterSpacing: "-0.5px" }}
              >
                El sorteo ya cerro
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Gracias por participar. El periodo de registro ya finalizo y en
                este momento solo queda esperar la publicacion oficial de los
                resultados.
              </Typography>
            </Box>

            <Alert
              icon={<CampaignOutlinedIcon fontSize="inherit" />}
              severity="info"
              sx={{ borderRadius: 3 }}
            >
              Mantente pendiente de los canales oficiales de VIAJES RIVIERA para
              conocer a los ganadores.
            </Alert>

            <Button
              component="a"
              href="https://contactanos.viajesrivieramexico.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<LaunchOutlinedIcon />}
              sx={{
                alignSelf: { xs: "stretch", sm: "flex-start" },
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 3,
                px: 2.5,
                py: 1.2,
                background: "linear-gradient(135deg, #0ea5e9, #1d4ed8)",
                boxShadow: "0 14px 30px rgba(29,78,216,0.22)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0284c7, #1e40af)",
                },
              }}
            >
              Nuestras redes
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
