import React, {FC} from "react";
import {Button, Container, NavWrapper} from "./style.ts";
import home from "../../assets/icons/home.svg";
import note from "../../assets/icons/note.svg";
import reservation from "../../assets/icons/reservation.svg";
import question from "../../assets/icons/question.svg";
import account from "../../assets/icons/account.svg";
import test from "../../assets/icons/test.svg";
import {ReactSVG} from "react-svg";
import {useLocation} from "react-router-dom";
import {ICategory} from "@/types/navCategory.ts";

const categories: ICategory[] = [
    { label: "홈", icon: home, path: "/main" },
    { label: "사용법", icon: note, path: "/instruction" },
    { label: "예약", icon: reservation, path: "/reservation" },
    { label: "교육", icon: test, path: "/test" },
    { label: "문의", icon: question, path: "/inquiry" },
    { label: "내정보", icon: account, path: "/account" },
];

const Nav: FC = () => {
    const {pathname} = useLocation();

    return (
        <Container>
            <NavWrapper>
                {categories.map((category, index) => (
                    <Button
                        to={category.path}
                        key={index}
                        isActive={pathname.includes(category.path)}
                    >
                        <ReactSVG src={category.icon} />
                        {category.label}
                    </Button>
                ))}
            </NavWrapper>
        </Container>
    );
};

export default React.memo(Nav);