import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { getCategories, getEvents } from "@/api/events";
import EventCard from "@/components/EventCard";
import FilterControls from "./_components/FilterControls";
import PaginationControls from "./_components/PaginationControls";
import SortControls from "./_components/SortControls";

interface HomeProps {
    searchParams: Promise<{ sortBy?: string; order?: string; category?: string; page?: string; limit?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const { sortBy = "date", order = "asc", category, page = "1", limit = "9" } = await searchParams;
    const currentPage = Number.parseInt(page, 10);
    const pageLimit = Number.parseInt(limit, 10);

    const [{ events, total }, categories] = await Promise.all([
        getEvents(sortBy, order, category, currentPage, pageLimit),
        getCategories(),
    ]);

    const totalPages = Math.ceil(total / pageLimit);

    return (
        <Box sx={{ pb: 8 }}>
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
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 2,
                            fontSize: { xs: "2.75rem", md: "3rem" },
                            fontWeight: 800,
                        }}
                    >
                        Events Management System
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, opacity: 0.8 }}>
                        Discover and manage events happening around you.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <Box
                    sx={{
                        mb: 6,
                        display: "flex",
                        gap: 3,
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
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

                <PaginationControls totalPages={totalPages} currentPage={currentPage} />

                {events.length === 0 && (
                    <Box sx={{ textAlign: "center", py: 12 }}>
                        <Typography variant="h6" color="text.secondary">
                            No events found.
                        </Typography>
                    </Box>
                )}
            </Container>

            <Link href="/events/create">
                <Fab
                    color="primary"
                    aria-label="add event"
                    sx={{
                        position: "fixed",
                        bottom: 32,
                        right: 32,
                    }}
                >
                    <AddIcon />
                </Fab>
            </Link>
        </Box>
    );
}
