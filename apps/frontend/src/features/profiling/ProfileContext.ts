import { createContext } from "react";

interface ProfileContextState {
    contextValue: { 
        uuid: string,
        username: string,
        bio: string,
        number: string,
        photo?: string,
        contacts: Array<{
            uuid: string,
            username: string,
            bio: string
            number: string,
            photo?: string
        }>
    },
    setContextValue: React.Dispatch<React.SetStateAction<ProfileContextState['contextValue'] | null>>
}

const ProfileContext = createContext<ProfileContextState>({
    contextValue: {
        uuid: 'default-uuid',
        username: 'default',
        number: '5555555555555',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        contacts: [
            {
                uuid: 'contact-uuid',
                username: 'default2',
                number: '55555589788',
                bio: 'Hello world'
            },
            {
                uuid: 'contact-uuid',
                username: 'default2',
                number: '55555589788',
                bio: 'Hello world'
            }
        ]
    },
    setContextValue: () => {}
});

export { ProfileContext, type ProfileContextState }