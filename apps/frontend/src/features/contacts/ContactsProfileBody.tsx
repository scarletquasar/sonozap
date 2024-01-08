import { useContext } from "react";
import { ProfileContext } from "../profiling/ProfileContext";

const photoContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const photoStyle = {
    borderRadius: '100%',
    width: '50%'
};

const nameBlockStyle = {
    width: '90%'
};

const nameTextStyle = {
    color: '#008069',
    fontSize: '0.9em',
    marginTop: '8%'
};

const nameContentStyle = {
    display: 'flex'
};

const nameContentLeft = {
    width: '50%'
};

const nameContentRight = {
    width: '50%',
    display: 'flex',
    flexDirection: 'row-reverse'
} as React.CSSProperties;

const nameContentEditButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer'
}

const nameDisclaimerStyle = {
    fontSize: '0.9em',
    color: 'rgba(255,255,255, 0.5)'
}

const bioContentStyle = {
    display: 'flex'
}

const bioContentLeft = {
    width: '50%'
};

const bioContentRight = {
    width: '50%',
    display: 'flex',
    flexDirection: 'row-reverse'
} as React.CSSProperties;

const bioTextStyle = {
    color: '#008069',
    fontSize: '0.9em'
};

function ContactsProfileBody(props: { style: React.CSSProperties }) {
    const profileContext = useContext(ProfileContext);

    return (
        <div style={props.style}>
            <div style={photoContainerStyle}>
                <img style={photoStyle} src='./no-photo-placeholder.jpg' />
            </div>
            <div style={nameBlockStyle}>
                <div style={nameTextStyle}>
                    Your name
                </div>
                <br />
                <div style={nameContentStyle}>
                    <div style={nameContentLeft}>
                        {profileContext.contextValue.username}
                    </div>
                    <div style={nameContentRight}>
                        <button style={nameContentEditButtonStyle}>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    </div>
                </div>
                <br />
                <div style={nameDisclaimerStyle}>
                    This name is not your username neither your PIN. This name will
                    be shown to your Sonozap contacts.
                </div>
                <br />
                <div style={bioTextStyle}>
                    Bio
                </div>
                <br />
                <div style={bioContentStyle}>
                    <div style={bioContentLeft}>
                        {profileContext.contextValue.bio}
                    </div>
                    <div style={bioContentRight}>
                        <button style={nameContentEditButtonStyle}>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ContactsProfileBody }