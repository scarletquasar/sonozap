import { Card } from "primereact/card";
import { createContext } from "react";
import { ContactsHeader } from "./ContactsHeader";

const style = {
    width: '30%',
    borderRight: '0.4px solid rgba(255,255,255, 0.2)',
    margin: '0'
}

const headerStyle = {
    height: '6.3%',
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center'
}

const searchStyle = {
    height: '5%',
    borderRadius: 0,
    background: '#111B21'
}

const contactsStyle = {
    height: '88.7%',
    background: '#111B21',
    overflowY: 'auto'
} as React.CSSProperties;

const profileInfoStyle = {

};

const contactsPanels = {
    'default': (
        <>
            <ContactsHeader style={headerStyle} />
            <Card style={searchStyle}></Card>
            <Card style={contactsStyle}></Card>
        </>
    ),
    'profile': <Card style={profileInfoStyle}></Card>,
    'status': <></>,
    'communities': <></>,
    'channels': <></>,
    'new-conversation': <></>
}

interface ContactsState {
    contextValue: { currentPanel: keyof typeof contactsPanels },
    setContextValue: React.Dispatch<React.SetStateAction<ContactsState['contextValue'] | null>>
}

const ContactsContext = createContext<ContactsState>({
    contextValue: { currentPanel: 'default' },
    setContextValue: () => {}
});

export {
    type ContactsState,
    style,
    contactsPanels,
    ContactsContext
}