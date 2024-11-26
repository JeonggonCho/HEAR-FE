import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import UpdatePasswordForm from "@components/account/UpdatePasswordForm";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const UpdatePasswordPage = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <HeadTag title={headerCategories.passwordChange[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.passwordChange[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <UpdatePasswordForm/>
        </Container>
    );
};

export default UpdatePasswordPage;