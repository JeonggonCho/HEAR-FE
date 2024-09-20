import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 36px;
    
    label {
        padding-left: 8px;
        color: ${({theme}) => theme.colors.font.sub};
    }
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    & > div:last-of-type {
        margin-top: 8px;
        
        p {
            padding: 24px 0;
            text-align: center;
        }
    }
    
    button {
        margin-top: 8px;
    }
`;

export const TimesWrapper = styled.div<{ isOpen: boolean; maxHeight: string }>`
    max-height: ${(props) => (props.isOpen ? props.maxHeight : "0")};
    transition: max-height 0.3s ease-in-out;
`;

export const TimeSelectsWrapper = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 8px;
    border-top: 1px solid ${({theme}) => theme.colors.line.main};
    margin-bottom: 12px;
    
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 6px;
        
        select {
            width: 100%;
            padding: 6px;
            font-size: 18px;
            border-radius: 6px;
            border: 1px solid ${({theme}) => theme.colors.line.main};
            background-color: ${({theme}) => theme.colors.bg.main};
            color: ${({theme}) => theme.colors.font.main};
            
            &:focus {
                outline: ${({theme}) => theme.colors.line.primary};
            }
        }
    }
    
    button {
        width: 120px;
    }
`;

export const ErrorMessage = styled.span`
    font-size: 14px;
    display: inline-block;
    color: ${({theme}) => theme.colors.font.danger};
    margin-left: 4px;
    margin-top: 6px;
    
    & + & {
        margin-bottom: 8px;
    }
`;

export const MoreWrapper = styled.div<{isOpen: boolean}>`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(${({isOpen}) => isOpen ? "180deg" : "0deg"});
    transition: transform 0.3s ease-in-out 0s;
    
    svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        fill: ${({theme}) => theme.colors.font.sub};
    }
`;