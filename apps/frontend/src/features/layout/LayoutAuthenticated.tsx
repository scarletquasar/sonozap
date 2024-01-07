import { Contacts } from "../contacts/Contacts"
import { Messages } from "../messages/Messages"

const style = {
    height: '95dvh',
    aspectRatio: '16/9',
    display: 'flex',
    backgroundImage: "url('./whatsapp-bg.jpg')",
    backgroundSize: '20%',
    padding: '0'
}

const LayoutAuthenticated = () => {
    return (
        <div style={style}>
            <Contacts />
            <Messages  />
        </div>  
    )
}

export { LayoutAuthenticated }