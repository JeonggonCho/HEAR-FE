import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import UpdateStudentAccountForm from "@components/account/UpdateStudentAccountForm";
import UpdateAssistantAccountForm from "@components/account/UpdateAssistantAccountForm";
import ArrowBack from "@components/common/ArrowBack";
import {useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const UpdateAccountPage = () => {
    const {lang} = useThemeStore();
    const {userData} = useUserDataStore();

    return (
        <Container>
            <HeadTag title={headerCategories.profileUpdate[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.profileUpdate[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <>
                {userData?.role === "student" && <UpdateStudentAccountForm/>}
                {userData?.role === "assistant" && <UpdateAssistantAccountForm/>}
            </>
        </Container>
    );
};

export default UpdateAccountPage;