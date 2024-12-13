import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const ReservationsManagementPage = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.reservationManagementHeader[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.reservationManagementHeader[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>
        </>
    );
};

export default ReservationsManagementPage;