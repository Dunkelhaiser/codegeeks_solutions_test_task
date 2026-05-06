import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCategories } from "@/api/events";
import CreateEventForm from "@/components/CreateEventForm";

export default async function CreateEventPage() {
    const categories = await getCategories();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "radial-gradient(circle at 50% 0%, rgba(124, 77, 255, 0.1) 0%, transparent 50%)",
                pt: 4,
                pb: 12,
            }}
        >
            <Container maxWidth="sm">
                <Link href="/" style={{ textDecoration: "none" }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            mb: 4,
                            color: "text.secondary",
                            "&:hover": { color: "primary.main", bgcolor: "transparent" },
                        }}
                    >
                        Back to all events
                    </Button>
                </Link>

                <Box
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 6,
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(17, 24, 39, 0.7)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 800,
                            mb: 1,
                            background: "linear-gradient(135deg, #fff 0%, #9fa8da 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Create New Event
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Fill in the details below to host your event.
                    </Typography>

                    <CreateEventForm categories={categories} />
                </Box>
            </Container>
        </Box>
    );
}
