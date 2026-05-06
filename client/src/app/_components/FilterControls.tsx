"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { Category } from "@/api/events";

interface FilterControlsProps {
    categories: Category[];
}

export default function FilterControls({ categories }: FilterControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get("category") || "";

    const handleCategoryChange = (event: SelectChangeEvent) => {
        const params = new URLSearchParams(searchParams.toString());
        if (event.target.value) {
            params.set("category", event.target.value);
        } else {
            params.delete("category");
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl size="small" fullWidth>
                <InputLabel id="category-filter-label">Category</InputLabel>
                <Select
                    labelId="category-filter-label"
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
