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
import { useForm } from "react-hook-form";
import { createEventAction } from "@/api/actions";
import { Category } from "@/api/events";
import { CreateEventType, createEventSchema } from "@/api/schema";

interface CreateEventFormProps {
    categories: Category[];
}

export default function CreateEventForm({ categories }: CreateEventFormProps) {
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateEventType>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            description: "",
        },
    });

    const onSubmit = async (data: CreateEventType) => {
        setIsSubmitting(true);
        setServerError(null);
        try {
            const result = await createEventAction(data);
            if (result.success && result.data) {
                router.push(`/events/${result.data.id}`);
            } else {
                setServerError(result.error || "Failed to create event");
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
                autoFocus
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

            <TextField
                margin="normal"
                required
                fullWidth
                select
                id="categoryId"
                label="Category"
                defaultValue=""
                {...register("categoryId")}
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
                disabled={isSubmitting}
                sx={{
                    mt: 4,
                    mb: 2,
                    py: 1.5,
                    fontSize: "1.1rem",
                }}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Create Event"}
            </Button>
        </Box>
    );
}
