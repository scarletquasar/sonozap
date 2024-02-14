import { useContext } from "react"
import { ProfileContext, ProfileContextState } from "../profiling/ProfileContext"
import { ContactCard } from "./ContactCard";

const getContactComponents = (contacts: ProfileContextState['contextValue']['contacts']) => {
    return contacts.map(contact => {
        const lastMessageMetadata1 = {
            intro: 'Hello world! (read message)',
            viewStatus: 'read' as const,
            date: new Date()
        };
        const lastMessageMetadata2 = {
            intro: 'Beautiful day. (sent message)',
            viewStatus: 'sent' as const,
            date: new Date()
        };
        const lastMessageMetadata3 = {
            intro: 'I agree. (received message)',
            viewStatus: 'received' as const,
            date: new Date()
        };
        return (
            <>
                <ContactCard 
                data={contact} 
                lastMessageMetadata={lastMessageMetadata1} />
                <ContactCard 
                data={contact} 
                lastMessageMetadata={lastMessageMetadata2} />
                <ContactCard 
                data={contact} 
                lastMessageMetadata={lastMessageMetadata3} />
            </>
        )
    })
};

const ContactsList = (props: { style: React.CSSProperties }) => {
    const context = useContext(ProfileContext);

    return (
        <div style={props.style}>
            {getContactComponents(context.contextValue.contacts)}
        </div>
    )
}

export { ContactsList }