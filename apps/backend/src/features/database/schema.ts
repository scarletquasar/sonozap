import { varchar, json, pgTable, uuid } from "drizzle-orm/pg-core";

export const profileTable = pgTable('profiles', {
    uuid: uuid('uuid').primaryKey(),
    username: varchar('username'),
    number: varchar('number'),
    bio: varchar('bio'),
    photo: varchar('photo'),
    password: varchar('password'),
    contacts: json('contacts')
});