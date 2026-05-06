"use client";

import React from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";

interface PaginationControlsProps {
    totalPages: number;
    currentPage: number;
}

export default function PaginationControls({ totalPages, currentPage }: PaginationControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", value.toString());
        router.push(`/?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                color="primary"
                size="large"
                sx={{
                    "& .MuiPaginationItem-root": {
                        borderRadius: "8px",
                        color: "text.secondary",
                        "&.Mui-selected": {
                            color: "#fff",
                            fontWeight: 700,
                            boxShadow: "0 4px 12px rgba(124, 77, 255, 0.4)",
                        },
                    },
                }}
            />
        </Box>
    );
}
