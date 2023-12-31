import { createBrowserRouter } from "react-router-dom";
import { ContactsContext, ContactsState, contactsPanels, style } from "./ContactsPresets";
import { useState } from "react";

const defaultContextValue: ContactsState['contextValue'] = {
    currentPanel: 'default',
    currentContact: null
}

const Contacts = (props: { router: ReturnType<typeof createBrowserRouter>}) => {
    console.log(props);
    const [contextValue, setContextValue] = useState(defaultContextValue);

    return (
        <ContactsContext.Provider value={{ contextValue, setContextValue } as ContactsState}>
            <div style={style}>
                {contactsPanels[contextValue.currentPanel]}
            </div>
        </ContactsContext.Provider>

    )
}

export { Contacts }