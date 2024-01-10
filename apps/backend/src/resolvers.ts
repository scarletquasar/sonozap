import { Profile } from "./features/profiling/presets.js";
import { Database, authenticate, createProfile, getProfileWithContacts } from "./features/profiling/data.js";
import { getMessagingResolvers } from "./features/messaging/resolvers.js";

const getResolvers = (db: Database) => ({
    Query: {
        getProfileWithContacts: async (_: unknown, 
            { uuid, token }: 
            { uuid: string, token: string }) => getProfileWithContacts(uuid, token, db),
        authenticate: async (_: unknown, 
            { number, password }: 
            { number: string, password: string }) => await authenticate(number, password, db),
    },
    Mutation: {
        createProfile: async (_: unknown, 
            { profile, password, token }: 
            { profile: Profile, password: string, token: string }) => createProfile(profile, token, password, db),
        ...getMessagingResolvers(db)
    }
});

export { getResolvers }