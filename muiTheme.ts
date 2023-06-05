import { createTheme } from '@mui/material'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0D2C99',
            light: '#3C55AC',
        },
        secondary: {
            main: '#D7D7DC',
        },
        error: {
            main: '#E93434',
        },
        warning: {
            main: '#F9CC2C',
        },
        info: {
            main: '#7EA2D6',
        },
        success: {
            main: '#2EC662',
        },
    },
    typography: {
        fontFamily: '"Poppins", sans-serif',
        h1: {
            fontFamily: '"Nunito Sans", sans-serif',
        },
        h2: {
            fontFamily: '"Nunito Sans", sans-serif',
        },
        h3: {
            fontFamily: '"Nunito Sans", sans-serif',
        },
        h4: {
            fontFamily: '"Nunito Sans", sans-serif',
        },
        h5: {
            fontFamily: '"Nunito Sans", sans-serif',
        },
        h6: {
            fontFamily: '"Nunito Sans", sans-serif',
        },
    },
})
