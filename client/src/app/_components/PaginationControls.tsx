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

    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
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
            />
        </Box>
    );
}
