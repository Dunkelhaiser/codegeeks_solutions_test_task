"use client";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteEventAction } from "@/api/actions";

interface DeleteEventDialogProps {
    open: boolean;
    onClose: () => void;
    eventId: string;
    eventTitle: string;
}

export default function DeleteEventDialog({ open, onClose, eventId, eventTitle }: DeleteEventDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        const result = await deleteEventAction(eventId);
        if (result.success) {
            router.push("/");
            router.refresh();
        } else {
            setIsDeleting(false);
            alert(result.error || "Failed to delete event");
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
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
            <DialogTitle sx={{ fontWeight: 800 }}>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: "text.secondary" }}>
                    Are you sure you want to delete <strong>"{eventTitle}"</strong>? This action is irreversible.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button onClick={onClose} disabled={isDeleting} sx={{ color: "text.secondary" }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleDeleteConfirm}
                    color="error"
                    variant="contained"
                    disabled={isDeleting}
                    sx={{ borderRadius: "8px", fontWeight: 600 }}
                >
                    {isDeleting ? <CircularProgress size={24} color="inherit" /> : "Delete Event"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
