import { Card } from 'primereact/card';
import { createBrowserRouter } from 'react-router-dom';
import { Contacts } from '../contacts/Contacts';
import { Messages } from '../messages/Messages';

// TODO: Change to dynamic mapping based on contacts
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

const style = {
    marginBlock: '5px',
    width: '83vw',
    backgroundImage: "url('./whatsapp-bg.jpg')",
    backgroundSize: '20%',
    height: '96vh',
    display: 'flex',
    padding: '0'
}

const Layout = () => {
    return (
        <div style={style}>
            <Contacts router={router} />
            <Messages router={router} />
        </div>
    )
}

export { Layout }