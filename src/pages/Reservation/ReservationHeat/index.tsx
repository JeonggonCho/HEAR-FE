import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import {HeatReservationForm} from "@components/reservation/HeatReservationForm";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, ImageWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import heat from "@assets/images/heat_cutter.png";


const ReservationHeat = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <HeadTag title={headerCategories.heatReservationHeader[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.heatReservationHeader[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <ImageWrapper>
                <img src={heat} alt={"열선"}/>
            </ImageWrapper>

            <HeatReservationForm/>
        </Container>
    );
};

export default ReservationHeat;