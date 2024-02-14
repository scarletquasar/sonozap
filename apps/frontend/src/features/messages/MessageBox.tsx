import { defaultTheme } from "../../themes"

const messageBoxStyle = {
    width: '100%',
    display: 'flex'
}

const messageItemStyle = {
    paddingBlock: '0.8em',
    paddingInline: '0.9em',
    borderRadius: defaultTheme.shapes.messageItemBorderRadius
}

const messageItemTextStyle = {
    fontSize: defaultTheme.font.smallSize,
    fontFamily: defaultTheme.font.messageItemFamily
}

const messageItemDateStyle = {
    color: defaultTheme.colors.secondaryText,
    fontSize: defaultTheme.font.smallerSize,
    fontFamily: defaultTheme.font.messageItemFamily
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
                    <div style={messageItemTextStyle}>
                        {props.content}
                    </div>
                    <div style={messageItemDateStyle}>
                        {props.sentAt.toLocaleString()}
                    </div>
                 
            </div>
        </div>
    )
}

export { MessageBox }