"use client";

import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import type { Event } from "@/api/types";

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Card
            component={Link}
            href={`/events/${event.id}`}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                    "& .description": {
                        color: "text.primary",
                    },
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Chip label={event.category} size="small" color="primary" variant="outlined" />
                </Box>

                <Typography variant="h6" component="h2" gutterBottom sx={{ lineHeight: 1.3, mb: 2 }}>
                    {event.title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1, color: "text.secondary", gap: 1 }}>
                    <CalendarMonthIcon sx={{ fontSize: "1rem" }} />
                    <Typography variant="body2">{formattedDate}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.secondary", gap: 1 }}>
                    <LocationOnIcon sx={{ fontSize: "1rem" }} />
                    <Typography variant="body2">{event.location}</Typography>
                </Box>

                {event.description && (
                    <Typography
                        variant="body2"
                        className="description"
                        sx={{
                            mt: "auto",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            transition: "color 0.2s ease",
                            lineHeight: 1.6,
                        }}
                    >
                        {event.description}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
