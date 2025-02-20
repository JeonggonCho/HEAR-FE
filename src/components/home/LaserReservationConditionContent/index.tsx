import Chart from "@components/common/Chart";
import Icon from "@components/common/Icon";
import {useThemeStore} from "@store/useThemeStore.ts";
import useListCollapse from "@hooks/useListCollapse.ts";
import {Container, ReservationListWrapper, ReservationStatusWrapper, TimeStamp} from "./style.ts";
import {MoreWrapper} from "@components/management/MachineManageCard/style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import laser from "@assets/images/laser_cut.png";
import more from "@assets/icons/arrow_down.svg";
import {ILaserStatus} from "@/types/reservation.ts";


interface ILaserReservationConditionContentProps {
    laserStatus: ILaserStatus[];
    rate: number;
    color: "primary" | "green" | "danger" | "orange" | "purple";
}


const LaserReservationConditionContent = ({laserStatus, rate, color}: ILaserReservationConditionContentProps) => {
    const {lang} = useThemeStore();
    const {maxHeight, isOpen, listRef, handleList} = useListCollapse();

    return (
        <Container>
            <div>
                <div>
                    <img src={laser} alt={"레이저 커팅기 이미지"}/>
                </div>
                <h4>{cardCategories.laserReservationCondition[lang]}</h4>
            </div>

            <span>2025.02.05</span>

            <div>
                <Chart
                    containerHeight={"5rem"}
                    containerWidth={"11rem"}
                    labelOffset={-24}
                    valueOffset={-10}
                    labels={[cardCategories.reservationRate[lang]]}
                    values={[rate]}
                    type={"radialBar"}
                    startAngle={-90}
                    endAngle={90}
                    colors={[color]}
                />
            </div>

            <ReservationListWrapper
                ref={listRef}
                isOpen={isOpen}
                maxHeight={isOpen ? `${maxHeight}px` : "0"}
            >
                {laserStatus.map((value, index) =>
                    (
                        <ReservationStatusWrapper key={index}>
                            <label>{value.name}</label>
                            <div>
                                {value.times.map((time, index) => (
                                    <TimeStamp key={index} status={time.status}>{time.timeContent}</TimeStamp>
                                ))}
                            </div>
                        </ReservationStatusWrapper>
                    )
                )}
            </ReservationListWrapper>

            <div onClick={handleList}>
                <p>{buttonCategories.reservationStatus[lang]}</p>
                <MoreWrapper isOpen={isOpen}>
                    <Icon svg={more}/>
                </MoreWrapper>
            </div>
        </Container>
    );
};

export default LaserReservationConditionContent;