import { Box, Flex, Text, BoxProps } from "@chakra-ui/react";
import React from "react";
import { Loader } from "./Loader";

interface ContainerProps extends BoxProps {
  upTitle?: string;
  title?: string;
  subTitle?: string;
  loading?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  upTitle,
  title,
  subTitle,
  children,
  loading,
}) => {
  return (
    <>
      {loading ? <Loader /> : null}
      <Box maxW={`41.5rem`} m={`0 auto`} p={0}>
        <Box as={`form`}>
          <Flex as={`section`} flexFlow={`row wrap`} px={`.5rem`}>
            <Flex
              m={0}
              p={0}
              flex={`0 0 auto`}
              minH={0}
              minW={0}
              w={`100%`}
              px={`.5rem`}
            >
              <Box m={0} p={0} mb={`2rem`}>
                {upTitle ? (
                  <Text
                    as={`p`}
                    color={`#333`}
                    m={0}
                    p={0}
                    mb={0}
                    fontSize={`.875rem`}
                    lineHeight={1.25}
                    style={{
                      textRendering: `optimizeLegibility`,
                    }}
                  >
                    {upTitle}
                  </Text>
                ) : null}
                <Text
                  m={0}
                  p={0}
                  as={`h1`}
                  fontSize={`1.75rem`}
                  lineHeight={1.25}
                  color={`#007856`}
                  mt={0}
                  mb={`1rem`}
                  fontStyle={`normal`}
                  fontWeight={300}
                  style={{
                    textRendering: `optimizeLegibility`,
                  }}
                >
                  {title}
                </Text>
                <Text
                  as={`p`}
                  m={0}
                  p={0}
                  mb={0}
                  fontSize={`inherit`}
                  lineHeight={1.25}
                >
                  {subTitle}
                </Text>
              </Box>
            </Flex>
            {children}
          </Flex>
        </Box>
      </Box>
    </>
  );
};
