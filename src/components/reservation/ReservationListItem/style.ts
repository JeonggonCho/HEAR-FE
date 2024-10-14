import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    border-radius: 12px;
    background-color: ${({theme}) => theme.colors.bg.main};
    
    & > div:first-of-type {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-bottom: 1px solid ${({theme}) => theme.colors.line.main};
        
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
            cursor: pointer;

            svg {
                display: none;
                width: 16px;
                fill: white;
            }
        }
        
        & > div:first-of-type {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-grow: 1;
        }
        
        & > div:last-of-type {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            
            &:hover {
                svg {
                    fill: ${({theme}) => theme.colors.font.main};
                }
            }
            
            svg {
                transition: all 0.2s ease-in-out 0s;
                fill: ${({theme}) => theme.colors.icon.fill};
            }
        }
    }
    
    & > div:last-of-type {
        padding: 12px;
        display: flex;
        gap: 12px;
    }
    
    & + & {
        margin-top: 12px;
    }
`;

export const ImgWrapper = styled.div`
    width: 72px;
    height: 72px;
    padding: 8px;
    overflow: hidden;
    background-color: ${({theme}) => theme.colors.bg.sub};
    border-radius: 4px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const ReservationInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6px;
    padding: 4px 0;
    flex-grow: 1;
`;

export const MachineType = styled.span`
    font-weight: 500;
`;

export const MachineName = styled.span`
    font-size: 0.9rem;
    color: ${({theme}) => theme.colors.font.sub};
`;

export const TimeWrapper = styled.div`
    font-size: 0.9rem;
`;

export const DateText = styled.span`
    display: inline-block;
    font-size: 1.1rem;
    letter-spacing: -0.2px;
`;

export const DateTag = styled.span`
    background-color: ${({theme}) => theme.colors.button.danger};
    color: ${({theme}) => theme.colors.font.danger};
    font-size: 0.87rem;
    padding: 4px 6px;
    border-radius: 6px;
`;