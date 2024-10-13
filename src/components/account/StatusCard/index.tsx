import {FC} from "react";

import CardLoading from "@components/skeleton/CardLoading";

import {useUserDataStore} from "@store/useUserStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, PassStatus, WarningStatus} from "./style.ts";

const StatusCard:FC<{isLoading: boolean}> = ({isLoading}) => {
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                {isLoading ?
                    <>
                        <CardLoading bgColor={"dark"} widthValue={"100px"} heightValue={"40px"}/>
                        <CardLoading bgColor={"dark"} widthValue={"56px"} heightValue={"24px"}/>
                    </>
                    :
                    <>
                        <p>{cardCategories.passQuiz[lang]}</p>
                        <span>{cardCategories.quizMessage[lang]}</span>
                        <PassStatus pass={userData?.passQuiz as boolean}>
                            {userData?.passQuiz ? cardCategories.pass[lang] : cardCategories.fail[lang]}
                        </PassStatus>
                    </>
                }
            </div>
            <div/>
            <div>
                {isLoading ?
                    <>
                        <CardLoading bgColor={"dark"} widthValue={"100px"} heightValue={"40px"}/>
                        <CardLoading bgColor={"dark"} widthValue={"56px"} heightValue={"24px"}/>
                    </>
                    :
                    <>
                        <p>{cardCategories.countOfWarning[lang]}</p>
                        <span>{cardCategories.warningMessage[lang]}</span>
                        <WarningStatus warning={userData?.countOfWarning as number}>
                            {typeof userData?.countOfWarning === "number" && userData.countOfWarning > 0 ? userData.countOfWarning : 0}
                        </WarningStatus>
                    </>
                }
            </div>
        </Container>
    );
};

export default StatusCard;