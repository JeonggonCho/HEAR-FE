import React, {ReactNode, memo} from "react";
import HeaderLeft from "@components/common/Header/HeaderLeft.tsx";
import HeaderCenter from "@components/common/Header/HeaderCenter.tsx";
import HeaderRight from "@components/common/Header/HeaderRight.tsx";
import {HeaderWrapper} from "./style.ts";


interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    bgColor?: boolean;
}


const HeaderMain = memo(({children, bgColor = false, ...props}: IHeaderProps) => {
    return (
        <HeaderWrapper bgColor={bgColor} {...props}>
            {children}
        </HeaderWrapper>
    );
});

const MemoizedHeaderLeft = memo(HeaderLeft);
const MemoizedHeaderCenter = memo(HeaderCenter);
const MemoizedHeaderRight = memo(HeaderRight);

export const Header = Object.assign(HeaderMain, {
    Left: MemoizedHeaderLeft,
    Center: MemoizedHeaderCenter,
    Right: MemoizedHeaderRight,
});