import { randomUUID } from "crypto";
import { Database } from "../database/types.js";
import { CreatePendingMessageOptions } from "./types.js";
import { pendingMessageTable } from "../database/schema.js";
import { checkJwtOwnership, validateAndParseJwt } from "../profiling/authentication.js";
import { eq } from "drizzle-orm";

// Steps of messaging
// 1. Create pending message
// A pending message will be created in the backend with a
// 'sender' and a 'receiver'.
// 2. Check for pending messages (websocket)
// 3. Get pending message
// The message content will be fetched by the client with the
// correct permissions to be saved locally.
// 4. Deliver pending message
// The client will send a signal after properly storing the
// message, then, the backend will know that is OK to delete
// the pending message object from the database.

const createPendingMessage = async (
    input: CreatePendingMessageOptions,
    token: string,
    db: Database
) => {
    const sentAt = new Date().toISOString();
    const uuid = randomUUID();

    await checkJwtOwnership(token, input.senderId);

    await db
        .insert(pendingMessageTable)
        .values({
            uuid,
            sentAt,
            senderId: input.senderId,
            receiverId: input.receiverId,
            content: input.content
        });

    return uuid;
}

const getPendingMessages = async (token: string, db: Database) => {
    const { uuid } = await validateAndParseJwt(token) as { uuid: string }; 
    
    const messages = await db
        .select()
        .from(pendingMessageTable)
        .where(eq(pendingMessageTable.receiverId, uuid));

    return messages;
}

const deliverPendingMessages = async (messageIds: string[], token: string, db: Database) => {
    for (const messageId of messageIds) {
        const match = (await db
            .select({ 
                uuid: pendingMessageTable.uuid,
                receiverId: pendingMessageTable.receiverId
            })
            .from(pendingMessageTable)
            .where(eq(pendingMessageTable.uuid, messageId))
            .limit(1))[0];
    
        const { uuid: currentCallerId } = await validateAndParseJwt(token) as { uuid: string };
        const isCorrectReceiver = match.receiverId === currentCallerId;
        
    
        if (isCorrectReceiver) {
            await db
                .delete(pendingMessageTable)
                .where(eq(pendingMessageTable.uuid, messageId))
        }
    }

    return true;
}

export { 
    createPendingMessage,
    getPendingMessages, 
    deliverPendingMessages  
}