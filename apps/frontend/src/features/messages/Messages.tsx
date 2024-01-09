import { Card } from "primereact/card";
import { MessageBox } from "./MessageBox";

const style = {
    width: '70%',
}

const headerStyle = {
    height: '6.3%',
    borderRadius: 0
}

const messagesStyle = {
    height: '87%',
    borderRadius: '0',
    background: 'none',
    scroll: 'auto'
}

const messageInputBoxStyle = {
    height: '6.7%',
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const messageTextBoxStyle = {
    width: '50vw',
    height: '100%',
    borderRadius: '1em',
    border: 'none',
    padding: '1em',
}

const Messages = () => {
    return (
        <div style={style}>
            <Card style={headerStyle}></Card>
            <Card style={messagesStyle}>
                <MessageBox />
            </Card>
            <Card style={messageInputBoxStyle}>
                <input 
                    style={messageTextBoxStyle} 
                    type="text"
                    placeholder="Type a message..." />
            </Card>
        </div>
    )
};

export { Messages }