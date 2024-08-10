import React, {FC} from 'react';
import { Container, TabButton, Background } from "./style";

export interface ITab {
    name: string;
    content: JSX.Element;
}

interface ITabProps {
    tabs: ITab[];
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Tab:FC<ITabProps> = ({tabs, activeIndex, setActiveIndex}) => {
    const tabCount = tabs.length;

    const handleClickTab = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <Container>
            <Background activeIndex={activeIndex} tabCount={tabCount} />
            {tabs.map((tab, index) => (
                <TabButton
                    key={index}
                    onClick={() => handleClickTab(index)}
                    isActive={activeIndex === index}
                >
                    {tab.name}
                </TabButton>
            ))}
        </Container>
    );
};

export default Tab;
