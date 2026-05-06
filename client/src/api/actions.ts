"use server";

import { revalidatePath } from "next/cache";
import { createEvent, deleteEvent, updateEvent } from "@/api/events";
import { CreateEventType, UpdateEventType } from "./schema";

export async function createEventAction(data: CreateEventType) {
    try {
        const result = await createEvent(data);
        revalidatePath("/");
        return { success: true, data: result };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create event",
        };
    }
}

export async function updateEventAction(id: string, data: UpdateEventType) {
    try {
        const result = await updateEvent(id, data);
        revalidatePath("/");
        revalidatePath(`/events/${id}`);
        return { success: true, data: result };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update event",
        };
    }
}

export async function deleteEventAction(id: string) {
    try {
        await deleteEvent(id);
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete event",
        };
    }
}
