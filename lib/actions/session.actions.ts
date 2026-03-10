'use server';

import VoiceSession from "@/database/models/voice-session";
import { connectToDatabase } from "@/database/mongoose";
import { EndSessionResult, StartSessionResult } from "@/types";
import { getCurrentBillingPeriodStart } from "../subscription-constants";



export const startVoiceSession = async (clerkId: string, bookId: string): Promise<StartSessionResult> => {
    try {
        await connectToDatabase();

        const session = await VoiceSession.create({
            clerkId,
            bookId,
            startedAt: new Date(),
            billingPeriodStart: getCurrentBillingPeriodStart(),
            durationSeconds: 0,
        });
        return { success: true, sessionId: session._id.toString() };
    } catch (e) {
        console.error("Error starting voice session:", e);
        return { success: false, error: "Failed to start voice session" };
    }
    
}

export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
    try {
        const result = await connectToDatabase();

        await VoiceSession.findByIdAndUpdate(sessionId, {
            endedAt: new Date(),
            durationSeconds,
        });
        if (!result) return { success: false, error: "Failed to connect to database" };

        return { success: true };
    } catch (error) {
        console.error("Error ending voice session:", error);
        return { success: false, error: "Failed to end voice session" };
    }
} 