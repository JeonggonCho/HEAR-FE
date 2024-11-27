import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const NotificationPage = () => {
    const {lang} = useThemeStore();

    return (
        <div>
            <HeadTag title={headerCategories.notification[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.notification[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            알림 페이지
        </div>
    );
};

export default NotificationPage;