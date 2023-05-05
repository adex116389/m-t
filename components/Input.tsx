import { Box, Text, Input as CInput } from "@chakra-ui/react";
import React, { useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  register?: UseFormRegister<FieldValues>;
  registerOptions?: any;
  mask?: string;
  curValue?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  error,
  register = () => ({}),
  registerOptions,
  curValue,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Box mt={`32px`} pos={`relative`}>
      <Text
        as={`label`}
        top={isFocused ? `-21px` : `7px`}
        fontSize={isFocused ? `14px` : `16px`}
        pos={`absolute`}
        left={`8px`}
        transition={`0.5s`}
      >
        {label}
      </Text>
      <CInput
        variant={`unstyled`}
        fontFamily={`Balto-Light, sans-serif`}
        fontWeight={200}
        fontStyle={`normal`}
        m={0}
        w={`100%`}
        borderStyle={`initial`}
        borderColor={`initial`}
        border={`1px solid #d8d8d8`}
        p={`8px`}
        bgColor={`transparent`}
        color={`#747474`}
        mb={`5px`}
        borderRadius={0}
        overflow={`visible`}
        fontSize={`100%`}
        lineHeight={1.15}
        _focusWithin={{
          outlineColor: `rgb(0, 95, 204)`,
          outlineOffset: `0px`,
          outlineWidth: `1px`,
          outlineStyle: `auto`,
        }}
        onFocus={() => setIsFocused(true)}
        {...register(name, {
          ...registerOptions,
        })}
        {...props}
      />
    </Box>
  );
};
