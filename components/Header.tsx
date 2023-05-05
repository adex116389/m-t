import {
  Box,
  Flex,
  Link,
  Image,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Box>
      <Box>
        <Box>
          <Box m={`unset`}>
            <Box>
              <Box>
                <Box my={0}>
                  <Flex
                    h={`70px`}
                    justifyContent={`flex-start`}
                    bg={`linear-gradient(180deg, #469e37 0%, #408253 40%, #007b55 70%)`}
                    alignItems={`center`}
                    pos={`relative`}
                    w={`100%`}
                  >
                    <Flex
                      justifyContent={`center`}
                      pos={`absolute`}
                      bottom={`50%`}
                      right={`50%`}
                      transform={`translate(50%, 50%)`}
                      order={2}
                    >
                      <Link
                        textDecor={`none`}
                        fontSize={`16px`}
                        color={`#007856`}
                        bgColor={`transparent`}
                      >
                        <Image
                          src={`/assets/images/white-logo.png`}
                          alt={`М&Т Ваnk Homepage`}
                          h={`30px`}
                        />
                      </Link>
                    </Flex>
                    <UnorderedList
                      display={`flex`}
                      m={`0 25px`}
                      p={0}
                      listStyleType={`none`}
                      order={1}
                    >
                      {[
                        `Personal`,
                        `Business`,
                        `Commercial`,
                        `People's United`,
                      ].map((item) => (
                        <ListItem key={item} fontSize={`16px`}>
                          <Link
                            fontFamily={`Balto-Book, sans-serif`}
                            fontWeight={400}
                            fontStyle={`normal`}
                            color={`#fff`}
                            fontSize={`19px`}
                            m={`0 15px`}
                            textDecor={`none`}
                            bgColor={`transparent`}
                            _hover={{
                              borderBottomWidth: `2px`,
                              borderBottomStyle: `solid`,
                              borderLeft: `none`,
                              borderRight: `none`,
                              borderTop: `none`,
                              borderBottomColor: `#ebca2a`,
                            }}
                            _focus={{
                              borderBottomWidth: `2px`,
                              borderBottomStyle: `solid`,
                              borderLeft: `none`,
                              borderRight: `none`,
                              borderTop: `none`,
                              borderBottomColor: `#ebca2a`,
                            }}
                          >
                            {item}
                          </Link>
                        </ListItem>
                      ))}
                    </UnorderedList>
                    <Link
                      top={`unset`}
                      pos={`absolute`}
                      right={`35px`}
                      w={`100%`}
                      h={`100%`}
                      maxW={`32px`}
                      maxH={`25px`}
                      ml={`30px`}
                      overflow={`hidden`}
                      cursor={`pointer`}
                      order={4}
                      fontSize={`16px`}
                      color={`#007856`}
                      bgColor={`transparent`}
                      sx={{
                        ":hover > .icon-hamburger-menu": {
                          stroke: `#ceead5 !important`,
                        },
                      }}
                    >
                      <HamburgerIcon />
                    </Link>
                  </Flex>
                </Box>
              </Box>
              <Box>
                <Box my={0} display={`none`}>
                  <Box>
                    <Box>
                      <Box h={`100%`} w={`100%`}>
                        <Box>
                          <Flex
                            pt={`38px`}
                            p={`0 120px`}
                            justifyContent={`center`}
                          >
                            <Box textAlign={`left`} maxW={`1200px`} w={`100%`}>
                              <Flex
                                px={0}
                                p={0}
                                m={0}
                                flex={`0 0 100%`}
                                maxW={`100%`}
                              >
                                <Flex
                                  mt={0}
                                  fontSize={`24px`}
                                  lineHeight={`30px`}
                                  display={`flex`}
                                  w={`100%`}
                                >
                                  <Flex
                                    my={0}
                                    mt={0}
                                    fontSize={`24px`}
                                    lineHeight={`30px`}
                                    display={`flex`}
                                    w={`100%`}
                                  >
                                    <Box flex={`0 0 75%`} maxW={`75%`}>
                                      <Box>
                                        <Logo />
                                      </Box>
                                      <UnorderedList
                                        pos={`relative`}
                                        minH={`60vh`}
                                        listStyleType={`none`}
                                        p={0}
                                      >
                                        {[
                                          `Personal`,
                                          `Business`,
                                          `Commercial`,
                                          `Español`,
                                          `People's United`,
                                        ].map((item) => (
                                          <ListItem
                                            key={item}
                                            m={`1.5rem 0`}
                                            fontSize={`16px`}
                                          >
                                            <Link
                                              fontSize={`38px`}
                                              textDecor={`none`}
                                              color={`#555`}
                                            >
                                              {item}
                                            </Link>
                                          </ListItem>
                                        ))}
                                      </UnorderedList>
                                      <UnorderedList
                                        display={`none`}
                                        pb={`25px`}
                                        w={`80%`}
                                        mb={`20px`}
                                        listStyleType={`none`}
                                      >
                                        <UnorderedList
                                          display={`flex`}
                                          listStyleType={`none`}
                                          mb={`40px`}
                                          pl={0}
                                          justifyContent={`center`}
                                          gap={`60px`}
                                        >
                                          {[
                                            {
                                              component: <SearchIcon />,
                                              text: `Search`,
                                            },
                                            {
                                              component: <LocationIcon />,
                                              text: `Locations`,
                                            },
                                            {
                                              component: <QuestionMarkIcon />,
                                              text: `Help Center`,
                                            },
                                          ].map(({ component, text }) => (
                                            <ListItem
                                              key={text}
                                              fontSize={`16px`}
                                            >
                                              <Link
                                                fontFamily={`Balto-Light, sans-serif`}
                                                fontWeight={200}
                                                fontStyle={`normal`}
                                                color={`#007856`}
                                                fontSize={`14px`}
                                                lineHeight={`17px`}
                                                h={`25px`}
                                                textDecor={`none`}
                                                display={`block`}
                                                textAlign={`center`}
                                              >
                                                {component}
                                                <Box pt={`10px`}>{text}</Box>
                                              </Link>
                                            </ListItem>
                                          ))}
                                        </UnorderedList>
                                        <ListItem fontSize={`16px`} />
                                      </UnorderedList>
                                    </Box>
                                    <Box
                                      flex={`0 0 40%`}
                                      maxW={`40%`}
                                      borderLeft={`1px solid #d8d8d8`}
                                      pl={`50px`}
                                    >
                                      <Box>
                                        <Box my={0}>
                                          <Link
                                            bg={`#fff`}
                                            color={`#007856`}
                                            border={`1px solid #007856`}
                                            p={`10px 40px`}
                                            display={`flex`}
                                            alignItems={`center`}
                                            fontWeight={`bold`}
                                            textDecor={`none`}
                                            letterSpacing={`1px`}
                                          >
                                            <Box
                                              as={`span`}
                                              maxW={`100%`}
                                              overflow={`hidden`}
                                              textOverflow={`ellipsis`}
                                              whiteSpace={`nowrap`}
                                              m={`auto`}
                                            >
                                              Log In
                                            </Box>
                                          </Link>
                                        </Box>
                                      </Box>
                                      <Box>
                                        <Box my={0}></Box>
                                      </Box>
                                    </Box>
                                  </Flex>
                                </Flex>
                              </Flex>
                            </Box>
                          </Flex>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const HamburgerIcon = () => (
  <svg
    className="icon-hamburger-menu"
    role="img"
    aria-hidden="true"
    style={{
      width: `36px`,
      height: `25px`,
      stroke: `#fff`,
      overflow: `hidden`,
    }}
  >
    <title>Navigation Menu</title>
    <use xlinkHref="#icon-hamburger-menu"></use>
  </svg>
);

const Logo = () => (
  <svg
    className="navigation-logo"
    aria-hidden="true"
    style={{
      fill: `#007856`,
      height: `34px`,
      width: `174px`,
      marginBottom: `20px`,
    }}
  >
    <use xlinkHref="#logo"></use>
  </svg>
);

const SearchIcon = () => (
  <svg
    className="navigation-icon -icon-magnifying-glass"
    aria-hidden="true"
    style={{
      width: `20px`,
      height: `20px`,
      marginRight: `8px`,
    }}
  >
    <use xlinkHref="#icon-magnifying-glass"></use>
  </svg>
);

const LocationIcon = () => (
  <svg className="navigation-icon -icon-location-pin" aria-hidden="true">
    <use xlinkHref="#icon-location-pin"></use>
  </svg>
);

const QuestionMarkIcon = () => (
  <svg className="navigation-icon -icon-question-mark" aria-hidden="true">
    <use xlinkHref="#icon-question-mark"></use>
  </svg>
);
