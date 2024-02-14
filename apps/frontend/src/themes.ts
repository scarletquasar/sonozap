const defaultTheme = {
    colors: {
        primary: '#202C33',
        secondary: '#111B21',
        divisory: '0.4px solid rgba(255,255,255, 0.2)',
        primaryText: '#008069',
        secondaryText: 'rgba(255,255,255, 0.5)',
    },
    font: {
        normalSize: 'calc(1dvw + 1dvh)',
        smallSize: 'calc(0.55dvw + 0.55dvh)',
        smallerSize: 'calc(0.45dvw + 0.45dvh)',
        messageItemFamily: 'Helvetica'
    },
    shapes: {
        messageViewerHeight: '86%',
        messageBoxHeight: '8%',
        messageItemBorderRadius: '0.85em',
        headerHeight: '6%',
        headderPaddingInline: '0.5em',
    }
} as const;

export { defaultTheme }