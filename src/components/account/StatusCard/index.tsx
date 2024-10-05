import {FC} from "react";

import {useUserDataStore} from "@store/useUserStore.ts";
import {cardLabels} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, PassStatus, WarningStatus} from "./style.ts";

const StatusCard:FC = () => {
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <p>{cardLabels.passQuiz[lang]}</p>
                <span>{cardLabels.quizMessage[lang]}</span>
                <PassStatus pass={userData?.passQuiz as boolean}>
                    {userData?.passQuiz ? cardLabels.pass[lang] : cardLabels.notCompleted[lang]}
                </PassStatus>
            </div>
            <div/>
            <div>
                <p>{cardLabels.countOfWarning[lang]}</p>
                <span>{cardLabels.warningMessage[lang]}</span>
                <WarningStatus warning={userData?.countOfWarning as number}>
                    {typeof userData?.countOfWarning === "number" && userData.countOfWarning > 0 ? userData.countOfWarning : 0}
                </WarningStatus>
            </div>
        </Container>
    );
};

export default StatusCard;