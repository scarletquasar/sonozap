import { createBrowserRouter } from "react-router-dom";
import { ContactsContext, ContactsState, contactsPanels, style } from "./ContactsPresets";
import { useState } from "react";

const Contacts = (props: { router: ReturnType<typeof createBrowserRouter>}) => {
    console.log(props);

    const [contextValue, setContextValue] = useState<ContactsState['contextValue']>({ currentPanel: 'default' });

    return (
        <ContactsContext.Provider value={{ contextValue, setContextValue } as ContactsState}>
            <div style={style}>
                {contactsPanels[contextValue.currentPanel]}
            </div>
        </ContactsContext.Provider>

    )
}

export { Contacts }