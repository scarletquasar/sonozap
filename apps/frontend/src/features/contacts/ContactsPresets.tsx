import { createContext } from "react";
import { ContactsHeader } from "./ContactsHeader";
import { ContactsProfileHeader } from "./ContactsProfileHeader";
import { ContactsProfileTitle } from "./ContactsProfileTitle";
import { ContactsProfileBody } from "./ContactsProfileBody";
import { ContactsSearch } from "./ContactsSearch";
import { ContactsList } from "./ContactsList";
import { defaultTheme } from "../../themes";

const style = {
    width: '30%',
    borderRight: defaultTheme.colors.divisory,
    margin: '0'
}

const headerStyle = {
    height: defaultTheme.shapes.headerHeight,
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    paddingInline: defaultTheme.shapes.headderPaddingInline,
    background: defaultTheme.colors.primary,
    fontSize: defaultTheme.font.normalSize,
} as React.CSSProperties;

const searchStyle = {
    height: '5.5%',
    borderRadius: 0,
    background: defaultTheme.colors.secondary,
    display: 'flex',
    paddingBlock: '1.5%',
    paddingInline: '2.5%'
}

const contactsStyle = {
    height: '88.7%',
    background:  defaultTheme.colors.secondary,
    overflowY: 'auto'
} as React.CSSProperties;

const profileHeaderStyle = {
    height: defaultTheme.shapes.headerHeight,
    borderRadius: 0,
    display: 'flex',
    width: '100%',
    background:  defaultTheme.colors.primary,
    alignItems: 'center',
    flexDirection: 'row',
    gap: '5%',
    paddingInline: '4%'
} as React.CSSProperties;

const profileBodyStyle = {
    height: '87.4%',
    width: '100%',
    background:  defaultTheme.colors.primary,
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