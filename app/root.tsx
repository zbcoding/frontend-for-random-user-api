
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData
} from "remix";
import type { MetaFunction } from "remix";
import { Box, ChakraProvider, CSSReset, Heading } from '@chakra-ui/react'
import theme from "~/theme";


export const meta: MetaFunction = () => {
  return { title: "Person App" };
};

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}


function Document({
  children,
  title = "App title"
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <Document title='Error!'>
        <ChakraProvider >
          <Box>
            <Heading as='h1'>There was an error</Heading>
          </Box>
        </ChakraProvider>
      </Document>
    </div>

  )
}

export function CatchBoundary() {
  let caught = useCatch()

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ChakraProvider>
        <Box>
          <Heading as='h1'>
            {caught.status} {caught.statusText}
          </Heading>
        </Box>
      </ChakraProvider>
    </Document>
  )
}


