import styled from "@emotion/styled";

export const Container = styled.div`
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }
    
    form {
        padding: 24px;
        background-color: ${({theme}) => theme.colors.bg.main};
        display: flex;
        flex-direction: column;
        gap: 32px;
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
    background-color: ${({theme}) => theme.colors.bg.sub};

    img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        margin: 24px 0;
    }
`;

export const CncCheckWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    & > div:first-of-type {
        width: fit-content;
        margin-left: 4px;

        & > input {
            display: none;
        }

        & > label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
            color: ${({theme}) => theme.colors.font.sub};
            cursor: pointer;

            & > div:first-of-type {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                border: 1px solid ${({theme}) => theme.colors.font.sub};

                svg {
                    margin-top: 2px;
                    fill: ${({theme}) => theme.colors.line.main};

                }
            }
        }

        & > input[type="checkbox"]:checked + label > div:first-of-type {
            border: 2px solid ${({theme}) => theme.colors.font.primary};
            background-color: ${({theme}) => theme.colors.button.approval};
            
            svg {
                fill: ${({theme}) => theme.colors.font.primary};
            }
        }
    }

    & > div:last-of-type {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        padding: 16px;
        border: 1px solid ${({theme}) => theme.colors.line.main};
        border-radius: 12px;

        & > span {
            font-size: 0.9rem;
            display: inline-block;
            color: ${({theme}) => theme.colors.font.sub};
        }
        
        & > p {
            font-size: 1rem;
            line-height: 1.5;
            margin: 0;
            color: ${({theme}) => theme.colors.font.main};
            text-wrap: pretty;
            word-break: break-word;
        }
    }
    
    & > p:last-of-type {
        margin: 0 0 0 6px;
        font-size: 0.9rem;
        color: ${({theme}) => theme.colors.font.danger};
    }
`;