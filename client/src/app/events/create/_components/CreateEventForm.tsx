"use client";

import  { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { Category } from "@/api/events";
import { createEventAction } from "@/api/actions";

const createEventSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be at most 255 characters long"),
    date: z
        .string()
        .min(1, "Date is required")
        .refine((value) => new Date(value) > new Date(), "Date must be in the future"),
    location: z.string().min(1, "Location is required").max(255, "Location must be at most 255 characters long"),
    description: z.string().max(2500, "Description must be at most 2500 characters long").optional().or(z.literal("")),
    categoryId: z.uuid("Please select a category"),
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

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
    } = useForm<CreateEventFormValues>({
        resolver: zodResolver(createEventSchema),
        defaultValues: {
            description: "",
        },
    });

    const onSubmit = async (data: CreateEventFormValues) => {
        setIsSubmitting(true);
        setServerError(null);
        try {
            const result = await createEventAction(data);
            if (result.success && result.data) {
                router.push(`/events/${result.data.id}`);
            } else {
                setServerError(result.error || "Failed to create event");
            }
        } catch (error) {
            setServerError("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            {serverError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
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
                error={!!errors.title}
                helperText={errors.title?.message}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "rgba(255, 255, 255, 0.03)",
                    },
                }}
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
                error={!!errors.date}
                helperText={errors.date?.message}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "rgba(255, 255, 255, 0.03)",
                    },
                }}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                id="location"
                label="Location"
                {...register("location")}
                error={!!errors.location}
                helperText={errors.location?.message}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "rgba(255, 255, 255, 0.03)",
                    },
                }}
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
                error={!!errors.categoryId}
                helperText={errors.categoryId?.message}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "rgba(255, 255, 255, 0.03)",
                    },
                }}
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
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "rgba(255, 255, 255, 0.03)",
                    },
                }}
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
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 8px 16px -4px rgba(124, 77, 255, 0.4)",
                    "&:hover": {
                        boxShadow: "0 12px 20px -4px rgba(124, 77, 255, 0.6)",
                    },
                }}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Create Event"}
            </Button>
        </Box>
    );
}
