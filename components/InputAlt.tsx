import {
  Flex,
  Text,
  Box,
  Input as CInput,
  InputProps as CInputProps,
  BoxProps,
} from "@chakra-ui/react";
import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps extends CInputProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  register?: UseFormRegister<FieldValues>;
  registerOptions?: any;
  mask?: string;
  curValue?: string;
  boxStyle?: BoxProps;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  error,
  register = () => ({}),
  registerOptions,
  curValue,
  boxStyle,
  ...props
}) => {
  return (
    <Box
      m={0}
      p={0}
      px={`.5rem`}
      flex={`0 0 auto`}
      w={`100%`}
      minH={0}
      minW={0}
      {...boxStyle}
    >
      <Text
        as={`label`}
        display={`block`}
        m={0}
        fontSize={`1rem`}
        fontWeight={300}
        lineHeight={1.5}
        color={`#767676`}
      >
        {label}
      </Text>
      <Flex
        m={0}
        p={0}
        w={`100%`}
        mb={`1rem`}
        alignItems={`stretch`}
        flexDir={`column`}
      >
        <CInput
          variant={`unstyled`}
          display={`block`}
          boxSizing={`border-box`}
          w={`100%`}
          h={`auto`}
          m={`0 0 1rem`}
          p={`0.5rem`}
          border={`0.0625rem solid #767676`}
          borderColor={error ? `#ffb300` : `#767676`}
          borderRadius={0}
          bgColor={`#fff`}
          boxShadow={`none`}
          fontFamily={`inherit`}
          fontSize={`1rem`}
          fontWeight={300}
          lineHeight={1.25}
          color={`#333`}
          appearance={`none`}
          placeholder={placeholder}
          _focusWithin={{
            outlineColor: `rgb(0, 95, 204)`,
            outlineOffset: `0px`,
            outlineWidth: `1px`,
            outlineStyle: `auto`,
          }}
          {...props}
          {...register(name, {
            ...registerOptions,
          })}
        />
        {error ? (
          <Text
            as={`p`}
            mt={`-1rem`}
            bgColor={`#fff1d0`}
            p={`0.625rem 0.9375rem`}
            color={`#333`}
            fontWeight={300}
            mb={`1rem`}
            fontSize={`.875rem`}
            lineHeight={1.25}
            style={{
              textRendering: `optimizeLegibility`,
            }}
          >
            {error}
          </Text>
        ) : null}
      </Flex>
    </Box>
  );
};
