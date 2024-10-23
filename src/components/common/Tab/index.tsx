import React, {FC, useMemo} from 'react';
import {useLocation} from "react-router-dom";

import {ITabProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {ButtonTapWrapper, ButtonTap, Background, LineTapWrapper, LineTap} from "./style.ts";

const Tab:FC<ITabProps> = (props) => {
    const {type, tabs} = props;

    const location = useLocation();

    const {lang, isDarkMode} = useThemeStore();

    const memoizedTabs = useMemo(() => tabs, [tabs]);

    if (type === "button") {
        const {activeIndex, setActiveIndex} = props as {
            activeIndex: number;
            setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
        }

        return (
            <ButtonTapWrapper isDarkMode={isDarkMode}>
                <Background
                    activeIndex={activeIndex}
                    tabCount={tabs.length}
                    isDarkMode={isDarkMode}
                />
                {memoizedTabs.map((tab, index) => (
                    <ButtonTap
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        active={(activeIndex === index).toString()}
                        lang={lang}
                    >
                        {tab.name}
                    </ButtonTap>
                ))}
            </ButtonTapWrapper>
        );
    }

    return (
        <LineTapWrapper>
            {memoizedTabs.map((tab, index) => (
                <LineTap
                    key={index}
                    to={tab.path as string}
                    active={(tab.path === location.pathname).toString()}
                    tabcount={tabs.length}
                >
                    {tab.name}
                </LineTap>
            ))}
        </LineTapWrapper>
    );
};

export default React.memo(Tab);
