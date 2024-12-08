import {Dispatch, ReactElement, SetStateAction, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {ReactSVG} from "react-svg";
import {CloseBtnWrapper, Container, SideMenuWrapper} from "./style.ts";
import close from "@assets/icons/close.svg";


interface ISideMenuProps {
    direction: "left" | "right";
    setSideMenu: (() => void) | Dispatch<SetStateAction<boolean>>;
    content: ReactElement;
}


const SideMenu= ({setSideMenu, direction, content}: ISideMenuProps) => {
    const sideMenuRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);

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