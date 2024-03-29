import { Profile } from "./presets.js";
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { z } from 'zod';
import { and, eq } from "drizzle-orm";
import { createJwt, validateAndParseJwt } from "./authentication.js";
import { profileTable } from "../database/schema.js";
import type { Database } from "../database/types.js";
import { randomUUID } from "crypto";

type ProfileWithContacts = Profile & { contacts?: Profile[] }

const getProfileWithContacts = async (
    uuid: string, 
    token: string, 
    db: Database, 
    isContactProfile = false,
    systemCall = false
): Promise<ProfileWithContacts> => {
    const validUUID = await z.string().uuid().parseAsync(uuid);
    
    if (!systemCall) {
        await validateAndParseJwt(token);
    }

    const profile = (await db
        .select()
        .from(profileTable)
        .where(eq(profileTable.uuid, validUUID))
        .limit(1))[0] as Profile;

    if (isContactProfile) {
        return { ...profile, contacts: [] };
    }

    const contactPromises = profile.contacts.map(uuid => getProfileWithContacts(uuid, token, db, true));
    const contacts = await Promise.all(contactPromises) as Profile[];

    return { ...profile, contacts } as ProfileWithContacts;
}

const createProfile = async (profile: Profile, password: string, token: string, db: Database) => {
    profile.uuid = randomUUID();
    const validProfile = await Profile.parseAsync(profile);
    const insertionProfile = {...validProfile, contacts: validProfile.contacts };

    await validateAndParseJwt(token);

    await db
        .insert(profileTable)
        .values({
            uuid: insertionProfile.uuid,
            username: insertionProfile.username,
            number: insertionProfile.number,
            bio: insertionProfile.bio,
            photo: insertionProfile.photo,
            password: password,
            contacts: insertionProfile.contacts
        });
    
    return validProfile;
}

const authenticate = async (number: string, password: string, db: Database) => {
    const validNumber = await z
        .string()
        .max(16, 'Maximum number size: 16 characters')
        .regex(/^\d+$/, 'Invalid phone number')
        .parseAsync(number);

    const validPassword = await z
        .string()
        .max(360, 'Maximum password size: 360 characters')
        .parseAsync(password);

    const match = await db
        .select({ uuid: profileTable.uuid })
        .from(profileTable)
        .where(and(
            eq(profileTable.number, validNumber), 
            eq(profileTable.password, validPassword)
        ));

    if (!match) {
        throw new Error('Invalid credentials or non-existent user');
    }

    const profile = await getProfileWithContacts(match[0].uuid, null, db, false, true);
    const token = await createJwt(profile);

    return token;
}

export { 
    Database, 
    getProfileWithContacts, 
    createProfile, 
    authenticate 
}