import React, {FC} from "react";
import {ReactSVG} from "react-svg";
import {useLocation} from "react-router-dom";

import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, NavButton} from "./style.ts";
import {ICategory} from "@/types/navCategory.ts";
import {navLabels} from "@constants/langCategories.ts";

import home from "@assets/icons/home.svg";
import note from "@assets/icons/note.svg";
import quiz from "@assets/icons/quiz.svg";
import inquiry from "@assets/icons/inquiry.svg";
import account from "@assets/icons/account.svg";

const Nav:FC = () => {
    const {pathname} = useLocation();
    const {lang} = useThemeStore();

    const navCategories: ICategory[] = [
        { label: navLabels.home[lang], icon: home, path: "/home" },
        { label: navLabels.instruction[lang], icon: note, path: "/instruction" },
        { label: navLabels.quiz[lang], icon: quiz, path: "/quiz" },
        { label: navLabels.communication[lang], icon: inquiry, path: "/communication" },
        { label: navLabels.account[lang], icon: account, path: "/account" },
    ];

    return (
        <Container>
            {navCategories.map((category, index) => (
                <NavButton
                    to={category.path}
                    key={index}
                    active={(pathname.includes(category.path)).toString()}
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