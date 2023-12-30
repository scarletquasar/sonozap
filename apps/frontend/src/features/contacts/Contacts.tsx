import { Card } from "primereact/card";
import { createBrowserRouter } from "react-router-dom";

const style = {
    width: '40%',
    maxWidth: '480px',
    border: '1px solid red',
    margin: '0'
}

const headerStyle = {
    height: '6.3%',
    borderRadius: 0
}

const Contacts = (props: { router: ReturnType<typeof createBrowserRouter>}) => {
    console.log(props);
    return (
        <div style={style}>
            <Card style={headerStyle}></Card>
        </div>
    )
}

export { Contacts }