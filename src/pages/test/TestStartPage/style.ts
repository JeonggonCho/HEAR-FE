import styled from "@emotion/styled";


export const MenusWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 12px 24px;
    position: sticky;
    top: 72px;
    background: ${({theme}) => theme.colors.bg.sub};
    z-index: 1;
    
    // 현재 문제 번호 및 제출 버튼
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        span {
            background-color: ${({theme}) => theme.colors.button.approval};
            padding: 8px 12px;
            border-radius: 6px;
            color: ${({theme}) => theme.colors.font.primary};
        }
        
        & > div:first-of-type {
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }
`;

export const QuestionsWrapper = styled.div<{currentQuestion: number, scrollbarWidth: number}>`
    margin: 12px 24px 24px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border: 1px solid ${({theme}) => theme.colors.bg.main};
    padding: 24px;
    border-radius: 12px;

    & > div:first-of-type {
        overflow: hidden;

        & > div:first-of-type {
            width: 100%;
            display: flex;
            gap: 120px;
            transition: all 0.5s ease-in-out 0s;
            transform: ${({currentQuestion}) => {
                return `translateX(-${currentQuestion * (500 + 120)}px)`;
            }};

            @media (max-width: 615px) {
                transform: ${({currentQuestion, scrollbarWidth}) => {
                    return `translateX(calc(-${currentQuestion} * (100vw - 100px + 120px - ${scrollbarWidth}px)))`;
                }};
            }
        }
    }
`;