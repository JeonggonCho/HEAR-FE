import {useContext, useState} from "react";
import Icon from "@components/common/Icon";
import SideMenu from "@components/common/SideMenu";
import Button from "@components/common/Button";
import {useThemeStore} from "@store/useThemeStore.ts";
import EducationManagementContext from "@context/EducationManagementContext.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import menu from "@assets/icons/menu.svg";


const EducationManagementSideMenu = () => {
    const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

    const {lang} = useThemeStore();
    const {questions} = useContext(EducationManagementContext);

    return (
        <>
            <Button
                type={"button"}
                variant={"text"}
                width={"fit"}
                size={"sm"}
                color={"third"}
                style={{padding: 0}}
                onClick={() => setShowSideMenu(true)}
            >
                <Icon svg={menu} isHovered={true}/>
            </Button>

            {showSideMenu &&
              <SideMenu
                content={
                    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                        <Button
                            type={"button"}
                            variant={"filled"}
                            width={"full"}
                            color={"third"}
                            size={"md"}
                            onClick={() => {}}
                            disabled={questions.length === 0}
                        >
                            {buttonCategories.preview[lang]}
                        </Button>
                        <Button
                            type={"button"}
                            variant={"filled"}
                            width={"full"}
                            color={"third"}
                            size={"md"}
                            onClick={() => {}}
                        >
                            {buttonCategories.response[lang]}
                        </Button>
                    </div>
                }
                direction={"right"}
                setSideMenu={setShowSideMenu}
              />
            }
        </>
    );
};

export default EducationManagementSideMenu;

