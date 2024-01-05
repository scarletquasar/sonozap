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
        uuid: '',
        username: '',
        number: '',
        bio: '',
        contacts: []
    },
    setContextValue: () => {}
});

export { ProfileContext, type ProfileContextState }