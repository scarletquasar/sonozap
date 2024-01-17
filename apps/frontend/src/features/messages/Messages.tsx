import { Card } from "primereact/card";
import { MessageBox } from "./MessageBox";
import { useContext, useEffect, useState } from "react";
import { useInterval } from 'usehooks-ts';
import { Message } from "./MessagesPresets";
import { MessagingContext } from "./MessagingContext";
import { config } from  '../../config';
import { ProfileContext } from "../profiling/ProfileContext";
import { GraphQLResponseWithData, graphql } from "relay-runtime";
import { fetchFunction } from "../fetching/fetchFunction";
import { MessagesInputBox } from "./MessagesInputBox";
import { defaultTheme } from "../../themes";
import { useMutation } from "react-relay";

const style = {
    width: '70%'
}

const headerStyle = {
    height: defaultTheme.shapes.headerHeight,
    borderRadius: 0
}

const messagesStyle = {
    height: defaultTheme.shapes.messageViewerHeight,
    borderRadius: '0',
    background: 'none',
    scroll: 'auto',
    overflowY: 'auto'
} as React.CSSProperties;

const MessagesQuery = `
    query MessagesQuery($token: String) {
        getPendingMessages(token: $token) {
            uuid
            sentAt
            receiverId
            senderId
            content
        }
    }
`;

const MessagesMutation = graphql`
    mutation MessagesMutation($messageIds: [String]) {
        deliverPendingMessages(messageIds: $messageIds)
    }
`;

const Messages = () => {
    const { contextValue: messagingCtxValue } = useContext(MessagingContext);
    const { contextValue: profileCtxValue } = useContext(ProfileContext);
    const [commitMutation] = useMutation(MessagesMutation);

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const identifier = messagingCtxValue.currentMessageContactId + '-stored-messages';
        const contentString = localStorage.getItem(identifier) ?? '[]';
        const localMessages = JSON.parse(contentString) as Message[];
        setMessages(localMessages);
    }, [messagingCtxValue.currentMessageContactId]);

    useInterval(() => {
        const observable = fetchFunction({ 
            text: MessagesQuery 
        },
        { 
            token: localStorage.getItem('token')! 
        });

        observable.toPromise().then((response: GraphQLResponseWithData) => {
            const hasIncomingMessages = !!response.data?.getPendingMessages?.length;

            if (!response.errors && hasIncomingMessages) {
                const newMessages = response.data.getPendingMessages as Message[];
                const identifier = messagingCtxValue.currentMessageContactId + '-stored-messages';
                localStorage.setItem(identifier, JSON.stringify([...messages, ...newMessages]));
                setMessages([...messages, ...newMessages]);

                commitMutation({
                    variables: {
                        messageIds: newMessages.map(message => message.uuid)
                    }
                });
                
                return;
            }

            console.error('Error retrieving messages');
        });
    }, config.checkForNewMessagesDelay); 

    return (
        <div style={style}>
            <Card style={headerStyle}></Card>
            <Card style={messagesStyle}>
                {messages.map(msg => {
                    const isSender = msg.sender === profileCtxValue.uuid;

                    return (
                        <MessageBox
                            key={msg.content + msg.sentAt.getTime()}
                            sender={isSender}
                            content={msg.content}
                            sentAt={msg.sentAt} />
                    )
                })}
            </Card>
            <MessagesInputBox />

        </div>
    )
};

export { Messages }