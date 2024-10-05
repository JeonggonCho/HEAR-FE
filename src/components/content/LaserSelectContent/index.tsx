import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import Select from "@components/common/Select";
import Button from "@components/common/Button";

import {ILaserSelectContentProps} from "@/types/componentProps.ts";
import {useUserDataStore} from "@store/useUserStore.ts";
import {laserTimeSchema} from "@schemata/machineSchema.ts";
import {buttonLabels, inputLabels} from "@constants/langCategories.ts";

import {Container, CountOfLaserPerDayWrapper, CountOfLaserPerWeekWrapper, CountOfLaserWrapper} from "./style.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

const LaserSelectContent:FC<ILaserSelectContentProps> = ({laserInfo, laserTimesInfo, reservationList, setReservationList, setShowModal}) => {
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    const [countOfLaserPerWeek, setCountOfLaserPerWeek] = useState<number>((userData && userData.countOfLaserPerWeek - reservationList.length) || 0);
    const [countOfLaserPerDay, setCountOfLaserPerDay] = useState<number>((userData && userData.countOfLaserPerDay - reservationList.length) || 0);

    type LaserTimeFormData = z.infer<typeof laserTimeSchema>;

    const {register, handleSubmit, formState:{errors}, getValues, setValue, watch} = useForm<LaserTimeFormData>({
        resolver: zodResolver(laserTimeSchema),
        defaultValues: {
            laser: "",
            times: [],
        }
    });

    // `reservationList`에 있는 시간들을 미리 체크된 상태로 추가하기
    useEffect(() => {
        if (reservationList.length > 0) {
            const reservedTimes = reservationList.map(reservation => `${reservation.laserId} ${reservation.timeId}`);
            setValue("times", reservedTimes);  // 예약된 시간들을 기본값으로 설정
        }
    }, [reservationList, setValue]);

    // 레이저 커팅기 기기 목록
    const laserCategories = useMemo(() => laserInfo.map((value:any) => (
        {
            label: value.laserName,
            value: value.laserId,
            id: value.laserId,
            status: !value.laserStatus,
        }
    )), [laserInfo]);

    // 선택 된 레이저 커팅기와 시간 목록
    const selectedLaser = watch("laser");
    const selectedTimes = watch("times");

    // 선택된 레이저 커팅기의 시간목록 가져오기
    const laserTimes = laserTimesInfo.filter((value) => value.laserId === selectedLaser) || [];

    // 시간 목록
    const timeCategories = useMemo(() => {
        const currentTimes = getValues("times") || []; // 현재 times에 들어있는 시간 목록
        const maxAllowedTimes = Math.min(countOfLaserPerWeek, countOfLaserPerDay); // 오늘 횟수와 이번 주 횟수 중 작은 것 선택

        return laserTimes.map((value) => {
            const isTimeSelected = currentTimes.includes(`${value.laserId} ${value.timeId}`); // 현재 선택되어있는지 확인
            const isDisabled = !isTimeSelected && (maxAllowedTimes <= 0); // 선택 안 되었고, 현재 시간 선택 가능 횟수가 0 이하이면, disabled
            return {
                label: value.timeContent,
                value: `${value.laserId} ${value.timeId}`,
                id: `${value.laserId} ${value.timeId}`,
                status: !value.timeStatus || isDisabled,
            };
        });
    }, [laserTimes, countOfLaserPerWeek, countOfLaserPerDay, getValues]);

    // 시간 선택 핸들러
    const handleTimeChange = (timeId: string) => {
        const currentTimes = getValues("times") || [];
        const maxAllowedTimes = Math.min(countOfLaserPerWeek, countOfLaserPerDay);

        if (currentTimes.includes(timeId)) {
            setValue("times", currentTimes.filter((id: string) => id !== timeId));
            setCountOfLaserPerWeek(prevState => prevState + 1);
            setCountOfLaserPerDay(prevState => prevState + 1);
        } else {
            if (maxAllowedTimes > 0) {
                setValue("times", [...currentTimes, timeId]);
                setCountOfLaserPerWeek(prevState => prevState - 1);
                setCountOfLaserPerDay(prevState => prevState - 1);
            }
        }
    };

    const submitHandler: SubmitHandler<LaserTimeFormData> = useCallback(async (data) => {
        // 선택된 레이저 커팅기 및 시간 가져오기
        const selectedInfo = data.times.map(value => ({
            laserId: value.split(" ")[0],
            timeId: value.split(" ")[1],
        }));

        // 기존 예약 목록에 추가
        setReservationList(selectedInfo);

        // 모달 닫기
        setShowModal(false);
    }, [laserInfo, setReservationList, setShowModal]);

    return (
        <Container onSubmit={handleSubmit(submitHandler)}>
            <CountOfLaserWrapper>
                <label>{inputLabels.countOfLaser[lang]}</label>
                <div>
                    <CountOfLaserPerDayWrapper count={countOfLaserPerDay}>
                        <span>{inputLabels.today[lang]}</span>
                        <span>{countOfLaserPerDay}</span>
                    </CountOfLaserPerDayWrapper>
                    <CountOfLaserPerWeekWrapper count={countOfLaserPerWeek}>
                        <span>{inputLabels.week[lang]}</span>
                        <span>{countOfLaserPerWeek}</span>
                    </CountOfLaserPerWeekWrapper>
                </div>
            </CountOfLaserWrapper>

            <Select
                label={inputLabels.selectMachine[lang]}
                type={"radio"}
                name={"laser"}
                categories={laserCategories}
                register={register}
                errorMessage={errors.laser?.message}
            />

            {/*선택된 레이저 커팅기가 있을 경우 시간목록 보이게 하기*/}
            {selectedLaser &&
              <Select
                label={inputLabels.selectTime[lang]}
                type={"checkbox"}
                name={"times"}
                register={register}
                categories={timeCategories}
                values={selectedTimes}
                onSelectChange={handleTimeChange}
                errorMessage={errors.times?.message}
              />
            }

            <Button
                type={"submit"}
                content={buttonLabels.add[lang]}
                width={"full"}
                color={"primary"}
                scale={"normal"}
            />
        </Container>
    );
};

export default LaserSelectContent;