import { useState } from "react";
import { ViewStatus } from "../messages/MessagesPresets";
import { ProfileContextState } from "../profiling/ProfileContext"

const contactCardNormalStyle = {
    background: 'none'
};

const contactCardHoverStyle = {
    background: '#202C33'
}

const contactCardLeftStyle = {
    width: '12%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const contactCardRightStyle = {
    width: '88%',
    borderBottom: '1px solid #2E3F49',
    paddingBottom: '2%'
};

const contactPhotoStyle = {
    width: '100%',
    borderRadius: '100%'
}

const contactTitleStyle = {
    fontSize: '1.1em',
    display: 'flex'
};

const lastMessageStyle = {
    fontSize: '0.9em'
}

const contactTitleLeftStyle = {
    width: '50%'
};

const contactTitleRightStyle = {
    width: '50%',
    display: 'flex',
    flexDirection: 'row-reverse',
    fontSize: '0.75em',
} as React.CSSProperties;

const ContactCard = (props: { 
    data: ProfileContextState['contextValue']['contacts'][number],
    lastMessageMetadata: {
        intro: string,
        viewStatus: ViewStatus,
        date: Date
    }
}) => {
    const [contactCardStyle, setContactCardStyle] = useState<React.CSSProperties>({
        width: '100%',
        height: '10%',
        borderRadius: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '3%',
        paddingInline: '3%',
        cursor: 'pointer'
    });

    const cardMouseOver = () => { 
        setContactCardStyle((current) => ({ ...current, ...contactCardHoverStyle}));
    };

    const cardMouseLeave = () => {
        setContactCardStyle((current) => ({ ...current, ...contactCardNormalStyle}));
    }

    return (
        <div style={contactCardStyle} onMouseOver={cardMouseOver} onMouseLeave={cardMouseLeave}>
            <div style={contactCardLeftStyle}>
                <img style={contactPhotoStyle} src={props.data.photo ?? './no-photo-placeholder.jpg'} />
            </div>
            <div style={contactCardRightStyle}>
                <div style={contactTitleStyle}>
                    <div style={contactTitleLeftStyle}>
                        {props.data.username}
                    </div>
                    <div style={contactTitleRightStyle}>
                        {props.lastMessageMetadata.date.toLocaleString()}
                    </div>
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