import Card from "@components/common/Card";
import Flex from "@components/common/Flex";
import CardLoading from "@components/skeleton/CardLoading";
import ProfileImage from "@components/common/ProfileImage";
import {useUserInfoStore, useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {EmailWrapper, LabNameWrapper, ProfileNameWrapper, TableContentWrapper, TableLabelWrapper} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";


interface IProfileCardProps {
    isLoading: boolean;
}


const ProfileCard = ({isLoading}: IProfileCardProps) => {
    const {userInfo} = useUserInfoStore();
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    return (
        <Card padding={"4px 24px 24px"} borderRadius={0}>
            <Flex direction={"column"} gap={"8"}>
                <Flex direction={"row"} align={"center"} gap={12} style={{marginBottom: "16px", width: "100%"}}>
                    <ProfileImage size={48}/>
                    <Flex direction={"column"} gap={8}>
                        <ProfileNameWrapper>{userInfo?.username}</ProfileNameWrapper>
                        <EmailWrapper>{userInfo?.email.split("@")[0]}</EmailWrapper>
                    </Flex>
                </Flex>

                <Flex direction={"column"} gap={8}>
                    {userData?.role &&
                      <Flex direction={"row"} align={"center"} gap={12}>
                          {isLoading ?
                              <>
                                  <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                                  <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                              </>
                              :
                              <>
                                  <TableLabelWrapper lang={lang}>{cardCategories.role[lang]}</TableLabelWrapper>
                                  <TableContentWrapper>{cardCategories[userData?.role][lang]}</TableContentWrapper>
                              </>
                          }
                      </Flex>
                    }

                    <Flex direction={"row"} align={"center"} gap={12}>
                        {isLoading ?
                            <>
                                <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                                <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                            </>
                            :
                            <>
                                <TableLabelWrapper lang={lang}>{cardCategories.studentId[lang]}</TableLabelWrapper>
                                <TableContentWrapper>{userInfo?.studentId}</TableContentWrapper>
                            </>
                        }
                    </Flex>

                    {userData?.role === "student" &&
                      <>
                        <Flex direction={"row"} align={"center"} gap={12}>
                            {isLoading ?
                                <>
                                    <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                                    <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                                </>
                                :
                                <>
                                    <TableLabelWrapper lang={lang}>{cardCategories.year[lang]}</TableLabelWrapper>
                                    <TableContentWrapper>{userData?.year}</TableContentWrapper>
                                </>
                            }
                        </Flex>
                        <Flex direction={"row"} align={"center"} gap={12}>
                            {isLoading ?
                                <>
                                    <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                                    <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                                </>
                                :
                                <>
                                    <TableLabelWrapper lang={lang}>{cardCategories.studio[lang]}</TableLabelWrapper>
                                    <TableContentWrapper>{userData?.studio} {cardCategories.professor[lang]}</TableContentWrapper>
                                </>
                            }
                        </Flex>
                      </>
                    }

                    {userData?.role === "assistant" &&
                      <Flex direction={"row"} align={"center"} gap={12}>
                          {isLoading ?
                              <>
                                  <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                                  <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                              </>
                              :
                              <>
                                  <TableLabelWrapper lang={lang}>{cardCategories.lab[lang]}</TableLabelWrapper>
                                  <LabNameWrapper lab={!!userData.lab}>{userData?.lab || `${cardCategories.emptyLab[lang]}`}</LabNameWrapper>
                              </>
                          }
                      </Flex>
                    }
                </Flex>
            </Flex>
        </Card>
    );
};

export default ProfileCard;