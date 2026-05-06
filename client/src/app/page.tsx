import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getCategories, getEvents } from "@/api/events";
import EventCard from "@/components/EventCard";
import SortControls from "@/components/SortControls";
import FilterControls from "@/components/FilterControls";

interface HomeProps {
    searchParams: Promise<{ sortBy?: string; order?: string; category?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const { sortBy = "date", order = "asc", category } = await searchParams;
    const [events, categories] = await Promise.all([getEvents(sortBy, order, category), getCategories()]);

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
                            fontSize: { xs: "2.75rem", md: "3rem" },
                            fontWeight: 800,
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
                <Box sx={{ mb: 6, display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                    <FilterControls categories={categories} />
                    <SortControls />
                </Box>
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
