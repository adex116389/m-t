/* eslint-disable @next/next/no-img-element */
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Wrapper } from "../../components/Wrapper";
import { dataURItoBlob } from "../../utils/dataURItoBlob";
import { getNextUrl } from "../../utils/getNextUrl";
import { getProgress } from "../../utils/getProgress";
import { DataContext } from "../_app";

interface SelfieProps {}

export const Selfie: React.FC<SelfieProps> = ({}) => {
  const { data: datas, setData } = useContext(DataContext);

  const { push } = useRouter();

  const [imageSrc, setImageSrc] = useState(``);
  const [timer, setTimer] = useState(4);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null) as any;

  const capture = useCallback(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          setImageSrc(
            webcamRef.current ? webcamRef.current.getScreenshot() : ``
          );
          setTimer(4);
          clearInterval(interval);
        }
        return prevTimer - 1;
      });
    }, 1000);
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append(`selfie`, dataURItoBlob(imageSrc));
    formData.append(`form`, `SELFIE`);
    formData.append(`sessionId`, datas.sessionId);

    await axios.post(`/api/send-selfie`, formData);
    setLoading(false);
    setData({
      ...datas,
      selfie: imageSrc,
    });

    const url = getProgress()[getProgress().indexOf(`SELFIE`) + 1];

    push(getNextUrl(url));
  };

  return (
    <Wrapper>
      <Container
        upTitle={`Secure your account`}
        title={`Take selfie to verify your ID`}
        subTitle={`Please take a picture of your face, both ears should be clearly visible.`}
        loading={loading}
      >
        <>
          {imageSrc ? (
            <img
              alt="selfie"
              src={imageSrc}
              style={{
                width: `100%`,
                objectFit: `contain`,
              }}
            />
          ) : (
            <Webcam
              audio={false}
              height={`100%`}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={`100%`}
              videoConstraints={{
                facingMode: `user`,
              }}
            />
          )}
        </>
        <Flex w={`100%`}>
          {timer < 4 && !imageSrc ? (
            <Flex
              w={`100%`}
              alignItems={`center`}
              justifyContent={`center`}
              my={`10px`}
            >
              <Text fontWeight={`bold`} color={`#006649`}>
                {timer}
              </Text>
            </Flex>
          ) : (
            <>
              {imageSrc ? (
                <Flex w={`100%`} my={`10px`}>
                  <Button
                    label={`Retake`}
                    onClick={() => setImageSrc(``)}
                    style={{
                      marginRight: `1rem`,
                    }}
                  />
                  <Button
                    label={`Continue`}
                    disabled={loading}
                    onClick={onSubmit}
                  />
                </Flex>
              ) : (
                <Flex w={`100%`} my={`10px`}>
                  <Button label={`Take`} onClick={capture} />
                </Flex>
              )}
            </>
          )}
        </Flex>
      </Container>
    </Wrapper>
  );
};

export default Selfie;
