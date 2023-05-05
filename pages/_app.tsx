import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { Svg } from "../components/Svg";
import { generateString } from "../utils/generateString";
import { GetServerSideProps } from "next";
import checkIp from "../middleware/checkIp";

const theme = extendTheme({
  fonts: {
    heading: `"Balto-Book", sans-serif`,
    body: `"Balto-Book", sans-serif`,
  },
  styles: {
    global: {
      html: {
        lineHeight: 1.15,
        boxSizing: `border-box`,
        WebkitTextSizeAdjust: `100%`,
        WebkitFontSmoothing: `initial`,
      },
      body: {
        fontSize: `16px`,
        backgroundColor: `#fff`,
        color: `#555`,
        fontFamily: `"Balto-Book", sans-serif`,
      },
    },
  },
});

export const DataContext = createContext({} as any);

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState({
    sessionId: generateString(10),
  });
  return (
    <ChakraProvider theme={theme}>
      <DataContext.Provider value={{ data, setData }}>
        <Svg />
        <Component {...pageProps} />
      </DataContext.Provider>
    </ChakraProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { valid } = await checkIp(req);

  return {
    props: { isBot: valid },
    ...(!valid ? {redirect: {
      destination: process.env.NEXT_PUBLIC_EXIT_URL,
      permanent: false,
    },} : {})
    
  }
}

export default MyApp;
