import styled from "@emotion/styled";

export const Container = styled.div<{tooltip: boolean}>`
    form {
        display: flex;
        flex-direction: column;
        gap: ${({tooltip}) => tooltip ? "48px" : "32px"};
    }
`;

export const MapIcon = styled.div`
    width: 36px;
    height: 36px;
    overflow: hidden;
    cursor: pointer;
    
    &:hover {
        svg {
            fill: ${({theme}) => theme.colors.font.main};
        }
    }
    
    svg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        fill: ${({theme}) => theme.colors.icon.fill};
        transition: all 0.2s ease-in-out 0s;
    }
`;

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    
    img {
        width: 120px;
        height: 120px;
        object-fit: cover;
    }
`;

export const TimeWrapper = styled.div<{tooltip: boolean}>`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: ${({tooltip}) => tooltip ? "-16px" : "0"};
    
    & > div:first-of-type {
        position: relative;
        
        & > label {
            margin-left: 6px;
            color: ${({theme}) => theme.colors.font.sub};
        }
        
        & > div:first-of-type {
            width: 220px;
            display: flex;
            position: absolute;
            padding: 4px 8px;
            border-radius: 8px;
            bottom: 0;
            left: 115px;
            background-color: ${({theme}) => theme.colors.button.approval};
            z-index: 2;
            
            &:after {
                position: absolute;
                content: "";
                border-top: 2px solid transparent;
                border-left: 18px solid transparent;
                border-bottom: 10px solid ${({theme}) => theme.colors.button.approval};
                border-right: 6px solid ${({theme}) => theme.colors.button.approval};
                bottom: 8px;
                left: -16px;
            }
            
            & > span:first-of-type {
                text-wrap: wrap;
                word-break: keep-all;
                font-size: 0.9rem;
                line-height: 1.5;
                color: ${({theme}) => theme.colors.font.primary};
            }
            
            svg {
                width: 20px;
                height: 20px;
                fill: ${({theme}) => theme.colors.font.primary};
                transition: all 0.2s ease-in-out 0s;
                cursor: pointer;
                
                &:hover {
                    fill: ${({theme}) => theme.colors.font.main};
                }
            }
        }
    }
    
    & > div:last-of-type {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;

        select {
            width: 100%;
            padding: 6px;
            font-size: 1rem;
            border-radius: 6px;
            border: 2px solid ${({theme}) => theme.colors.line.main};
            background-color: ${({theme}) => theme.colors.bg.main};
            color: ${({theme}) => theme.colors.font.main};

            &:focus {
                outline: ${({theme}) => theme.colors.line.primary};
            }
        }
    }
`;

export const ErrorMessage = styled.span`
    font-size: 0.9rem;
    display: inline-block;
    color: ${({theme}) => theme.colors.font.danger};
    margin-left: 4px;
    margin-top: 6px;
    
    & + & {
        margin-bottom: 8px;
    }
`;