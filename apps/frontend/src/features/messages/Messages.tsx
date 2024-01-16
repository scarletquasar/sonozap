import { Card } from "primereact/card";
import { MessageBox } from "./MessageBox";
import { useContext, useEffect, useState } from "react";
import { useInterval } from 'usehooks-ts';
import { Message } from "./MessagesPresets";
import { MessagingContext } from "./MessagingContext";
import { config } from  '../../config';
import { ProfileContext } from "../profiling/ProfileContext";

const style = {
    width: '70%'
}

const headerStyle = {
    height: '6.3%',
    borderRadius: 0
}

const messagesStyle = {
    height: '87%',
    borderRadius: '0',
    background: 'none',
    scroll: 'auto',
    overflowY: 'auto'
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
    const { contextValue: messagingCtxValue } = useContext(MessagingContext);
    const { contextValue: profileCtxValue } = useContext(ProfileContext);

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const identifier = messagingCtxValue.currentMessageContactId + '-stored-messages';
        const contentString = localStorage.getItem(identifier) ?? '[]';
        const localMessages = JSON.parse(contentString) as Message[];
        setMessages(localMessages);
    }, [messagingCtxValue.currentMessageContactId]);

    useInterval(() => {
        const hasNewMessages = true;

        if (hasNewMessages) {
            const newMessages = [{
                sentAt: new Date(),
                content: 'test',
                sender: Math.round(Math.random()).toString()
            }] as Message[];
            setMessages([...messages, ...newMessages]);
        }

        console.log(messages);
    }, config.checkForNewMessagesDelay); 

    return (
        <div style={style}>
            <Card style={headerStyle}></Card>
            <Card style={messagesStyle}>
                {messages.map(msg => {
                    // const isSender = msg.sender === profileCtxValue.uuid;
                    const isSender = msg.sender === '1';
                    return (
                        <MessageBox
                            key={msg.content + msg.sentAt.getTime()}
                            sender={isSender}
                            content={msg.content}
                            sentAt={msg.sentAt} />
                    )
                })}
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