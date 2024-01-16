const messageBoxStyle = {
    width: '100%',
    display: 'flex'
}

const messageItemStyle = {
    padding: '0.5em'
}

const MessageBox = (props: { sender: boolean }) => {
    return (
        <div style={{...messageBoxStyle, flexDirection: props.sender ? 'row-reverse' : 'row' }}>
            <div style={{...messageItemStyle, background: props.sender ? '#005C4B' : '#202C33' }}>
                Message
            </div>
            
        </div>
    )
}

export { MessageBox }