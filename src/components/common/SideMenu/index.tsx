import {FC, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {ReactSVG} from "react-svg";

import {ISideMenuProps} from "@/types/componentProps.ts";

import {CloseBtnWrapper, Container, SideMenuWrapper} from "./style.ts";

import close from "@assets/icons/close.svg";


const SideMenu:FC<ISideMenuProps> = ({setSideMenu, direction, content}) => {
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    // 사이드 메뉴 외부 background 클릭 시, 사이드 메뉴 닫히게 하기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (backgroundRef.current && sideMenuRef.current && backgroundRef.current.contains(e.target as Node) && !sideMenuRef.current.contains(e.target as Node)) {
                setSideMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [sideMenuRef, setSideMenu]);

    const sideMenuRoot = document.getElementById("side-menu-hook");

    if (!sideMenuRoot) return null;

    const sideMenuContent = (
        <Container ref={backgroundRef}>
            <SideMenuWrapper
                direction={direction}
                ref={sideMenuRef}
            >
                <div>
                    <CloseBtnWrapper onClick={(e) => {
                        e.stopPropagation();
                        setSideMenu(false);
                    }}>
                        <ReactSVG src={close}/>
                    </CloseBtnWrapper>
                </div>
                {content}
            </SideMenuWrapper>
        </Container>
    );

    return ReactDOM.createPortal(sideMenuContent, sideMenuRoot);
};

export default SideMenu;