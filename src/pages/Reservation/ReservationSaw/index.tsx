import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import {SawReservationForm} from "@components/reservation/SawReservationForm";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {ImageWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import saw from "@assets/images/saw.png";


const ReservationSaw = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.sawReservationHeader[lang]}/>

            <Header bgColor={true}>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.sawReservationHeader[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <ImageWrapper>
                <img src={saw} alt={"톱"}/>
            </ImageWrapper>

            <SawReservationForm/>
        </>
    );
};

export default ReservationSaw;