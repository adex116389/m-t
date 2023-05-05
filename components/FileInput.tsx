import { Box } from "@chakra-ui/react";
import React, { useRef } from "react";
import { UseFormRegister, FieldValues, UseFormWatch } from "react-hook-form";
import Image from "next/image";
import { Input } from "./InputAlt";

interface FileInputProps {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: {
    [x: string]: any;
  };
  name: string;
  label: string;
  placeholder?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  register,
  watch,
  errors,
  name,
  label,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register(name);
  return (
    <Box {...props}>
      {watch(name) && watch(name).length ? (
        <Image
          alt={name}
          src={URL.createObjectURL(watch(name)[0])}
          height={`100px`}
          width={`100px`}
          layout={`fixed`}
          objectFit={`contain`}
        />
      ) : null}
      <Box
        sx={{
          position: `relative`,
        }}
      >
        <input
          type={`file`}
          accept={`image/*`}
          style={{
            position: `absolute`,
            width: `100%`,
            height: `100%`,
            cursor: `pointer`,
            zIndex: 1,
            opacity: 0,
          }}
          onFocus={() => console.log(`Focused: ${name}`)}
          {...rest}
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
        />
        <Input
          name={name}
          label={label}
          error={errors[name] && errors[name].message}
          defaultValue={
            watch(name) && watch(name).length ? watch(name)[0].name : ``
          }
        />
      </Box>
    </Box>
  );
};
