import type { Event } from "@/types/event";

const API_URL = "http://server:4000";

export const getEvents = async (sortBy: string = "date", order: string = "asc"): Promise<Event[]> => {
    const url = new URL(`${API_URL}/events`);
    url.searchParams.append("sortBy", sortBy);
    url.searchParams.append("order", order);

    const res = await fetch(url.toString(), {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch events");
    }

    return res.json();
};
