import { Profile } from "features/profiling/ProfilePresets";
import { createProfile, getProfile } from "./database";

const resolvers = {
    Query: {
        getProfile: async (_: unknown, { uuid }: { uuid: string }) => getProfile(uuid),
        createProfile: async (_: unknown, { profile }: { profile: Profile }) => createProfile(profile),
    }
};

export { resolvers }