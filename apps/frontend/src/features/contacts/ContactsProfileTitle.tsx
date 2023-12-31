import { useContext } from "react"
import { ContactsContext } from "./ContactsPresets"

const titleStyle = {
    padding: 0,
    margin: 0,
    fontSize: '1.2em',
    fontWeight: '300',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}

const buttonStyle = {
    border: 'none',
    background: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
}

function ContactsProfileTitle(props: { style: React.CSSProperties }) {
    const context = useContext(ContactsContext);

    return (
        <div style={props.style}>
            <button 
                onClick={() => context.setContextValue({ ...context.contextValue, currentPanel: 'default' })}
                style={buttonStyle}>
                <span className="material-symbols-outlined">
                arrow_back
                </span>
            </button>
            <h2 style={titleStyle}>Profile</h2>
        </div>
    )
}

export { ContactsProfileTitle }