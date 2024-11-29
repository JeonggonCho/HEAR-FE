import {Card} from "@components/common/Card";
import Flex from "@components/common/Flex";
import CardLoading from "@components/skeleton/CardLoading";
import {useUserDataStore} from "@store/useUserStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {
    CenterBar,
    PassStatus,
    StatusLabelWrapper,
    StatusMessageWrapper,
    WarningStatus
} from "./style.ts";


interface IStatusCardProps {
    isLoading: boolean;
}


const StatusCard = ({isLoading}: IStatusCardProps) => {
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    return (
        <Card bgColor={true} borderRadius={0} padding={"16px 24px"}>
            <Flex direction={"row"} align={"center"} justify={"space-evenly"}>
                <Flex direction={"column"} align={"center"} gap={6}>
                    {isLoading ?
                        <>
                            <CardLoading bgColor={"dark"} widthValue={"100px"} heightValue={"40px"}/>
                            <CardLoading bgColor={"dark"} widthValue={"56px"} heightValue={"24px"}/>
                        </>
                        :
                        <>
                            <StatusLabelWrapper>{cardCategories.passEducation[lang]}</StatusLabelWrapper>
                            <StatusMessageWrapper>{cardCategories.eduMessage[lang]}</StatusMessageWrapper>
                            <PassStatus pass={userData?.passEducation as boolean}>
                                {userData?.passEducation ? cardCategories.pass[lang] : cardCategories.fail[lang]}
                            </PassStatus>
                        </>
                    }
                </Flex>
                <CenterBar/>
                <Flex direction={"column"} align={"center"} gap={6}>
                    {isLoading ?
                        <>
                            <CardLoading bgColor={"dark"} widthValue={"100px"} heightValue={"40px"}/>
                            <CardLoading bgColor={"dark"} widthValue={"56px"} heightValue={"24px"}/>
                        </>
                        :
                        <>
                            <StatusLabelWrapper>{cardCategories.countOfWarning[lang]}</StatusLabelWrapper>
                            <StatusMessageWrapper>{cardCategories.warningMessage[lang]}</StatusMessageWrapper>
                            <WarningStatus warning={userData?.countOfWarning as number}>
                                {typeof userData?.countOfWarning === "number" && userData.countOfWarning > 0 ? userData.countOfWarning : 0}
                            </WarningStatus>
                        </>
                    }
                </Flex>
            </Flex>
        </Card>
    );
};

export default StatusCard;