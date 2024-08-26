import {FC} from 'react';
import {Outlet} from "react-router-dom";
import Nav from "@components/Nav";
import {Container, OutletWrapper} from "./style.ts";
import {ILayoutProps} from "@/types/layoutProps.ts";

const Layout: FC<ILayoutProps> = ({background}) => {
    return (
        <Container>
            <OutletWrapper background={background}>
                <Outlet/>
            </OutletWrapper>
            <Nav/>
        </Container>
    );
};

export default Layout;