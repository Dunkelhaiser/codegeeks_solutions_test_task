"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { SelectChangeEvent } from "@mui/material/Select";

export default function SortControls() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sortBy = searchParams.get("sortBy") || "date";
    const order = searchParams.get("order") || "asc";

    const handleSortChange = (event: SelectChangeEvent) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sortBy", event.target.value);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleOrderChange = (
        _event: React.MouseEvent<HTMLElement>,
        newOrder: string | null
    ) => {
        if (newOrder !== null) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("order", newOrder);
            router.push(`?${params.toString()}`, { scroll: false });
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4, justifyContent: "center" }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                    labelId="sort-by-label"
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSortChange}
                    sx={{
                        borderRadius: "12px",
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                        },
                    }}
                >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                </Select>
            </FormControl>

            <ToggleButtonGroup
                value={order}
                exclusive
                onChange={handleOrderChange}
                aria-label="sort order"
                size="small"
                sx={{
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    "& .MuiToggleButton-root": {
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        px: 2,
                        "&.Mui-selected": {
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                        },
                    },
                }}
            >
                <ToggleButton value="asc" aria-label="ascending">
                    <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Asc
                </ToggleButton>
                <ToggleButton value="desc" aria-label="descending">
                    <ArrowDownwardIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Desc
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}
