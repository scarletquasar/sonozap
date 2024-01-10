import { Database } from "../database/types.js"
import { createPendingMessage } from "./data.js"
import { CreatePendingMessageOptions } from "./types.js";

const getMessagingResolvers = (db: Database) => {
    const createPendingMessageResolver = async (
        _: unknown,
        { data, token }: { data: CreatePendingMessageOptions, token: string }
    ) => await createPendingMessage(data, token, db);

    return {
        createPendingMessage: createPendingMessageResolver
    }
}

export { getMessagingResolvers }