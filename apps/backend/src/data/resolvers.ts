import { Profile } from "features/profiling/ProfilePresets";
import { Database, createProfile, getProfile } from "./database";

const getResolvers = (db: Database) => ({
    Query: {
        getProfile: async (_: unknown, { uuid }: { uuid: string }) => getProfile(uuid, db),
        createProfile: async (_: unknown, { profile }: { profile: Profile }) => createProfile(profile, db),
    }
});

export { getResolvers }