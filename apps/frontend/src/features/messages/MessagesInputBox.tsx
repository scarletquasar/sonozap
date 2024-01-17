import { Card } from "primereact/card"
import { defaultTheme } from "../../themes"

const messageInputBoxStyle = {
    height: defaultTheme.shapes.messageBoxHeight,
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const messageTextBoxStyle = {
    width: '50vw',
    padding: '1%',
    borderRadius: '1em',
    border: 'none',
}

const MessagesInputBox = () => {
    return (
        <Card style={messageInputBoxStyle}>
        <input 
            style={messageTextBoxStyle} 
            type="text"
            placeholder="Type a message..." />
        </Card>
    )
}

export { MessagesInputBox }