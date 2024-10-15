import {FC} from "react";

import HeadTag from "@components/common/HeadTag";
import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Link from "@components/common/Link";
import Divider from "@components/common/Divider";

import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {LinkWrapper} from "@pages/auth/AccountPage/style.ts";
import {Container} from "./style.ts";

import manageAccountIcon from "@assets/images/manageAccount.png";
import privacyIcon from "@assets/images/privacy.png";
import passwordIcon from "@assets/images/password.png";
import langIcon from "@assets/images/lang.png";

const SettingPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <HeadTag title={""}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.settings[lang]}/>

            <Divider/>

            <LinkWrapper>
                <h3>{headerCategories.general[lang]}</h3>
                <Link type={"card"} name={headerCategories.profileUpdate[lang]} to={"/account/update"} image={manageAccountIcon}/>
                <Link type={"card"} name={headerCategories.passwordChange[lang]} to={"/password/update"} image={passwordIcon}/>
                <Link type={"card"} name={headerCategories.themeSetting[lang]} to={"/setting/theme"} image={langIcon}/>
            </LinkWrapper>

            <Divider/>

            <LinkWrapper>
                <h3>{headerCategories.userGuide[lang]}</h3>
                <Link type={"card"} name={headerCategories.privacyPolicy[lang]} to={""} image={privacyIcon}/>
            </LinkWrapper>

            <hr/>

            <span>Copyright 2024. 조정곤 all rights reserved.</span>
        </Container>
    );
};

export default SettingPage;