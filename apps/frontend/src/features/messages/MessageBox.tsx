const messageBoxStyle = {
    width: '100%',
    display: 'flex'
}

const messageItemStyle = {
    padding: '0.5em',
    background: 'gray'
}

const MessageBox = (props: { sender: boolean }) => {
    return (
        <div style={{...messageBoxStyle, flexDirection: props.sender ? 'row-reverse' : 'row' }}>
            <div style={messageItemStyle}>
                Message
            </div>
            
        </div>
    )
}

export { MessageBox }