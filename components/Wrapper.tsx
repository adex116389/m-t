import { Box, Flex, BoxProps } from "@chakra-ui/react";
import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { HeaderAlt } from "./HeaderAlt";

interface WrapperProps extends BoxProps {
  altHeader?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  altHeader = true,
}) => {
  return (
    <Box>
      {altHeader ? <HeaderAlt /> : <Header />}
      <Box display={`block`}>
        <Box>
          <Box>
            <Box>
              <Box>
                <Box>
                  <Flex p={0} justifyContent={`center`}>
                    <Box w={`100%`} maxW={`100%`} textAlign={`left`}>
                      <Flex
                        justifyContent={`center`}
                        maxW={`100%`}
                        w={`100%`}
                        flexDir={`column`}
                      >
                        {children}
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {altHeader ? <Footer /> : null}
    </Box>
  );
};
