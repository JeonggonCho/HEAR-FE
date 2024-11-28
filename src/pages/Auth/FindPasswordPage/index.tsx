import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import FindPasswordForm from "@components/account/FindPasswordForm";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const FindPasswordPage = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.findPassword[lang]}/>

            <Header>
                <Grid columns={3} align={"center"} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.findPassword[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <FindPasswordForm/>
        </>
    );
};

export default FindPasswordPage;