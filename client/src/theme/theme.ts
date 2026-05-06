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
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage:
                        "radial-gradient(circle at 50% 0%, rgba(124, 77, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(0, 229, 255, 0.05) 0%, transparent 40%)",
                    backgroundAttachment: "fixed",
                    minHeight: "100vh",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    background: "rgba(17, 24, 39, 0.7)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        borderColor: "rgba(124, 77, 255, 0.3)",
                        boxShadow: "0 12px 24px -10px rgba(124, 77, 255, 0.25)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 12,
                    padding: "8px 20px",
                },
            },
            variants: [
                {
                    props: { variant: "contained", color: "primary" },
                    style: {
                        boxShadow: "0 4px 14px 0 rgba(124, 77, 255, 0.39)",
                        "&:hover": {
                            boxShadow: "0 6px 20px rgba(124, 77, 255, 0.23)",
                        },
                    },
                },
            ],
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    transition: "all 0.2s ease-in-out",
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    boxShadow: "0 8px 16px -4px rgba(124, 77, 255, 0.5)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.1)",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    borderRadius: 8,
                },
            },
            variants: [
                {
                    props: { variant: "outlined", color: "primary" },
                    style: {
                        borderColor: "rgba(124, 77, 255, 0.3)",
                        background: "rgba(124, 77, 255, 0.05)",
                    },
                },
            ],
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
                elevation1: {
                    background: "rgba(17, 24, 39, 0.8)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    background: "rgba(17, 24, 39, 0.95) !important",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: "0 8px",
                    padding: "8px 12px",
                    "&:hover": {
                        background: "rgba(255, 255, 255, 0.05)",
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 24,
                    background: "rgba(17, 24, 39, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                },
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    fontWeight: 600,
                    "&.Mui-selected": {
                        boxShadow: "0 4px 12px -2px rgba(124, 77, 255, 0.4)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 12,
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        transition: "all 0.2s ease-in-out",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(124, 77, 255, 0.5)",
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    borderRadius: 12,
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: "none",
                    padding: "8px 16px",
                    textTransform: "none",
                    fontWeight: 600,
                    "&.Mui-selected": {
                        backgroundColor: "#7c4dff",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#651fff",
                        },
                    },
                },
            },
        },
    },
});

export default theme;
