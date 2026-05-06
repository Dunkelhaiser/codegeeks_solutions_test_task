import type { Event } from "@/types/event";

const API_URL = "http://server:4000";

export interface Category {
    id: string;
    name: string;
}

export const getEvents = async (sortBy: string = "date", order: string = "asc", category?: string): Promise<Event[]> => {
    const url = new URL(`${API_URL}/events`);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("order", order);
    if (category) {
        url.searchParams.append("category", category);
    }

    const res = await fetch(url.toString(), {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch events");
    }

    return res.json();
};

export const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(`${API_URL}/events/categories`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    return res.json();
};
