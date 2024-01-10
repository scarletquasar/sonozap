import { varchar, json, pgTable, uuid, date, boolean } from "drizzle-orm/pg-core";

export const profileTable = pgTable('profiles', {
    uuid: uuid('uuid').primaryKey(),
    username: varchar('username'),
    number: varchar('number'),
    bio: varchar('bio'),
    photo: varchar('photo'),
    password: varchar('password'),
    contacts: json('contacts')
});

export const pendingMessageTable = pgTable('pendingMessages', {
    uuid: uuid('uuid').primaryKey(),
    sentAt: date('sentAt'),
    senderId: uuid('senderId'),
    receiverId: uuid('receiverId'),
    content: varchar('content', { length: 1024 })
});