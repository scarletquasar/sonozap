import { Card } from "primereact/card";
import { useContext } from "react";
import { ContactsContext } from "./ContactsPresets";
import { Button } from 'primereact/button';

const buttonStyle = {
    borderRadius: '100%',
    height: '70%',
    width: '18%',
    background: "url('./no-photo-placeholder.jpg')",
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    border: 'none'
} as React.CSSProperties;

const leftBlockStyle = {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
} as React.CSSProperties;

const rightBlockStyle = {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
} as React.CSSProperties;

function ContactsHeader(props: { style: React.CSSProperties }) {
    const context = useContext(ContactsContext);

    return (
        <div style={props.style}>
            <div style={leftBlockStyle}>
                <Button style={buttonStyle} onClick={() => context.setContextValue({
                    currentPanel: 'profile'
                })} />
            </div>
            <div style={rightBlockStyle}>
                a
            </div>
        </div>
    )
}

export { ContactsHeader }