"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { updateEventAction } from "@/api/actions";
import { Category } from "@/api/events";
import { CreateEventType, eventSchema } from "@/api/schema";
import { Event } from "@/api/types";

interface EditEventFormProps {
    event: Event;
    categories: Category[];
    onSuccess?: () => void;
}

export default function EditEventForm({ event, categories, onSuccess }: EditEventFormProps) {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formattedDate = new Date(event.date).toISOString().slice(0, 16);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<CreateEventType>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: event.title,
            date: formattedDate,
            location: event.location,
            description: event.description || "",
            categoryId: event.categoryId,
        },
    });

    const onSubmit = async (data: CreateEventType) => {
        setIsSubmitting(true);
        setServerError(null);
        try {
            const result = await updateEventAction(event.id, data);
            if (result.success && result.data) {
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.push(`/events/${event.id}`);
                }
            } else {
                setServerError(result.error || "Failed to update event");
            }
        } catch {
            setServerError("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            {serverError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {serverError}
                </Alert>
            )}

            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Event Title"
                {...register("title")}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                id="date"
                label="Event Date & Time"
                type="datetime-local"
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
                {...register("date")}
                error={Boolean(errors.date)}
                helperText={errors.date?.message}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                id="location"
                label="Location"
                {...register("location")}
                error={Boolean(errors.location)}
                helperText={errors.location?.message}
            />

            <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        select
                        id="categoryId"
                        label="Category"
                        error={Boolean(errors.categoryId)}
                        helperText={errors.categoryId?.message}
                    >
                        <MenuItem value="" disabled>
                            Select a category
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <TextField
                margin="normal"
                fullWidth
                multiline
                rows={4}
                id="description"
                label="Description"
                {...register("description")}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting || !isDirty}
                sx={{
                    mt: 4,
                    mb: 2,
                    py: 1.5,
                    fontSize: "1.1rem",
                    ...(isDirty
                        ? {}
                        : {
                              boxShadow: "none",
                              "&:hover": { boxShadow: "none" },
                              opacity: 0.6,
                          }),
                }}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
            </Button>
        </Box>
    );
}
