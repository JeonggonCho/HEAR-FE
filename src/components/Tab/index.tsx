import {FC} from 'react';

import {ITabProps} from "@/types/componentProps.ts";

import { Container, TabButton, Background } from "./style";

const Tab:FC<ITabProps> = ({tabs, activeIndex, setActiveIndex}) => {
    return (
        <Container>
            <Background activeIndex={activeIndex} tabCount={tabs.length} />
            {tabs.map((tab, index) => (
                <TabButton
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    active={(activeIndex === index).toString()}
                >
                    {tab.name}
                </TabButton>
            ))}
        </Container>
    );
};

export default Tab;
