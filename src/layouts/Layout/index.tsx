import {FC} from 'react';
import {Outlet} from "react-router-dom";
import Nav from "@components/common/Nav";
import {Container, OutletWrapper} from "./style.ts";
import {ILayoutProps} from "@/types/layoutProps.ts";

const Layout: FC<ILayoutProps> = ({showNav=true}) => {
    return (
        <Container>
            <OutletWrapper>
                <Outlet/>
            </OutletWrapper>
            {showNav && <Nav/>}
        </Container>
    );
};

export default Layout;