import {Header} from "@components/common/Header";
import Link from "@components/common/Link";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import SignUpForm from "@components/account/SignUpForm";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {headerCenter} from "@components/common/Header/style.ts";


const SignUpPage = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.signUp[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.signUp[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <SignUpForm/>

            <Link
                type={"text"}
                name={buttonCategories.signIn[lang]}
                to={"/login"}
                color={"primary"}
            />
        </>
    );
};

export default SignUpPage;