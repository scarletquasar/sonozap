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
// 2. Get pending message
// The message content will be fetched by the client with the
// correct permissions to be saved locally.
// 3. Deliver pending message
// The client will send a signal after properly storing the
// message, then, the backend will know that is OK to delete
// the pending message object from the database.

const createPendingMessage = async (
    options: CreatePendingMessageOptions,
    token: string,
    db: Database
) => {
    const sentAt = new Date().toISOString();
    const uuid = randomUUID();

    await checkJwtOwnership(token, options.senderId);

    await db
        .insert(pendingMessageTable)
        .values({
            uuid,
            sentAt,
            senderId: options.senderId,
            receiverId: options.receiverId,
            content: options.content
        });

    return uuid;
}

const deliverPendingMessage = async (messageId: string, token: string, db: Database) => {
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

export { createPendingMessage }