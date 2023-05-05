import React, { useState } from "react";
import { Input, Text } from "@chakra-ui/react";

interface CheckboxProps {}

export const Checkbox: React.FC<CheckboxProps> = ({}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <Input
        variant={`unstyled`}
        pos={`absolute`}
        top={`-2px`}
        w={`16px`}
        opacity={0}
        h={`16px !important`}
        zIndex={10}
        boxSizing={`border-box`}
        overflow={`visible`}
        p={0}
        fontFamily={`sans-serif`}
        fontSize={`100%`}
        lineHeight={1.15}
        m={0}
        type={`checkbox`}
      />
      <Text
        as={`label`}
        fontSize={`14px`}
        _before={{
          content: `""`,
          display: ` inline-block`,
          verticalAlign: `sub`,
          w: `16px`,
          height: `16px`,
          bg: `white`,
          border: `1px solid rgb(85, 85, 85)`,
          mr: `8px`,
        }}
        _after={
          isChecked
            ? {
                content: `""`,
                pos: `absolute`,
                left: `3px`,
                top: `11px`,
                bg: `rgb(0, 120, 86)`,
                w: `2px`,
                h: `2px`,
                boxShadow: `rgb(0 120 86) 2px 0px 0px, rgb(0 120 86) 4px 0px 0px, rgb(0 120 86) 4px -2px 0px, rgb(0 120 86) 4px -4px 0px, rgb(0 120 86) 4px -6px 0px, rgb(0 120 86) 4px -8px 0px`,
                transform: `rotate(45deg)`,
              }
            : {}
        }
        onClick={() => {
          setIsChecked(!isChecked);
        }}
      >
        Remember User ID
      </Text>
    </>
  );
};
