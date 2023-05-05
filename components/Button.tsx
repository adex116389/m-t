import {
  Box,
  Flex,
  Button as CButton,
  ButtonProps as CButtonProps,
  FlexProps,
} from "@chakra-ui/react";
import React from "react";

interface ButtonProps extends CButtonProps {
  label: string;
  boxProps?: FlexProps;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  boxProps,
  ...props
}) => {
  return (
    <Flex
      as={`section`}
      flexFlow={`row wrap`}
      px={[0, `.5rem`]}
      mb={`2.375rem`}
      w={`100%`}
      {...boxProps}
    >
      <Box
        m={0}
        p={0}
        px={`.5rem`}
        flex={`0 0 auto`}
        minH={0}
        minW={0}
        w={`100%`}
      >
        <CButton
          variant={`unstylled`}
          textDecor={`none`}
          fontWeight={500}
          display={`block`}
          w={[`100%`, `66.66667%`]}
          m={`0 0 1rem 0`}
          ml={`auto`}
          mr={`auto`}
          mb={`1rem`}
          verticalAlign={`middle`}
          p={`0.8125rem 1.5625rem 0.8125rem 1.5625rem`}
          border={`1px solid transparent`}
          borderRadius={`0.3125rem`}
          transition={`background-color .25s ease-out,color .25s ease-out`}
          fontFamily={`inherit`}
          fontSize={`1rem`}
          lineHeight={1}
          textAlign={`center`}
          cursor={`pointer`}
          bgColor={`#007856`}
          color={`#fff`}
          textTransform={`none`}
          overflow={`visible`}
          h={`auto`}
          _disabled={{
            bgColor: `#006649`,
            color: `#fff`,
          }}
          _hover={{
            bgColor: `#006649`,
            color: `#fff`,
          }}
          _focus={{
            bgColor: `#006649`,
            color: `#fff`,
            textDecor: `underline`,
          }}
          {...props}
        >
          {label}
        </CButton>
      </Box>
    </Flex>
  );
};
