import styled from "@emotion/styled";

export const ReservationListItemWrapper = styled.div`
    margin: 8px 24px;
`;

export const ReservationControlWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0 24px;
    padding: 16px 4px;
    position: sticky;
    top: 72px;
    background-color: ${({theme}) => theme.colors.bg.sub};
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        flex-grow: 1;
        
        // 선택 예약취소
        & > div:last-of-type {
            & > span {
                font-size: 0.9rem;
                text-decoration: underline;
                color: ${({theme}) => theme.colors.font.sub};
                cursor: pointer;
                transition: all 0.2s ease-in-out 0s;
                
                &:hover {
                    color: ${({theme}) => theme.colors.font.main};
                }
            }
        }
    }
    
    & > select {
        padding: 4px;
        border-radius: 6px;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.main};
        background-color: ${({theme}) => theme.colors.bg.main};
        
        &:focus {
            outline: 1px solid ${({theme}) => theme.colors.line.primary};
        }
    }
`;

export const SelectAllWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-right: 20px;
    cursor: pointer;
    
    label {
        font-size: 0.9rem;
        cursor: pointer;
    }
    
    input[type="checkbox"] {
        display: none;

        &:checked + label {
            background-color: ${({theme}) => theme.colors.button.primary};
            border: 2px solid ${({theme}) => theme.colors.line.primary};

            svg {
                display: block;
            }
        }
    }

    input[type="checkbox"] + label {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${({theme}) => theme.colors.font.sub};
        border-radius: 4px;

        svg {
            display: none;
            width: 16px;
            fill: white;
        }
    }
    
    span {
        font-size: 0.9rem;
        text-decoration: none;
        color: ${({theme}) => theme.colors.font.main};
    }
`;