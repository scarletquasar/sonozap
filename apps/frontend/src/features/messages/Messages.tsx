import { Card } from "primereact/card";
import { createBrowserRouter } from "react-router-dom";

const style = {
    width: '70%',
}

const headerStyle = {
    height: '6.3%',
    borderRadius: 0
}

const messagesStyle = {
    height: '87%',
    borderRadius: '0',
    background: 'none',
    scroll: 'auto'
}

const messageInputBoxStyle = {
    height: '6.7%',
    borderRadius: 0
}

const Messages = (props: { router: ReturnType<typeof createBrowserRouter>}) => {
    console.log(props);
    return (
        <div style={style}>
            <Card style={headerStyle}></Card>
            <Card style={messagesStyle}></Card>
            <Card style={messageInputBoxStyle}></Card>
        </div>
    )
};

export { Messages }