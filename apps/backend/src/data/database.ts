import { Profile } from "features/profiling/ProfilePresets";
import { pgTable, uuid, varchar, json } from "drizzle-orm/pg-core";
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { z } from 'zod';
import { eq } from "drizzle-orm";

type Database = PostgresJsDatabase<Record<string, any>>;

const profileTable = pgTable('profiles', {
    uuid: uuid('uuid').primaryKey(),
    username: varchar('username'),
    number: varchar('number'),
    bio: varchar('bio'),
    photo: varchar('photo'),
    password: varchar('password'),
    contacts: json('contacts')
});

const getProfile = async (uuid: string, db: Database) => {
    const validUUID = await z.string().uuid().parseAsync(uuid);

    const profile = await db
        .select({ 
            username: profileTable.username,
            number: profileTable.number,
            bio: profileTable.bio,
            photo: profileTable.photo
        })
        .from(profileTable)
        .where(eq(profileTable.uuid, validUUID))
        .limit(1);

    return profile[0];
}

const createProfile = async (profile: Profile, db: Database) => {
    const validProfile = await Profile.parseAsync(profile);
    const insertionProfile = {...validProfile, contacts: validProfile.contacts.map(x => x.uuid) };

    await db
        .insert(profileTable)
        .values({
            uuid: insertionProfile.uuid,
            username: insertionProfile.username,
            number: insertionProfile.number,
            bio: insertionProfile.bio,
            photo: insertionProfile.photo,
            password: insertionProfile.password,
            contacts: insertionProfile.contacts
        });
    
    return validProfile;
}

export { Database, getProfile, createProfile }