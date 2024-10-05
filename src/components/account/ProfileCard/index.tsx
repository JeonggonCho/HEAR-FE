import {FC} from "react";

import {useUserInfoStore, useUserDataStore} from "@store/useUserStore.ts";
import {roleCategories} from "@constants/userCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";


const ProfileCard:FC = () => {
    const {userInfo} = useUserInfoStore();
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <span>{cardCategories.username[lang]}</span>
                <span>{userInfo?.username}</span>
            </div>
            <div>
                <span>{cardCategories.email[lang]}</span>
                <span>{userInfo?.email}</span>
            </div>
            {userData?.role === "student" &&
              <>
                <div>
                  <span>{cardCategories.studentId[lang]}</span>
                  <span>{userInfo?.studentId}</span>
                </div>
                <div>
                  <span>{cardCategories.year[lang]}</span>
                  <span>{userData?.year}학년</span>
                </div>
                <div>
                  <span>{cardCategories.studio[lang]}</span>
                  <span>{userData?.studio} 교수님</span>
                </div>
              </>
            }
            {userData?.role &&
              <div>
                <span>{cardCategories.role[lang]}</span>
                <span>{roleCategories[userData?.role]}</span>
              </div>
            }
        </Container>
    );
};

export default ProfileCard;