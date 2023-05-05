import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/Loader.module.css";

interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <Flex
      w={`100%`}
      h={`100vh`}
      pos={`fixed`}
      bgColor={`rgba(0 ,0 ,0, .7)`}
      zIndex={9999}
      top={0}
      alignItems={`center`}
      justifyContent={`center`}
    >
      <Box className={styles.loader} />
    </Flex>
  );
};
