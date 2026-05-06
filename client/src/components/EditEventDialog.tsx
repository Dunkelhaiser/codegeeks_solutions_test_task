"use client";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Category } from "@/api/events";
import { Event } from "@/api/types";
import EditEventForm from "./EditEventForm";

interface EditEventDialogProps {
    open: boolean;
    onClose: () => void;
    event: Event;
    categories: Category[];
}

export default function EditEventDialog({ open, onClose, event, categories }: EditEventDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 2,
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
                    onClick={onClose}
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
                <EditEventForm event={event} categories={categories} onSuccess={onClose} />
            </DialogContent>
        </Dialog>
    );
}
