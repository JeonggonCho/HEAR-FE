import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import MapModal from "@components/common/Modal/MapModal.tsx";
import {VacuumReservationForm} from "@components/reservation/VacuumReservationForm";
import {useThemeStore} from "@store/useThemeStore.ts";
import {ImageWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import vacuum from "@assets/images/vacuum.png";
import mapIcon from "@assets/icons/map.svg";
import Icon from "@components/common/Icon";


const ReservationVacuum = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.vacuumReservationHeader[lang]}/>

            <Header bgColor={true}>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.vacuumReservationHeader[lang]}</h2>
                    </Header.Center>
                    <Header.Right>
                        <MapModal
                            trigger={<Icon svg={mapIcon} isHovered={true}/>}
                            machine={"printer"}
                        />
                    </Header.Right>
                </Grid>
            </Header>

            <ImageWrapper>
                <img src={vacuum} alt={"사출성형기"}/>
            </ImageWrapper>

            <VacuumReservationForm/>
        </>
    );
};

export default ReservationVacuum;