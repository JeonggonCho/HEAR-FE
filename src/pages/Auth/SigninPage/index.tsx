import {Header} from "@components/common/Header";
import Link from "@components/common/Link";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import SignInForm from "@components/account/SignInForm";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {LinkWrapper, LogoWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import logo from "@assets/logo.svg";


const SignInPage = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.signIn[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.signIn[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <LogoWrapper>
                <img src={logo} alt="로고"/>
                <h3>HEAR</h3>
            </LogoWrapper>

            <SignInForm/>

            <LinkWrapper>
                <Link
                    type={"text"}
                    name={buttonCategories.signUp[lang]}
                    to={"/signup"}
                    color={"primary"}
                />
                <Link
                    type={"text"}
                    name={buttonCategories.findPassword[lang]}
                    to={"/password/reset"}
                    color={"second"}
                />
            </LinkWrapper>
        </>
    );
};

export default SignInPage;