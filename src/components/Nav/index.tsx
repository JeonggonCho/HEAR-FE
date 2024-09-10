import React, {FC} from "react";
import {ReactSVG} from "react-svg";
import {useLocation} from "react-router-dom";

import {navCategories} from "@constants/navCategories.ts";

import {Container, Button} from "./style.ts";

const Nav:FC = () => {
    const {pathname} = useLocation();

    return (
        <Container>
            {navCategories.map((category, index) => (
                <Button
                    to={category.path}
                    key={index}
                    active={(pathname.includes(category.path)).toString()}
                >
                    <ReactSVG src={category.icon} />
                    {category.label}
                </Button>
            ))}
        </Container>
    );
};

export default React.memo(Nav);