import { ViewStatus } from "../messages/MessagesPresets";
import { ProfileContextState } from "../profiling/ProfileContext"

const contactCardStyle = {
    width: '100%',
    height: '10%',
    border: '1px solid red',
    borderRadius: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '3%',
    paddingInline: '3%'
} as React.CSSProperties;

const contactCardLeftStyle = {
    width: '12%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const contactCardRightStyle = {
    width: '88%',
};

const contactPhotoStyle = {
    width: '100%'
}

const contactTitleStyle = {
    fontSize: '1.1em'
};

const lastMessageStyle = {
    fontSize: '0.9em'
}

const ContactCard = (props: { 
    data: ProfileContextState['contextValue']['contacts'][number],
    lastMessageMetadata: {
        intro: string,
        viewStatus: ViewStatus
    }
}) => {
    return (
        <div style={contactCardStyle}>
            <div style={contactCardLeftStyle}>
                <img style={contactPhotoStyle} src={props.data.photo ?? './no-photo-placeholder.jpg'} />
            </div>
            <div style={contactCardRightStyle}>
                <div style={contactTitleStyle}>
                    {props.data.username}
                </div>
                <div style={lastMessageStyle}>
                    {props.lastMessageMetadata.viewStatus}
                    {props.lastMessageMetadata.intro}
                </div>
            </div>
        </div>
    )
}

export { ContactCard }