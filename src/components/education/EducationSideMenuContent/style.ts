import styled from "@emotion/styled";


export const AnswerWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    
    input[type="checkbox"],
    input[type="radio"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
        margin: 0;
    }
`;

export const SideMenuAnswerWrapper = styled.div`
    width: 100%;
    display: flex;
    overflow: hidden;
    
    p {
        margin: 0;
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.main};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const SideMenuQuestionsWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    height: 80vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 20px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => theme.colors.font.placeholder};
        border: 7px solid ${({theme}) => theme.colors.bg.main};
        border-radius: 10px;
    }
`;

export const SideMenuQuestionWrapper = styled.li<{filled: string}>`
    cursor: pointer;
    border: 1px solid ${({theme, filled}) => {
    return filled === "true" ? theme.colors.line.primary : theme.colors.line.main;
}};
    padding: 4px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    
    label {
        cursor: pointer;
        width: 28px;
        min-width: 28px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: ${({theme, filled}) => {
    return filled === "true" ? theme.colors.button.approval : theme.colors.button.third;
}};
        border-radius: 4px;
        color: ${({theme, filled}) => {
    return filled === "true" ? theme.colors.font.primary : theme.colors.font.sub;
}};
    }
`;