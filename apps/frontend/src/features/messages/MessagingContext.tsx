import { createContext } from "react";

interface MessagingContextState {
    contextValue: { 
        currentMessageContactId: string
    },
    setContextValue: React.Dispatch<
        React.SetStateAction<
            MessagingContextState['contextValue'] | null
        >
    >
}

const MessagingContext = createContext<MessagingContextState>({
    contextValue: {
        currentMessageContactId: '',
    },
    setContextValue: () => {}
});

export { MessagingContext, type MessagingContextState }