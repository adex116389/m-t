import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Box m={0} p={0} mt={`-1.5rem`} mb={`1.5rem`} bgColor={`#fff1d0`}>
      <Box p={0} maxW={`41.5rem`} m={`0 auto`}>
        <Box
          p={`1rem 1rem 1rem 1rem`}
          pl={`40px`}
          border={`none`}
          bgColor={`#fff1d0`}
          color={`#333`}
          pos={`static`}
          m={`0 0 1rem 0`}
          mb={0}
          borderRadius={0}
        >
          <Box
            as={`i`}
            m={0}
            // mt={`0.0625rem`}
            ml={`-24px`}
            float={`left`}
            color={`#ffb300`}
            fontFamily={`"М&Т PG Custom Font"`}
            display={`inline-block`}
            fontStyle={`normal`}
            fontWeight={`normal`}
            textTransform={`none`}
            // lineHeight={1}
            _before={{
              content: `""`,
            }}
            style={{
              fontVariant: `normal`,
            }}
          >
            <Text
              as={`span`}
              pos={`absolute`}
              w={`1px`}
              h={`1px`}
              p={0}
              overflow={`hidden`}
              whiteSpace={`nowrap`}
              border={0}
              style={{
                clip: `rect(0,0,0,0)`,
              }}
            >
              Notification Icon
            </Text>
          </Box>
          {` ${message}`}
        </Box>
      </Box>
    </Box>
  );
};
