import { Box, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface CheckboxProps {}

export const Checkbox: React.FC<CheckboxProps> = ({}) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <Box m={0} p={0} flex={`0 0 auto`} minH={0} minW={0} w={`100%`}>
      <Box m={0} p={0} display={`inline-block`}>
        <Input
          type={`checkbox`}
          opacity={0}
          h={0}
          w={0}
          pos={`absolute`}
          p={0}
          overflow={`hidden`}
          whiteSpace={`nowrap`}
          border={0}
          m={`0 0 1rem`}
          fontSize={`100%`}
          lineHeight={1.15}
          style={{
            clip: `rect(0,0,0,0)`,
          }}
        />
        <Text
          as={`label`}
          cursor={`pointer`}
          pos={`relative`}
          pl={`2rem`}
          fontSize={`1rem`}
          color={`#333`}
          lineHeight={1.25}
          m={`1px 0 1rem 0`}
          display={`inline-block`}
          minH={`24px`}
          pt={`2px`}
          mr={`8px`}
          verticalAlign={`baseline`}
          mb={0}
          fontWeight={300}
          _before={{
            content: `""`,
            fontSize: `24px`,
            color: `#007856`,
            pos: `absolute`,
            top: 0,
            left: 0,
            fontFamily: `"М&Т PG Custom Font"`,
            display: `inline-block`,
            speak: `none`,
            fontStyle: `normal`,
            fontWeight: `normal`,
            fontVariant: `normal`,
            textTransform: `none`,
            lineHeight: 1,
            WebkitFontSmoothing: `antialiased`,
          }}
          _after={{
            content: isChecked ? `""` : `""`,
            fontSize: `24px`,
            color: `#007856`,
            pos: `absolute`,
            top: 0,
            left: 0,
            fontFamily: `"М&Т PG Custom Font"`,
            display: `inline-block`,
            speak: `none`,
            fontStyle: `normal`,
            fontWeight: `normal`,
            fontVariant: `normal`,
            textTransform: `none`,
            lineHeight: 1,
            WebkitFontSmoothing: `antialiased`,
          }}
          onClick={() => setChecked(!isChecked)}
        >
          {" "}
          Remember User ID{" "}
        </Text>
      </Box>
    </Box>
  );
};
