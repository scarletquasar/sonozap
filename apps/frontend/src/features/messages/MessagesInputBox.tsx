import { Card } from "primereact/card"
import { defaultTheme } from "../../themes"
import { graphql } from "relay-runtime"
import { useMutation } from "react-relay"
import { useContext, useState } from "react"
import { ProfileContext } from "../profiling/ProfileContext"

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

const MessagesInputBoxMutation = graphql`
    mutation MessagesInputBoxMutation($input: MessageInput) {
        createPendingMessage(input: $input)
    }
`;

const MessagesInputBox = () => {
    const [commitMutation] = useMutation(MessagesInputBoxMutation);
    const { contextValue } = useContext(ProfileContext);
    const [message, setMessage] = useState('');

    return (
        <Card style={messageInputBoxStyle}>
        <input 
            style={messageTextBoxStyle} 
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    commitMutation({
                        variables: {
                            content: message,
                            receiverId: '',
                            senderId: contextValue.uuid
                        }
                    });
                }
            }} />
        </Card>
    )
}

export { MessagesInputBox }