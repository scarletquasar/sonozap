import { z } from 'zod';

const ProfileBase = z.object({
    uuid: z.string().uuid(),
    username: z.string().max(64, 'The username can not have more than 64 chars'),
    bio: z.string().max(128, 'The bio can not have more than 128 chars'),
    number: z.string().max(16, 'The maximum size for the phone number is 16 digits'),
    photo: z.string().url().optional(),
    password: z.string().max(360)
});

const Profile = ProfileBase.merge(z.object({
    contacts: z.array(ProfileBase)
}));

type Profile = typeof Profile._type;

export { Profile }