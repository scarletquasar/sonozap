import { Card } from "primereact/card"
import { defaultTheme } from "../../themes"
import { Disposable, MutationParameters, graphql } from "relay-runtime"
import { UseMutationConfig, useMutation } from "react-relay"
import { Dispatch, SetStateAction, createRef, useContext, useState } from "react"
import { ProfileContext } from "../profiling/ProfileContext"
import { toast } from "react-toastify"
import { Message } from "./MessagesPresets"

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

type MessagesInputBoxProps  = {
    setMessages: (value: SetStateAction<Message[]>) => void
};

type MessageData = {
    content: string;
    receiverId: string;
    senderId: string;
}

const sendMessageCommit = (
    input: MessageData, 
    localId: string,
    setMessage: Dispatch<SetStateAction<string>>,
    setMessages: MessagesInputBoxProps['setMessages'],
    commitMutation: (config: UseMutationConfig<MutationParameters>) => Disposable) => {
        commitMutation({
            variables: {
                input,
                token: localStorage.getItem('token')
            },
            onCompleted: (_, errors) => {
                setMessage('');

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

                if (!errors) {
                    // Actually updates the send message to delivered
                    setMessages(current => {
                        return current.map(message => {
                            if (message.uuid == localId) {
                                return {
                                    ...message,
                                    delivered: true
                                }
                            }

                            return message
                        })
                    });

                    return;
                }

                // Removes the problematic message
                setMessages(current => {
                    return current.filter(message => {
                        if (message.uuid == localId) {
                            return false;
                        }

                        return true;
                    })
                });
            }
        });
}

const MessagesInputBox = (props: MessagesInputBoxProps) => {
    const [commitMutation] = useMutation(MessagesInputBoxMutation);
    const { contextValue } = useContext(ProfileContext);
    const [message, setMessage] = useState('');
    const inputRef = createRef<HTMLInputElement>();

    return (
        <Card style={messageInputBoxStyle}>
        <input 
            style={messageTextBoxStyle} 
            type="text"
            placeholder="Type a message..."
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    console.log(contextValue.uuid);

                    const messageData = {
                        content: message,
                        receiverId: '',
                        senderId: contextValue.uuid
                    };

                    const localId = JSON.stringify(messageData); 

                    // Shows the message as undelivered
                    props.setMessages(current => {
                        return [...current, {
                            sentAt: new Date(),
                            uuid: localId,
                            receiver: messageData.receiverId,
                            sender: messageData.senderId,
                            content: messageData.content,
                            delivered: false
                        }]
                    });

                    sendMessageCommit(
                        messageData, 
                        localId,
                        setMessage,
                        props.setMessages, 
                        commitMutation
                    );
                }
            }} />
        </Card>
    )
}

export { MessagesInputBox }