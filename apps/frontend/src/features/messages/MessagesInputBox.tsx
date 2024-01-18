import { Card } from "primereact/card"
import { defaultTheme } from "../../themes"
import { graphql } from "relay-runtime"
import { useMutation } from "react-relay"
import { useContext, useState } from "react"
import { ProfileContext } from "../profiling/ProfileContext"
import { toast } from "react-toastify"

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
    mutation MessagesInputBoxMutation($input: MessageInput, $token: String) {
        createPendingMessage(input: $input, token: $token)
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
                    console.log(contextValue.uuid);
                    commitMutation({
                        variables: {
                            input: {
                                content: message,
                                receiverId: '',
                                senderId: contextValue.uuid
                            },
                            token: localStorage.getItem('token')
                        },
                        onCompleted: (response, errors) => {
                            errors?.forEach(error => {
                                toast.error('Can not send message: ' + error.message, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                            });
                        }
                    });
                }
            }} />
        </Card>
    )
}

export { MessagesInputBox }