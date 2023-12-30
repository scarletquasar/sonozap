import { Card } from "primereact/card";
import { createBrowserRouter } from "react-router-dom";

const style = {
    width: '40%',
    maxWidth: '480px',
    borderRight: '0.4px solid rgba(255,255,255, 0.2)',
    margin: '0'
}

const headerStyle = {
    height: '6.3%',
    borderRadius: 0
}

const searchStyle = {
    height: '5%',
    borderRadius: 0,
    background: '#111B21'
}

const contactsStyle = {
    height: '88.7%',
    background: '#111B21',
    overflowY: 'scroll'
} as React.CSSProperties;

const Contacts = (props: { router: ReturnType<typeof createBrowserRouter>}) => {
    console.log(props);
    return (
        <div style={style}>
            <Card style={headerStyle}></Card>
            <Card style={searchStyle}></Card>
            <Card style={contactsStyle}></Card>
        </div>
    )
}

export { Contacts }