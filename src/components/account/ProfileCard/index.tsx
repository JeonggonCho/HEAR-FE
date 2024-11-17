import {FC} from "react";

import CardLoading from "@components/skeleton/CardLoading";
import ProfileImage from "@components/common/ProfileImage";

import {useUserInfoStore, useUserDataStore} from "@store/useUserStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";

import {Container, LabNameWrapper, NameEmailWrapper} from "./style.ts";


const ProfileCard:FC<{isLoading: boolean}> = ({isLoading}) => {
    const {userInfo} = useUserInfoStore();
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    return (
        <Container>
            <NameEmailWrapper>
                <ProfileImage size={48}/>
                <div>
                    <p>{userInfo?.username}</p>
                    <span>{userInfo?.email.split("@")[0]}</span>
                </div>
            </NameEmailWrapper>

            {userData?.role &&
              <div>
                  {isLoading ?
                      <>
                          <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                          <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                      </>
                      :
                      <>
                          <span>{cardCategories.role[lang]}</span>
                          <span>{cardCategories[userData?.role][lang]}</span>
                      </>
                  }
              </div>
            }

            <div>
                {isLoading ?
                    <>
                        <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                        <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                    </>
                    :
                    <>
                        <span>{cardCategories.studentId[lang]}</span>
                        <span>{userInfo?.studentId}</span>
                    </>
                }
            </div>

            {userData?.role === "student" &&
              <>
                <div>
                    {isLoading ?
                        <>
                            <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                            <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                        </>
                        :
                        <>
                            <span>{cardCategories.year[lang]}</span>
                            <span>{userData?.year}</span>
                        </>
                    }
                </div>
                <div>
                    {isLoading ?
                        <>
                            <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                            <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                        </>
                        :
                        <>
                            <span>{cardCategories.studio[lang]}</span>
                            <span>{userData?.studio} {cardCategories.professor[lang]}</span>
                        </>
                    }
                </div>
              </>
            }

            {userData?.role === "assistant" &&
              <div>
                  {isLoading ?
                      <>
                          <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                          <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                      </>
                      :
                      <>
                          <span>{cardCategories.lab[lang]}</span>
                          <LabNameWrapper lab={!!userData.lab}>{userData?.lab || `${cardCategories.emptyLab[lang]}`}</LabNameWrapper>
                      </>
                  }
              </div>
            }
        </Container>
    );
};

export default ProfileCard;