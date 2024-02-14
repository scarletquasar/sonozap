import { useState } from "react";
import { ViewStatus } from "../messages/MessagesPresets";
import { ProfileContextState } from "../profiling/ProfileContext"
import { defaultTheme } from "../../themes";

const contactCardNormalStyle = {
    background: 'none'
};

const contactCardHoverStyle = {
    background: defaultTheme.colors.primary
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
    height: '100%',
    paddingBottom: '2%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottom: '1px solid #2E3F49'
} as React.CSSProperties;

const contactPhotoStyle = {
    width: '95%',
    borderRadius: '100%',
    aspectRatio: '1 / 1'
}

const contactTitleStyle = {
    fontSize: '1.1em',
    display: 'flex'
};

const lastMessageStyle = {
    fontSize: '0.9em',
    display: 'flex',
    alignItems: 'center',
    gap: '1%',
    color: defaultTheme.colors.secondaryText
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

const viewStatusStyle = {
    marginTop: '30%',
    fontSize: defaultTheme.font.smallSize,
    display: 'flex',
    color: defaultTheme.colors.secondaryText,
    height: '100%',
    alignItems: 'center'
}

const lastMessageItemStyle = {
    display: 'flex',
    placeItems: 'center',
    padding: 0,
    margin: 0,
    height: '100%'
}

const viewStatus = {
    'read': (
        <div style={viewStatusStyle} className="material-symbols-outlined">
            visibility
        </div>
    ),
    'received': (
        <div style={viewStatusStyle} className="material-symbols-outlined">
            visibility_off
        </div>
    ),
    'sent': (
        <div style={viewStatusStyle} className="material-symbols-outlined">
            hourglass_empty
        </div>
    )
}

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
                <img 
                    style={contactPhotoStyle} 
                    src={props.data.photo ?? './no-photo-placeholder.jpg'} />
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
                    <div style={lastMessageItemStyle}>
                        {viewStatus[props.lastMessageMetadata.viewStatus]}
                    </div>
                    <div style={lastMessageItemStyle}>
                        {props.lastMessageMetadata.intro}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ContactCard }