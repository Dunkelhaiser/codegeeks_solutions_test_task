"use client";

import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Category } from "@/api/events";
import { Event } from "@/types/event";
import EditEventForm from "./EditEventForm";

interface EditEventModalProps {
    event: Event;
    categories: Category[];
}

export default function EditEventModal({ event, categories }: EditEventModalProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                variant="outlined"
                size="large"
                onClick={handleOpen}
                sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "text.primary",
                    "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "rgba(124, 77, 255, 0.05)",
                    },
                }}
            >
                Edit Event
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            background: "rgba(17, 24, 39, 0.95)",
                            backdropFilter: "blur(20px)",
                            backgroundImage: "none",
                        },
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 3, fontWeight: 800, fontSize: "1.5rem" }}>
                    Edit Event
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 16,
                            top: 16,
                            color: "text.secondary",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 3, pt: 0 }}>
                    <EditEventForm 
                        event={event} 
                        categories={categories} 
                        onSuccess={handleClose} 
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
