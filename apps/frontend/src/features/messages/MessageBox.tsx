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
    sentAt: Date
}

const MessageBox = (props: MessageBoxProps) => {
    return (
        <div style={{...messageBoxStyle, flexDirection: props.sender ? 'row-reverse' : 'row' }}>
            <div style={{...messageItemStyle, background: props.sender ? '#005C4B' : '#202C33' }}>
                {props.content}
            </div>
        </div>
    )
}

export { MessageBox }