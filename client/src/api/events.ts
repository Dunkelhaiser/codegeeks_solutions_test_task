import type { Event } from "@/types/event";

const API_URL = "http://server:4000";

export const getEvents = async (): Promise<Event[]> => {
    const res = await fetch(`${API_URL}/events`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch events");
    }

    return res.json();
}
