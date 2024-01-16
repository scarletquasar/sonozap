import { useState, useEffect } from "react";
import { graphql, loadQuery } from "react-relay";
import { environment } from "../../environment";
import { defaultTheme } from "../../themes";
import { ContactsProfileBodyField } from "./ContactsProfileBodyField";

const nameBlockStyle = {
    width: '90%'
};

const nameTextStyle = {
    color:  defaultTheme.colors.primaryText,
    fontSize: defaultTheme.font.smallSize
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
    fontSize: defaultTheme.font.smallSize,
    color:  defaultTheme.colors.secondaryText
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
    color:  defaultTheme.colors.primaryText,
    fontSize: defaultTheme.font.smallSize
};

const ContactsProfileDataQuery = graphql`
  query ContactsProfileDataQuery($uuid: String, $token: String) {
    getProfileWithContacts(uuid: $uuid, token: $token) {
      username
      bio
    }
  }
`;

const ContactsProfileData = () => {
    const [queryReference, setQueryReference] = useState<ReturnType<typeof loadQuery>>()

    useEffect(() => {
        const uuid = localStorage.getItem('uuid');
        const token = localStorage.getItem('token');
        const reference = loadQuery(environment, ContactsProfileDataQuery, { uuid, token });
        
        setQueryReference(reference);
    }, []);
    
    return (
        <div style={nameBlockStyle}>
            <div style={nameTextStyle}>
                Your name
            </div>
            <br />
            <div style={nameContentStyle}>
                <div style={nameContentLeft}>
                {queryReference != null ? 
                    <ContactsProfileBodyField
                    query={ContactsProfileDataQuery}
                    queryReference={queryReference}
                    selection='username' /> : 'loading...'}
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
                    {queryReference != null ? 
                        <ContactsProfileBodyField
                        query={ContactsProfileDataQuery}
                        queryReference={queryReference}
                        selection='bio' /> : 'loading...'}
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
    )
}

export { ContactsProfileData }