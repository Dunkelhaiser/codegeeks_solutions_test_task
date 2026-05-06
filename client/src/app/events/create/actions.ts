"use server";

import { createEvent } from "@/api/events";
import { revalidatePath } from "next/cache";

export async function createEventAction(data: any) {
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
