import React, {FC} from "react";
import {ReactSVG} from "react-svg";
import {useLocation} from "react-router-dom";

import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, NavButton} from "./style.ts";
import {ICategory} from "@/types/navCategory.ts";
import {navCategories} from "@constants/navCategories.ts";

import home from "@assets/icons/home.svg";
import note from "@assets/icons/note.svg";
import edu from "@assets/icons/edu.svg";
import inquiry from "@assets/icons/inquiry.svg";
import account from "@assets/icons/account.svg";

const Nav:FC = () => {
    const {pathname} = useLocation();
    const {lang, isDarkMode} = useThemeStore();

    const navInfoCategories: ICategory[] = [
        { label: navCategories.home[lang], icon: home, path: "/home" },
        { label: navCategories.instruction[lang], icon: note, path: "/instruction" },
        { label: navCategories.edu[lang], icon: edu, path: "/education" },
        { label: navCategories.board[lang], icon: inquiry, path: "/board" },
        { label: navCategories.account[lang], icon: account, path: "/account" },
    ];

    return (
        <Container>
            {navInfoCategories.map((category, index) => (
                <NavButton
                    to={category.path}
                    key={index}
                    active={(pathname.includes(category.path)).toString()}
                    darkmode={isDarkMode.toString()}
                >
                    <div>
                        <ReactSVG src={category.icon} />
                        {category.label}
                    </div>
                </NavButton>
            ))}
        </Container>
    );
};

export default React.memo(Nav);