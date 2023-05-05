import { Box, Flex, Text, Link, Image } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box
      as={`footer`}
      h={`14.25rem`}
      pos={`absolute`}
      left={0}
      right={0}
      bottom={0}
      overflow={`hidden`}
      bgColor={`#efefef`}
      fontSize={`.625rem`}
      w={`100%`}
      textAlign={`center`}
    >
      <Flex
        h={`14.25rem`}
        px={`.5rem`}
        justifyContent={`center`}
        alignItems={`center`}
        alignContent={`center`}
        flexFlow={`row wrap`}
      >
        <Box p={0} alignSelf={`stretch`} m={`0 1rem`} mb={`1.25rem`}>
          {[
            `Get Started Guide`,
            `Security Assistance`,
            `Digital Service Agreement`,
            `ESign Agreement`,
            `Accessibility`,
            `mtb.com`,
          ].map((item, index, array) => (
            <Link
              key={item}
              fontSize={`.75rem`}
              lineHeight={`200%`}
              p={`0 0.5rem`}
              borderRight={
                index !== array.length - 1 ? `1px solid #d7d7d7` : `none`
              }
              textDecor={`underline`}
              fontWeight={300}
              color={`#007856`}
              cursor={`pointer`}
              bgColor={`transparent`}
              _hover={{
                color: `#00674a`,
              }}
              _focus={{
                color: `#00674a`,
              }}
            >
              {item}
            </Link>
          ))}
        </Box>
        <Box
          m={0}
          p={0}
          px={`.5rem`}
          flex={`0 0 auto`}
          minH={0}
          minW={0}
          w={`100%`}
        >
          <Text
            as={`p`}
            m={0}
            p={0}
            mb={`1rem`}
            fontSize={`inherit`}
            lineHeight={1.25}
            style={{
              textRendering: `optimizeLegibility`,
            }}
          >
            ©{new Date().getFullYear()} М&Т Ваnk. All Rights Reserved.{" "}
            <Box as={`br`} />
            Users of this website agree to be bound by the provisions of the М&Т
            website{` `}
            <Link
              textDecor={`underline`}
              fontWeight={300}
              color={`#007856`}
              cursor={`pointer`}
            >
              Terms of Use
            </Link>
            {` and `}
            <Link
              textDecor={`underline`}
              fontWeight={300}
              color={`#007856`}
              cursor={`pointer`}
            >
              Privacy Policy
            </Link>
            .
          </Text>
          <Box
            m={0}
            p={0}
            display={`inline-block`}
            mb={`1rem`}
            textDecor={`none`}
          >
            <Link
              textDecor={`underline`}
              fontWeight={300}
              color={`#007856`}
              cursor={`pointer`}
            >
              <Image
                src={`/assets/images/mtb-equalhousinglender.svg`}
                alt={`Equal Housing Lender`}
                mr={`1rem`}
                w={`1.875rem`}
                border={0}
                display={`inline-block`}
                verticalAlign={`middle`}
                max-width={`100%`}
                height={`auto`}
              />
            </Link>
            <Link
              textDecor={`underline`}
              fontWeight={300}
              color={`#007856`}
              cursor={`pointer`}
            >
              <Image
                src={`/assets/images/mtb-entrust.svg`}
                alt={`Entrust`}
                w={`5.625rem`}
                border={0}
                display={`inline-block`}
                verticalAlign={`bottom`}
                max-width={`100%`}
                height={`auto`}
              />
            </Link>
          </Box>
          <Text
            as={`p`}
            m={0}
            fontSize={`inherit`}
            lineHeight={1.25}
            style={{
              textRendering: `optimizeLegibility`,
            }}
          >
            Equal Housing Lender. NMLS #381076{` `}
            <Link
              textDecor={`underline`}
              fontWeight={300}
              color={`#007856`}
              cursor={`pointer`}
              bgColor={`transparent`}
            >
              Member FDIC.
            </Link>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
