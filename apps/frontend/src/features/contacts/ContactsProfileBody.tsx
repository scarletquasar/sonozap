import { ContactsProfileData } from './ContactsProfileData';

const photoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const photoStyle = {
    borderRadius: '100%',
    width: '50%'
};

function ContactsProfileBody(props: { style: React.CSSProperties }) {
    return (
        <div style={props.style}>
            <div style={photoContainerStyle}>
                <img style={photoStyle} src='./no-photo-placeholder.jpg' />
            </div>
            <ContactsProfileData />
        </div>
    )
}

export { ContactsProfileBody }