import { Profile } from "features/profiling/ProfilePresets";
import { Database, authenticate, createProfile, getProfileWithContacts } from "./database";

const getResolvers = (db: Database) => ({
    Query: {
        getProfileWithContacts: async (_: unknown, { uuid }: { uuid: string }) => getProfileWithContacts(uuid, db),
        createProfile: async (_: unknown, 
            { profile, password }: 
            { profile: Profile, password: string }) => createProfile(profile, password, db),
        authenticate: async (_: unknown, 
            { number, password }: 
            { number: string, password: string }) => await authenticate(number, password, db),
    }
});

export { getResolvers }