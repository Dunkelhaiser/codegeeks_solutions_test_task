import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getEvent } from "@/api/events";
import EventCard from "@/components/EventCard";
import EventActionsMenu from "./_components/EventActionsMenu";

interface EventPageProps {
    params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
    const { id } = await params;

    const [event, categories] = await Promise.all([getEvent(id).catch(() => null), getCategories()]);

    if (!event) {
        return notFound();
    }

    const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <Box sx={{ pt: 4, pb: 12 }}>
            <Container maxWidth="lg">
                <Link href="/" style={{ textDecoration: "none" }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            mb: 6,
                            color: "text.secondary",
                            "&:hover": { color: "primary.main", bgcolor: "transparent" },
                        }}
                    >
                        Back to all events
                    </Button>
                </Link>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box
                            sx={{
                                mb: 4,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 2,
                            }}
                        >
                            <Box>
                                <Chip label={event.category} color="primary" variant="outlined" sx={{ mb: 3 }} />
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    gutterBottom
                                    sx={{
                                        fontWeight: { xs: 700, md: 800 },
                                        lineHeight: 1.2,
                                        fontSize: { xs: "2.5rem", md: "3.75rem" },
                                    }}
                                >
                                    {event.title}
                                </Typography>
                            </Box>
                            <EventActionsMenu event={event} categories={categories} />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 4,
                                mb: 6,
                                p: 3,
                                borderRadius: 4,
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                bgcolor: "rgba(255, 255, 255, 0.03)",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <CalendarMonthIcon color="primary" />
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: "block",
                                            color: "text.secondary",
                                            textTransform: "uppercase",
                                            fontWeight: 700,
                                            letterSpacing: "0.1em",
                                        }}
                                    >
                                        Date and Time
                                    </Typography>
                                    <Typography variant="body1">{formattedDate}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <LocationOnIcon color="primary" />
                                <Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: "block",
                                            color: "text.secondary",
                                            textTransform: "uppercase",
                                            fontWeight: 700,
                                            letterSpacing: "0.1em",
                                        }}
                                    >
                                        Location
                                    </Typography>
                                    <Typography variant="body1">{event.location}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 8 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                                About this event
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    lineHeight: 1.8,
                                    color: "text.secondary",
                                    fontSize: "1.1rem",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {event.description || "No description provided for this event."}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                width: "100%",
                                height: 500,
                                borderRadius: 0.5,
                                overflow: "hidden",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                mb: 3,
                            }}
                        >
                            <iframe
                                title="Map"
                                width="100%"
                                height="100%"
                                style={{
                                    border: 0,
                                    filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)",
                                }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                            />
                        </Box>
                    </Grid>
                </Grid>

                {event.similarEvents && event.similarEvents.length > 0 && (
                    <Box sx={{ mt: 10 }}>
                        <Divider sx={{ mb: 6 }} />
                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
                            Similar Events
                        </Typography>
                        <Grid container spacing={4}>
                            {event.similarEvents.map((similarEvent) => (
                                <Grid key={similarEvent.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <EventCard event={similarEvent} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
