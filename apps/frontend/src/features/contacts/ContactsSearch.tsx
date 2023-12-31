const searchBoxStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const searchIconStyle = {
    width: '8%',
    height: '100%',
    background: '#202C33',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: '0.5em',
    borderBottomLeftRadius: '0.5em'
}

const searchSpanStyle = {
    fontSize: '1.2em'
}

const searchInputStyle = {    
    border: 'none',
    paddingBlock: '3.8%',
    background: '#202C33',
    height: '100%',
    width: '90%'
};

const searchInputWrapperStyle = {
    padding: '3%',
    background: '#202C33',
    borderRadius: '0.5em',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    height: '100%',
    width: '92%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const ContactsSearch = (props: { style: React.CSSProperties }) => {
    return (
        <div style={props.style}>
            <div style={searchBoxStyle}>
                <div style={searchIconStyle}>
                    <span style={searchSpanStyle} className="material-symbols-outlined">
                        search
                    </span>
                </div>
                <div style={searchInputWrapperStyle}>
                    <input style={searchInputStyle} type="text" placeholder="Search or start a new chat" />
                </div>
                
            </div>
            
        </div>
    )
}

export { ContactsSearch }