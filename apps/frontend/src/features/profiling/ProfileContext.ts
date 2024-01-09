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
        uuid: localStorage.getItem('uuid') ?? '',
        username: localStorage.getItem('username') ?? '',
        bio: localStorage.getItem('bio') ?? '',
        number: localStorage.getItem('number') ?? '',
        photo: localStorage.getItem('photo') ?? '',
        contacts: JSON.parse(localStorage.getItem('contacts') ?? '[]')
    },
    setContextValue: () => {}
});

export { ProfileContext, type ProfileContextState }