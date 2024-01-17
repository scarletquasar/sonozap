import { Database } from "../database/types.js"
import { createPendingMessage, deliverPendingMessages, getPendingMessages } from "./data.js"
import { CreatePendingMessageOptions } from "./types.js";

const getMessagingQueryResolvers = (db: Database) => {
    const getPendingMessagesResolver = async (
        _: unknown,
        { token }: { token: string }
    ) => await getPendingMessages(token, db);

    return {
        getPendingMessages: getPendingMessagesResolver
    }
}

const getMessagingMutationResolvers = (db: Database) => {
    const createPendingMessageResolver = async (
        _: unknown,
        { data, token }: { data: CreatePendingMessageOptions, token: string }
    ) => await createPendingMessage(data, token, db);

    const deliverPendingMessagesResolver = async (
        _: unknown,
        { messageIds, token }: { messageIds: string[], token: string }
    ) => await deliverPendingMessages(messageIds, token, db);

    return {
        createPendingMessage: createPendingMessageResolver,
        deliverPendingMessages: deliverPendingMessagesResolver
    }
}

export { getMessagingQueryResolvers, getMessagingMutationResolvers }