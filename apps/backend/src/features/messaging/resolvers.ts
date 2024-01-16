import { Database } from "../database/types.js"
import { checkForPendingMessages, createPendingMessage, deliverPendingMessages, getPendingMessages } from "./data.js"
import { CreatePendingMessageOptions } from "./types.js";

const getMessagingResolvers = (db: Database) => {
    const createPendingMessageResolver = async (
        _: unknown,
        { data, token }: { data: CreatePendingMessageOptions, token: string }
    ) => await createPendingMessage(data, token, db);

    const checkForPendingMessagesResolver = async (
        _: unknown,
        { token }: { token: string }
    ) => await checkForPendingMessages(token, db);

    const getPendingMessagesResolver = async (
        _: unknown,
        { token }: { token: string }
    ) => await getPendingMessages(token, db);

    const deliverPendingMessagesResolver = async (
        _: unknown,
        { messageIds, token }: { messageIds: string[], token: string }
    ) => await deliverPendingMessages(messageIds, token, db);

    return {
        createPendingMessage: createPendingMessageResolver,
        checkForPendingMessages: checkForPendingMessagesResolver,
        getPendingMessages: getPendingMessagesResolver,
        deliverPendingMessages: deliverPendingMessagesResolver
    }
}

export { getMessagingResolvers }