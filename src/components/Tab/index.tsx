import { useState } from 'react';
import { Container, TabButton, Background } from "./style";

interface Tab {
    name: string;
}

const tabs: Tab[] = [
    { name: "소개" },
    { name: "준비" },
    { name: "출력" },
    { name: "사용후" },
];

const TabComponent = () => {
    const [activeIndex, setActiveIndex] = useState(0);
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

export default TabComponent;
