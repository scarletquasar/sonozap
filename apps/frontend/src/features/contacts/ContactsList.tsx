import { useContext } from "react"
import { ProfileContext, ProfileContextState } from "../profiling/ProfileContext"
import { ContactCard } from "./ContactCard";

const getContactComponents = (contacts: ProfileContextState['contextValue']['contacts']) => {
    return contacts.map(contact => {
        const lastMessageMetadata = {
            intro: 'Hello world',
            viewStatus: 'read' as const
        }; //Todo: Fetch last message metadata
        return <ContactCard data={contact} lastMessageMetadata={lastMessageMetadata} />
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