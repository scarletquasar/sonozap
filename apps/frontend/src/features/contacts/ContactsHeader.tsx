import { Card } from "primereact/card"
import { useContext } from "react"
import { ContactsContext } from "./ContactsPresets"

function ContactsHeader(props: { style: React.CSSProperties }) {
    const context = useContext(ContactsContext);

    return (
        <Card style={props.style}>
            <button onClick={() => context.setContextValue({
                currentPanel: 'profile'
            })}>
                {'Profile'}
            </button>
        </Card>
    )
}

export { ContactsHeader }