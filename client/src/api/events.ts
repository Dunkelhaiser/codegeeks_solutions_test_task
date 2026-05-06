import type { Event } from "@/api/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://server:4000";

export interface Category {
    id: string;
    name: string;
}

export interface GetEventsResponse {
    events: Event[];
    total: number;
}

export const getEvents = async (
    sortBy: string = "date",
    order: string = "asc",
    category?: string,
    page: number = 1,
    limit: number = 10
): Promise<GetEventsResponse> => {
    const url = new URL(`${BACKEND_URL}/events`);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("order", order);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());
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

export const updateEvent = async (id: string, data: any): Promise<Event> => {
    const res = await fetch(`${BACKEND_URL}/events/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update event");
    }

    return res.json();
};

export const deleteEvent = async (id: string): Promise<void> => {
    const res = await fetch(`${BACKEND_URL}/events/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete event");
    }
};
