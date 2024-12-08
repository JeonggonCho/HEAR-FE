import React, {ReactNode} from "react";
import HeaderLeft from "@components/common/Header/HeaderLeft.tsx";
import HeaderCenter from "@components/common/Header/HeaderCenter.tsx";
import HeaderRight from "@components/common/Header/HeaderRight.tsx";
import {HeaderWrapper} from "./style.ts";


interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    bgColor?: boolean;
}


const HeaderMain = ({children, bgColor = false, ...props}: IHeaderProps) => {
    return (
        <HeaderWrapper bgColor={bgColor} {...props}>
            {children}
        </HeaderWrapper>
    );
};

export const Header = Object.assign(HeaderMain, {
    Left: HeaderLeft,
    Center: HeaderCenter,
    Right: HeaderRight,
});