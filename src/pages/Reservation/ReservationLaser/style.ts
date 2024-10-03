import styled from "@emotion/styled";

export const Container = styled.div`
    & > div:first-of-type {
        background-color: ${({theme}) => theme.colors.bg.main} !important;
    }
    
    form {
        width: calc(100% + 48px);
        margin-left: -24px;
        padding: 24px;
        min-height: calc(100vh - 260px);
        margin-bottom: -200px;
        background-color: ${({theme}) => theme.colors.bg.main};
        display: flex;
        flex-direction: column;
        gap: 32px;

        & > div:last-of-type {
            display: flex;
            flex-direction: column;
            gap: 8px;
            
            & > label {
                margin-left: 6px;
                font-size: 1rem;
                color: ${({theme}) => theme.colors.font.sub};
            }

            & > div:last-of-type {
                padding: 8px;
                border: 1px solid ${({theme}) => theme.colors.line.main};
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                
                & > p {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    height: 80px;
                    color: ${({theme}) => theme.colors.font.sub};
                    font-size: 1rem;
                }
            }
        }
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

    img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        margin: 24px 0;
    }
`;

export const SelectedItemWrapper = styled.div`
    width: 100%;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 56px;
    
    & > span {
        text-wrap: nowrap;
    }
    
    & > span:first-of-type {
        font-weight: 500;
    }
    
    & > span:nth-of-type(2) {
        flex-grow: 1;
    }
    
    & > div:first-of-type {
        cursor: pointer;
        
        &:hover {
            svg {
                fill: ${({theme}) => theme.colors.font.main};
            }
        }
        
        svg {
            margin-top: 2px;
            transition: all 0.2s ease-in-out 0s;
            fill: ${({theme}) => theme.colors.font.sub};
        }
    }
`;