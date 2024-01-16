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
        smallSize: 'calc(0.55dvw + 0.55dvh)'
    },
    shapes: {
        headerHeight: '2em',
        headderPaddingInline: '0.5em'
    }
} as const;

export { defaultTheme }