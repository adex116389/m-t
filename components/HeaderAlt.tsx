import { Box, Link, Image } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";

interface HeaderAltProps {}

export const HeaderAlt: React.FC<HeaderAltProps> = ({}) => {
  return (
    <>
      <Head>
        <style>
          {`
          html {
              min-height: 100%;
              position: relative;
            }
            body {
              padding-bottom: 14.25rem !important;
              margin: 0;
              padding: 0;
              background: #fff;
              font-family: "Balto-Book",sans-serif;
              font-weight: 300;
              line-height: 1.25;
              color: #333;
              position: unset !important;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
          }
    `}
        </style>
      </Head>
      <Box
        as={`header`}
        mb={`1.5rem`}
        bgColor={`#007856`}
        h={`3.75rem`}
        color={`#fff`}
        borderBottom={`0.375rem solid #f5a623`}
        w={`100%`}
        pos={`relative`}
        textAlign={`center`}
      >
        <Link
          textDecor={`underline`}
          fontWeight={300}
          lineHeight={`inherit`}
          color={`#007856`}
          cursor={`pointer`}
          bgColor={`transparent`}
        >
          <Image
            src={`/assets/images/mtb-logo.svg`}
            alt={`М&Т Ваnk`}
            w={`7.5625rem`}
            pos={`absolute`}
            top={`50%`}
            left={`50%`}
            mr={`-50%`}
            transform={`translate(-50%,-50%)`}
            display={`inline-block`}
            verticalAlign={`middle`}
            maxW={`100%`}
            h={`auto`}
          />
        </Link>
      </Box>
    </>
  );
};
