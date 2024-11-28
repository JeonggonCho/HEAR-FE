import {useNavigate} from "react-router-dom";
import {Header} from "@components/common/Header";
import Button from "@components/common/Button";
import Flex from "@components/common/Flex";
import {useThemeStore} from "@store/useThemeStore.ts";
import {LottieAndBtnWrapper, LottieWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import done from "@assets/images/done.json";


const SignUpDonePage = () => {
    const navigate = useNavigate();
    const {lang} = useThemeStore();

    return (
        <>
            <Header>
                <Flex align={"center"} justify={"center"} style={{width: "100%"}}>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.doneSignUp[lang]}</h2>
                    </Header.Center>
                </Flex>
            </Header>

            <LottieAndBtnWrapper>
                <LottieWrapper animationData={done}/>
                <p>{messageCategories.doneSignUp[lang]}</p>
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    color={"primary"}
                    size={"lg"}
                    onClick={() => navigate("/", {replace: true})}
                >
                    {buttonCategories.goHome[lang]}
                </Button>
            </LottieAndBtnWrapper>
        </>
    );
};

export default SignUpDonePage;