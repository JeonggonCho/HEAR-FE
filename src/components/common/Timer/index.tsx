import {FC, useEffect, useState} from "react";

import {TimerContainer} from "@components/common/Timer/style.ts";

import {ITimerProps} from "@/types/componentProps.ts";

const Timer:FC<ITimerProps> = ({defaultTime = 180, action, resetTrigger}) => {
    const [time, setTime] = useState<number>(defaultTime);

    useEffect(() => {
        setTime(defaultTime);
    }, [resetTrigger, defaultTime]);

    // 타이머 작동 로직
    useEffect(() => {
        if (time === 0) {
            action();
            return; // 시간이 0이면 타이머를 멈춤
        }

        const timer = setInterval(() => {
            setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [time, action]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <TimerContainer>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</TimerContainer>
    );
};

export default Timer;