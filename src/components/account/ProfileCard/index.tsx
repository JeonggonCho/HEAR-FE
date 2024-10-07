import {FC} from "react";

import CardLoading from "@components/skeleton/CardLoading";

import {useUserInfoStore, useUserDataStore} from "@store/useUserStore.ts";
import {roleCategories} from "@constants/userCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {cardCategories} from "@constants/cardCategories.ts";

import {Container} from "./style.ts";

const ProfileCard:FC<{isLoading: boolean}> = ({isLoading}) => {
    const {userInfo} = useUserInfoStore();
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                {isLoading ?
                    <>
                        <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"20px"}/>
                        <CardLoading bgColor={"dark"} widthValue={"150px"} heightValue={"20px"}/>
                    </>
                    :
                    <>
                        <span>{cardCategories.username[lang]}</span>
                        <span>{userInfo?.username}</span>
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
                        <span>{cardCategories.email[lang]}</span>
                        <span>{userInfo?.email}</span>
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
                            <span>{cardCategories.studentId[lang]}</span>
                            <span>{userInfo?.studentId}</span>
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
                            <span>{cardCategories.year[lang]}</span>
                            <span>{userData?.year}학년</span>
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
                            <span>{userData?.studio} 교수님</span>
                        </>
                    }
                </div>
              </>
            }
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
                          <span>{roleCategories[userData?.role]}</span>
                      </>
                  }
              </div>
            }
        </Container>
    );
};

export default ProfileCard;