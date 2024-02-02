const messageBoxStyle = {
    width: '100%',
    display: 'flex'
}

const messageItemStyle = {
    padding: '0.5em'
}

type MessageBoxProps = {
    sender: boolean,
    content: string,
    sentAt: Date,
    delivered: boolean
}

const messageBgs = {
    sender: {
        delivered: "#005C4B",
        pending: "424C4A"
    },
    receiver: "#202C33"
}

const MessageBox = (props: MessageBoxProps) => {
    const background = props.sender 
        ? messageBgs.sender[props.delivered ? "delivered" : "pending"]
        : messageBgs.receiver;

    return (
        <div style={{
            ...messageBoxStyle, 
            flexDirection: props.sender ? 'row-reverse' : 'row' 
        }}>
            <div style={{
                ...messageItemStyle, 
                background }}>
                {props.content}
            </div>
        </div>
    )
}

export { MessageBox }