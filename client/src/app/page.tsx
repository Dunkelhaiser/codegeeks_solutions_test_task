import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getEvents } from "@/api/events";
import EventCard from "@/components/EventCard";
import SortControls from "@/components/SortControls";

interface HomeProps {
    searchParams: Promise<{ sortBy?: string; order?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const { sortBy = "date", order = "asc" } = await searchParams;
    const events = await getEvents(sortBy, order);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "radial-gradient(circle at 50% 0%, rgba(124, 77, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(0, 229, 255, 0.05) 0%, transparent 40%)",
                pb: 8,
            }}
        >
            <Box
                sx={{
                    pt: 12,
                    pb: 8,
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            background: "linear-gradient(135deg, #fff 0%, #9fa8da 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 2,
                        }}
                    >
                        Experience Extraordinary Events
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, opacity: 0.8 }}>
                        Discover the most exciting concerts, conferences, and festivals happening near you.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <SortControls />
                <Grid container spacing={4}>
                    {events.map((event) => (
                        <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <EventCard event={event} />
                        </Grid>
                    ))}
                </Grid>
                
                {events.length === 0 && (
                    <Box sx={{ textAlign: "center", py: 12 }}>
                        <Typography variant="h6" color="text.secondary">
                            No events found.
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
}
