import React from "react";
import Icon from "@components/common/Icon";
import Flex from "@components/common/Flex";
import {useLocation} from "react-router-dom";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, NavButton} from "./style.ts";
import {navCategories} from "@constants/navCategories.ts";
import {ICategory} from "@/types/navCategory.ts";
import home from "@assets/icons/home.svg";
import note from "@assets/icons/note.svg";
import test from "@assets/icons/edu.svg";
import inquiry from "@assets/icons/inquiry.svg";
import account from "@assets/icons/account.svg";


const Nav = () => {
    const {pathname} = useLocation();
    const {lang, isDarkMode} = useThemeStore();

    const navInfoCategories: ICategory[] = [
        { label: navCategories.home[lang], icon: home, path: "/home" },
        { label: navCategories.instruction[lang], icon: note, path: "/instruction" },
        { label: navCategories.test[lang], icon: test, path: "/education" },
        { label: navCategories.board[lang], icon: inquiry, path: "/board" },
        { label: navCategories.account[lang], icon: account, path: "/account" },
    ];

    return (
        <Container>
            <Flex align={"center"} justify={"space-between"}>
                {navInfoCategories.map((category, index) => (
                    <NavButton
                        to={category.path}
                        key={index}
                        active={(pathname.includes(category.path)).toString()}
                        darkmode={isDarkMode.toString()}
                    >
                        <Flex direction={"column"} align={"center"} justify={"space-between"}>
                            <Icon svg={category.icon} size={28}/>
                            {category.label}
                        </Flex>
                    </NavButton>
                ))}
            </Flex>
        </Container>
    );
};

export default React.memo(Nav);