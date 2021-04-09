import * as React from "react";
import { Container, HeaderPrimary, Video } from "./Heading.style";
import Button from "../components/Button";
import { useEffect, useRef, useState } from "react";

interface HeadingProps {
  children: React.ReactNode;
}

const Heading = (props: HeadingProps) => {
  const videoRef = useRef(null);
  const [option, setOption] = useState("PAUSE");
  const [gray, setGray] = useState(false);
  const [blurState, setBlurState] = useState(false);

  const [counterSec, setCounterSec] = useState("00");
  const [counterMin, setCounterMin] = useState("00");
  const [counter, setCounter] = useState(0);
  const [isPlayed, setIsPlayed] = useState(
    !videoRef?.current?.paused ?? "false"
  );

  useEffect(() => {
    if (!isPlayed) return;
    const timerId = setInterval(() => {
      const secondCounter = counter % 60;
      const minuteCounter = Math.floor(counter / 60);

      const computedSecond =
        String(secondCounter).length === 1
          ? `0${secondCounter}`
          : String(secondCounter);
      const computedMinute =
        String(minuteCounter).length === 1
          ? `0${minuteCounter}`
          : String(minuteCounter);

      setCounterSec(computedSecond);
      setCounterMin(computedMinute);
      setCounter(counter + 1);
    }, 1000);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(timerId);
  }, [counter, isPlayed]);

  const playButton = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setOption("PAUSE");
    } else {
      videoRef.current.pause();
      setOption("PLAY");
    }
    setIsPlayed(!isPlayed);
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const manageGray = () => {
    console.log(gray);
    setGray(!gray);
  };

  const manageBlur = () => {
    console.log(blurState);
    setBlurState(!blurState);
  };

  return (
    <Container>
      <HeaderPrimary>{props.children}</HeaderPrimary>
      <Button title={option} onClick={() => playButton()} />
      <Button
        title={gray ? "DISABLE GRAY" : "ALLOW GRAY"}
        onClick={() => manageGray()}
      />
      {/* <Button title={"STOP"} onClick={() => videoRef?.current?.stop} /> */}
      <Button title={"BLUR"} onClick={() => manageBlur()} />
      <Video grayScale={gray} blur={blurState}>
        <video ref={videoRef} />
      </Video>
      <div>{`${counterMin} : ${counterSec}`}</div>
    </Container>
  );
};

export { Heading };
