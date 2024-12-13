import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import MapModal from "@components/common/Modal/MapModal.tsx";
import {CncReservationForm} from "@components/reservation/CncReservationForm";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {ImageWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import cnc from "@assets/images/cnc.png";
import mapIcon from "@assets/icons/map.svg";
import Icon from "@components/common/Icon";


const ReservationCnc = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.cncReservationHeader[lang]}/>

            <Header bgColor={true}>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.cncReservationHeader[lang]}</h2>
                    </Header.Center>
                    <Header.Right>
                        <MapModal
                            trigger={<Icon svg={mapIcon} isHovered={true}/>}
                            machine={"cnc"}
                        />
                    </Header.Right>
                </Grid>
            </Header>

            <ImageWrapper>
                <img src={cnc} alt={"cnc"}/>
            </ImageWrapper>

            <CncReservationForm/>
        </>
    );
};

export default ReservationCnc;