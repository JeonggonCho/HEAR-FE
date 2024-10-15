import styled from "@emotion/styled";

export const ThemeWrapper = styled.div`
    margin: 24px;
    padding: 20px 16px 16px 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 12px;

    h3 {
        margin: 0 0 24px;
        font-weight: 500;
        font-size: 1.15rem;
        color: ${({theme}) => theme.colors.font.main};
    }
    
    input {
        display: none;
    }
    
    & > div:last-of-type {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        position: relative;
        cursor: pointer;
        color: ${({theme}) => theme.colors.font.sub};
        transition: all 0.1s ease-in-out 0s;
        
        &:hover {
            scale: 1.05;
        }
        
        &:active {
            scale: 0.98;
        }
    }
    
    input[type="radio"]:checked + label {
        color: ${({theme}) => theme.colors.font.main};
        font-weight: 500;
        
        & > div:nth-of-type(2) {
            border: 1px solid ${({theme}) => theme.colors.line.primary};
        }
    }
`;

export const LanguageWrapper = styled.div`
    margin: 24px;
    padding: 20px 16px 16px 16px;
    background-color: ${({theme}) => theme.colors.bg.main};
    border-radius: 12px;

    h3 {
        margin: 0 0 24px;
        font-weight: 500;
        font-size: 1.15rem;
        color: ${({theme}) => theme.colors.font.main};
    }

    input {
        display: none;
    }
    
    & > div:last-of-type {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 8px;
        
        label {
            width: 100%;
            padding: 0 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 48px;
            border-radius: 8px;
            border: 1px solid ${({theme}) => theme.colors.line.main};
            color: ${({theme}) => theme.colors.font.sub};
            cursor: pointer;
            transition: all 0.1s ease-in-out 0s;

            &:hover {
                scale: 1.01;
            }

            &:active {
                scale: 0.99;
            }
        }
        
        input[type="radio"]:checked + label {
            border: 1px solid ${({theme}) => theme.colors.line.primary};
            color: ${({theme}) => theme.colors.font.main};
            font-weight: 500;
        }
    }
`;

export const ThemeCheckMark = styled.div`
    width: 20px;
    height: 20px;
    padding: 2px;
    border-radius: 50%;
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.button.primary};
    
    svg {
        margin-top: 2px;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ThemeImgWrapper = styled.div`
    width: 120px;
    height: 80px;
    border-radius: 8px;
    border: 1px solid ${({theme}) => theme.colors.line.main};
    padding: 4px;
    
    img {
        border: 1px solid ${({theme}) => theme.colors.line.main};
        border-radius: 4px;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const LanguageCheckMark = styled.div`
    width: 20px;
    height: 20px;
    padding: 2px;
    border-radius: 50%;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.button.primary};
    
    svg {
        margin-top: 2px;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;