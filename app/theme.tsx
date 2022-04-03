import { extendTheme, theme as defaultTheme } from "@chakra-ui/react";

const theme = extendTheme({
    ...defaultTheme,
    colors:{
        ...defaultTheme.colors,
    },
    fonts:{
        heading: "'Josefin Sans', sans-serif;",
        body: "'Josefin Sans', sans-serif;",
    },
})

export default theme