import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#7c4dff",
            light: "#b388ff",
            dark: "#651fff",
        },
        secondary: {
            main: "#00e5ff",
            light: "#6effff",
            dark: "#00b8d4",
        },
        background: {
            default: "#0a0e1a",
            paper: "#111827",
        },
        text: {
            primary: "#e8eaf6",
            secondary: "#9fa8da",
        },
    },
    typography: {
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        h3: {
            fontWeight: 800,
            letterSpacing: "-0.02em",
        },
        h6: {
            fontWeight: 600,
        },
        body2: {
            color: "#9fa8da",
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                },
            },
        },
    },
});

export default theme;
