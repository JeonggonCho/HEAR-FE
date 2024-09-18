import React, {FC} from "react";
import {ReactSVG} from "react-svg";
import {useLocation} from "react-router-dom";

import {navCategories} from "@constants/navCategories.ts";

import {Container, NavButton} from "./style.ts";

const Nav:FC = () => {
    const {pathname} = useLocation();

    return (
        <Container>
            {navCategories.map((category, index) => (
                <NavButton
                    to={category.path}
                    key={index}
                    active={(pathname.includes(category.path)).toString()}
                >
                    <ReactSVG src={category.icon} />
                    {category.label}
                </NavButton>
            ))}
        </Container>
    );
};

export default React.memo(Nav);