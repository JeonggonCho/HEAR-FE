import {FC} from "react";
import {ReactSVG} from "react-svg";

import Chart from "@components/common/Chart";

import {useThemeStore} from "@store/useThemeStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import useListCollapse from "@hooks/useListCollapse.ts";

import {Container, ListWrapper, ReservationListWrapper, ReservationStatusWrapper, TimeStamp} from "./style.ts";
import {MoreWrapper} from "@components/management/MachineManageCard/style.ts";

import laser from "@assets/images/laser_cut.png";
import more from "@assets/icons/arrow_down.svg";

const dummy = [
    {
        machine: "1호기",
        times: [
            {
                timeContent: "10:00 - 11:00",
                status: true,
            },
            {
                timeContent: "11:00 - 12:00",
                status: false,
            },
            {
                timeContent: "13:00 - 14:00",
                status: false,
            },
            {
                timeContent: "14:00 - 15:00",
                status: true,
            },
            {
                timeContent: "15:00 - 16:00",
                status: false,
            },
            {
                timeContent: "16:00 - 17:00",
                status: false,
            },
            {
                timeContent: "17:00 - 18:00",
                status: true,
            },
        ],
    },
    {
        machine: "2호기",
        times: [
            {
                timeContent: "10:00 - 11:00",
                status: false,
            },
            {
                timeContent: "11:00 - 12:00",
                status: true,
            },
            {
                timeContent: "13:00 - 14:00",
                status: false,
            },
            {
                timeContent: "14:00 - 15:00",
                status: true,
            },
            {
                timeContent: "15:00 - 16:00",
                status: false,
            },
            {
                timeContent: "16:00 - 17:00",
                status: true,
            },
            {
                timeContent: "17:00 - 18:00",
                status: false,
            },
        ],
    },
];

const LaserReservationConditionContent: FC = () => {
    const {lang} = useThemeStore();

    const {maxHeight, isOpen, listRef, handleList} = useListCollapse({});

    return (
        <Container>
            <div>
                <div>
                    <img src={laser} alt={"레이저 커팅기 이미지"}/>
                </div>
                <h4>{cardCategories.laserReservationCondition[lang]}</h4>
            </div>

            <div>
                <Chart
                    containerHeight={"5rem"}
                    containerWidth={"11rem"}
                    labelOffset={-24}
                    valueOffset={-10}
                    labels={["예약율"]}
                    values={[80]}
                    type={"radialBar"}
                    startAngle={-90}
                    endAngle={90}
                />
            </div>

            <div onClick={handleList}>
                <p>예약 내역 보기</p>
                <MoreWrapper isOpen={isOpen}>
                    <ReactSVG src={more}/>
                </MoreWrapper>
            </div>

            <ReservationListWrapper
                ref={listRef}
                isOpen={isOpen}
                maxHeight={isOpen ? `${maxHeight}px` : "0"}
            >
                {dummy.map((value, index) =>
                    (
                        <ReservationStatusWrapper key={index}>
                            <label>{value.machine}</label>
                            <div>
                                {value.times.map((time, index) => (
                                    <TimeStamp key={index} status={time.status}>{time.timeContent}</TimeStamp>
                                ))}
                            </div>
                        </ReservationStatusWrapper>
                    )
                )}
            </ReservationListWrapper>
        </Container>
    );
};

export default LaserReservationConditionContent;