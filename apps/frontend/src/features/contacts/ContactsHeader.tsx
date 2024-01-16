import { useContext, useState } from "react";
import { ContactsContext } from "./ContactsPresets";

const profilePicStyle = {
    borderRadius: '100%',
    height: '1.5em',
    aspectRatio: '1 / 1',
    border: 'none',
    cursor: 'pointer'
} as React.CSSProperties;

const leftBlockStyle = {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
} as React.CSSProperties;

const rightBlockStyle = {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: '1.5%',
} as React.CSSProperties;

const headerButtonStyle = {
    border: 'none',
    background: 'none',
    color: 'rgba(220, 220, 220, 0.8)',
    cursor: 'pointer',
    borderRadius: '100%',
    transition: '200ms',
    display: 'flex',
    padding: '5%'
}

const headerButtonIconStyle = {
    fontSize: 'calc(1dvw + 1dvh)'
}

function ContactsHeader(props: { style: React.CSSProperties }) {
    const context = useContext(ContactsContext);

    const [optionsButtonBg, setOptionsButtonBg] = useState('none');
    const [chatsButtonBg, setChatsButtonBg] = useState('none');
    const [channelsButtonBg, setChannelsButtonBg] = useState('none');
    const [commsButtonBg, setCommsButtonBg] = useState('none');
    const [statusButtonBg, setStatusButtonBg] = useState('none');

    return (
        <div style={props.style}>
            <div style={leftBlockStyle}>
                <img 
                    role="button"
                    style={profilePicStyle} 
                    src="/no-photo-placeholder.jpg" 
                    onClick={() => context.setContextValue({
                        ...context.contextValue,
                        currentPanel: 'profile'
                    })} />
            </div>
            <div style={rightBlockStyle}>
                <button
                    onClick={() => {
                        setOptionsButtonBg('rgba(100, 100, 100, 0.8)');
                        setTimeout(() => setOptionsButtonBg('none'), 200);
                    }}
                    style={{...headerButtonStyle, background: optionsButtonBg}}>
                    <span style={headerButtonIconStyle} className="material-symbols-outlined">
                        more_vert
                    </span>
                </button>
                <button 
                    onClick={() => {
                        setChatsButtonBg('rgba(100, 100, 100, 0.8)');
                        setTimeout(() => setChatsButtonBg('none'), 200);
                    }}
                    style={{...headerButtonStyle, background: chatsButtonBg}}>
                    <span style={headerButtonIconStyle} className="material-symbols-outlined">
                        add_comment
                    </span>
                </button>
                <button
                    onClick={() => {
                        setChannelsButtonBg('rgba(100, 100, 100, 0.8)');
                        setTimeout(() => setChannelsButtonBg('none'), 200);
                    }} 
                    style={{...headerButtonStyle, background: channelsButtonBg}}>
                    <span style={headerButtonIconStyle} className="material-symbols-outlined">
                        maps_ugc
                    </span>
                </button>
                <button 
                    onClick={() => {
                        setStatusButtonBg('rgba(100, 100, 100, 0.8)');
                        setTimeout(() => setStatusButtonBg('none'), 200);
                    }}
                    style={{...headerButtonStyle, background: statusButtonBg}}>
                    <span style={headerButtonIconStyle} className="material-symbols-outlined">
                        dashboard_customize
                    </span>
                </button>
                <button 
                    onClick={() => {
                        setCommsButtonBg('rgba(100, 100, 100, 0.8)');
                        setTimeout(() => setCommsButtonBg('none'), 200);
                    }}
                    style={{...headerButtonStyle, background: commsButtonBg}}>
                    <span style={headerButtonIconStyle} className="material-symbols-outlined">
                        groups_2
                    </span>
                </button>
            </div>
        </div>
    )
}

export { ContactsHeader }