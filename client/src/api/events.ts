import type { Event } from "@/types/event";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://server:4000";

export interface Category {
    id: string;
    name: string;
}

export const getEvents = async (sortBy: string = "date", order: string = "asc", category?: string): Promise<Event[]> => {
    const url = new URL(`${BACKEND_URL}/events`);
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
    const res = await fetch(`${BACKEND_URL}/events/categories`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    return res.json();
};

export const getEvent = async (id: string): Promise<Event> => {
    const res = await fetch(`${BACKEND_URL}/events/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("Event not found");
        }
        throw new Error("Failed to fetch event");
    }

    return res.json();
};

export const createEvent = async (data: any): Promise<Event> => {
    const res = await fetch(`${BACKEND_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create event");
    }

    return res.json();
};
