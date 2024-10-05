import {FC} from "react";

import {useUserInfoStore, useUserDataStore} from "@store/useUserStore.ts";
import {userRole} from "@constants/userRole.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";
import {cardLabels} from "@constants/langCategories.ts";


const ProfileCard:FC = () => {
    const {userInfo} = useUserInfoStore();
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <span>{cardLabels.username[lang]}</span>
                <span>{userInfo?.username}</span>
            </div>
            <div>
                <span>{cardLabels.email[lang]}</span>
                <span>{userInfo?.email}</span>
            </div>
            {userData?.role === "student" &&
              <>
                <div>
                  <span>{cardLabels.studentId[lang]}</span>
                  <span>{userInfo?.studentId}</span>
                </div>
                <div>
                  <span>{cardLabels.year[lang]}</span>
                  <span>{userData?.year}학년</span>
                </div>
                <div>
                  <span>{cardLabels.studio[lang]}</span>
                  <span>{userData?.studio} 교수님</span>
                </div>
              </>
            }
            {userData?.role &&
              <div>
                <span>{cardLabels.role[lang]}</span>
                <span>{userRole[userData?.role]}</span>
              </div>
            }
        </Container>
    );
};

export default ProfileCard;