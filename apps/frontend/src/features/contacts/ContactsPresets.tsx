import { createContext } from "react";
import { ContactsHeader } from "./ContactsHeader";
import { ContactsProfileHeader } from "./ContactsProfileHeader";
import { ContactsProfileTitle } from "./ContactsProfileTitle";
import { ContactsProfileBody } from "./ContactsProfileBody";
import { ContactsSearch } from "./ContactsSearch";
import { ContactsList } from "./ContactsList";

const style = {
    width: '30%',
    borderRight: '0.4px solid rgba(255,255,255, 0.2)',
    margin: '0'
}

const headerStyle = {
    height: '6.3%',
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    paddingInline: '3%',
    width: '100%',
    background: '#202C33',
    fontSize: 'calc(1dvw + 1dvh)',
} as React.CSSProperties;

const searchStyle = {
    height: '5.5%',
    borderRadius: 0,
    background: '#111B21',
    display: 'flex',
    paddingBlock: '1.5%',
    paddingInline: '2.5%'
}

const contactsStyle = {
    height: '88.7%',
    background: '#111B21',
    overflowY: 'auto'
} as React.CSSProperties;

const profileHeaderStyle = {
    height: '6.3%',
    borderRadius: 0,
    display: 'flex',
    width: '100%',
    background: '#202C33',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '5%',
    paddingInline: '4%'
} as React.CSSProperties;

const profileBodyStyle = {
    height: '87.4%',
    width: '100%',
    background: '#111B21',
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
} as React.CSSProperties;

const contactsPanels = {
    'default': (
        <>
            <ContactsHeader style={headerStyle} />
            <ContactsSearch style={searchStyle} />
            <ContactsList style={contactsStyle} />
        </>
    ),
    'profile': (
        <>
            <ContactsProfileHeader style={profileHeaderStyle} />
            <ContactsProfileTitle style={profileHeaderStyle} />
            <ContactsProfileBody style={profileBodyStyle} />
        </>
    ),
    'status': <></>,
    'communities': <></>,
    'channels': <></>,
    'new-conversation': <></>
}

interface ContactsState {
    contextValue: { 
        currentPanel: keyof typeof contactsPanels,
        currentContact: string | null
    },
    setContextValue: React.Dispatch<React.SetStateAction<ContactsState['contextValue'] | null>>
}

const ContactsContext = createContext<ContactsState>({
    contextValue: { currentPanel: 'default', currentContact: '' },
    setContextValue: () => {}
});

export {
    type ContactsState,
    style,
    contactsPanels,
    ContactsContext
}