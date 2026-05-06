"use client";

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Category } from "@/api/events";
import { Event } from "@/types/event";
import EditEventDialog from "./EditEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";

import Typography from "@mui/material/Typography";

interface EventActionsMenuProps {
    event: Event;
    categories: Category[];
}

export default function EventActionsMenu({ event, categories }: EventActionsMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const open = Boolean(anchorEl);
    const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleEditOpen = () => {
        handleMenuClose();
        setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);

    const handleDeleteOpen = () => {
        handleMenuClose();
        setDeleteOpen(true);
    };
    const handleDeleteClose = () => setDeleteOpen(false);

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleMenuClick}
                sx={{
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                }}
            >
                <MoreHorizIcon fontSize="small" />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            minWidth: 150,
                            borderRadius: 1,
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            background: "rgba(17, 24, 39, 0.95)",
                            backdropFilter: "blur(20px)",
                            backgroundImage: "none",
                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
                        },
                    },
                }}
            >
                <MenuItem onClick={handleEditOpen} sx={{ py: 1, px: 2 }}>
                    <ListItemIcon sx={{ minWidth: "32px !important" }}>
                        <EditIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                        primary={<Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>Edit</Typography>} 
                    />
                </MenuItem>
                <MenuItem onClick={handleDeleteOpen} sx={{ py: 1, px: 2, color: "error.main" }}>
                    <ListItemIcon sx={{ minWidth: "32px !important" }}>
                        <DeleteIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText 
                        primary={<Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>Delete</Typography>} 
                    />
                </MenuItem>
            </Menu>

            <EditEventDialog
                open={editOpen}
                onClose={handleEditClose}
                event={event}
                categories={categories}
            />

            <DeleteEventDialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                eventId={event.id}
                eventTitle={event.title}
            />
        </>
    );
}
