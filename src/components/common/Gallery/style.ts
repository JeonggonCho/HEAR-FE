import styled from "@emotion/styled";

export const Container = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
    width: 600px;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(2px);
    z-index: 5;
`;

export const TopWrapper = styled.div`
    margin: auto;
    width: 100%;
    padding: 24px;
    position: relative;
    
    @media (max-width: 600px) {
        width: 100vw;
    }
    
    & > p:first-of-type {
        width: 100%;
        text-align: center;
        color: white;
        font-size: 1.15rem;
        margin: 0;
    }
`;

export const ZoomedImage = styled.div<{zoomRate: number, dragPosition: {x: number, y: number}}>`
    width: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    flex-grow: 1;
    
    @media (max-width: 600px) {
        width: 100vw;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transform: ${({zoomRate, dragPosition}) =>
                `scale(${zoomRate}) translate(${dragPosition.x}px, ${dragPosition.y}px)`};
        transition: all 0.2s ease-in-out;
        cursor: grab;
    }
`;

export const BtnsWrapper = styled.div`
    position: fixed;
    bottom: 180px;
    right: calc((100vw - 600px) / 2 + 24px);
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 6;

    @media (max-width: 600px) {
        right: 24px;
    }
`;

export const ZoomButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};

    & > div:first-of-type,
    & > div:last-of-type {
        cursor: pointer;
        padding: 12px 12px;
        background-color: white;
        border: 1px solid lightgrey;
        transition: all 0.2s ease-in-out 0s;
        
        &:active {
            background-color: gray;
        }
        
        &:hover {
            svg {
                fill: black;
            }
        }

        svg {
            fill: gray;
            transition: all 0.2s ease-in-out 0s;
        }
    }

    & > div:first-of-type {
        border-radius: 12px 12px 0 0;
    }

    & > div:last-of-type {
        border-radius: 0 0 12px 12px;
    }
`;

export const ResetButtonWrapper = styled.div`
    border-radius: 50%;
    border: 1px solid lightgrey;
    cursor: pointer;
    padding: 12px 12px;
    background-color: white;
    box-shadow: 0 0 10px ${({theme}) => theme.colors.bg.shadow};
    transition: all 0.2s ease-in-out 0s;

    &:hover {
        svg {
            fill: black;
        }
    }

    &:active {
        background-color: gray;
    }

    svg {
        fill: gray;
        transition: all 0.2s ease-in-out 0s;
    }
`;

export const ImagesList = styled.div`
    max-width: calc(100% - 48px);
    padding: 24px 0;
    margin: 24px auto auto;
    display: flex;
    justify-content: center;
    left: 50%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
        height: 32px;
    }

    &::-webkit-scrollbar-thumb {
        background-clip: padding-box;
        background-color: lightgrey;
        border: 14px solid transparent;
        border-radius: 16px;
    }


    @media (max-width: 600px) {
        max-width: calc(100vw - 24px);
    }

    & > div:first-of-type {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;

export const ImageListItemWrapper = styled.div<{current:boolean}>`
    min-width: 72px;
    width: 72px;
    height: 88px;
    overflow: hidden;
    border-radius: 8px;
    border: ${({current}) => {
        return current ? `3px solid white` : `1px solid grey`;
    }};
    filter: ${({current}) => current ? "brightness(1)" : "brightness(0.6)"};
    box-shadow: 0 0 15px ${({theme}) => theme.colors.bg.shadow};
    cursor: pointer;
    scroll-snap-align: center;
    flex: none;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;