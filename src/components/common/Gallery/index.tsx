import React, {FC, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import {ReactSVG} from "react-svg";

import {IGalleryProps} from "@/types/componentProps.ts";

import {
    TopWrapper,
    Container,
    ImageListItemWrapper,
    ImagesList,
    ZoomedImage,
    BtnsWrapper, ZoomButtonWrapper, ResetButtonWrapper
} from "./style.ts";

import close from "@assets/icons/close.svg";
import zoomIn from "@assets/icons/add.svg";
import zoomOut from "@assets/icons/remove.svg";
import reset from "@assets/icons/reset.svg";


const Gallery:FC<IGalleryProps> = ({images, currentImage, setGallery, setCurrentImage}) => {
    const [zoomRate, setZoomRate] = useState<number>(1);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragPosition, setDragPosition] = useState({x:0, y:0});

    const dragStartRef = useRef({x: 0, y:0});

    const galleryRoot = document.getElementById("gallery-hook");

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);

    // 줌 인 클릭
    const clickZoomInHandler = () => {
        if (zoomRate >= 2.8) return null;
        setZoomRate(prevState => {
            setDragPosition({x:0, y:0});
            return prevState + 0.4
        });
    };

    // 줌 아웃 클릭
    const clickZoomOutHandler = () => {
        if (zoomRate <= 1) return null;
        setZoomRate(prevState => {
            setDragPosition({x:0, y:0});
            return prevState - 0.4
        });
    };

    const resetZoomHandler = () => {
        setZoomRate(1);
        setDragPosition({x:0, y:0});
    };

    // 마우스 클릭/터치 시작
    const mouseDownHandler = (e: React.MouseEvent | React.TouchEvent) => {
        const isTouchEvent = "touches" in e;
        const startX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        const startY = isTouchEvent ? e.touches[0].clientY : e.clientY;

        dragStartRef.current = {x:startX - dragPosition.x, y:startY - dragPosition.y};
        setIsDragging(true);
    };

    // TODO 영역 제한에 대한 수정이 필요함
    // 마우스/터치 이동
    const mouseMoveHandler = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;

        const isTouchEvent = "touches" in e;
        const moveX = isTouchEvent ? e.touches[0].clientX : e.clientX;
        const moveY = isTouchEvent ? e.touches[0].clientY : e.clientY;

        const newX = moveX - dragStartRef.current.x;
        const newY = moveY - dragStartRef.current.y;

        // 이미지의 줌 상태에서 크기 계산
        const imgWidth = window.innerWidth * zoomRate;
        const imgHeight = window.innerHeight * 0.68 * zoomRate;

        // 화면 크기와 비교하여 초과되는 부분 계산
        const visibleWidth = window.innerWidth;
        const visibleHeight = window.innerHeight * 0.68;

        const maxOffsetX = Math.max(0, (imgWidth - visibleWidth) / 2); // 초과 부분만 이동 허용
        const maxOffsetY = Math.max(0, (imgHeight - visibleHeight) / 2);

        // 이동 범위를 제한
        setDragPosition({
            x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newX)),
            y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newY)),
        });
    };

    // 마우스/터치 종료
    const mouseUpHandler = () => {
        setIsDragging(false);
    };

    if (!galleryRoot) return null;

    const galleryContent = (
        <>
            <Container>
                <TopWrapper>
                    <p>{`${(currentImage || 0) + 1} / ${images.length}`}</p>
                    <div onClick={() => setGallery(false)}>
                        <ReactSVG src={close}/>
                    </div>
                </TopWrapper>

                <ZoomedImage
                    zoomRate={zoomRate}
                    dragPosition={dragPosition}
                    onMouseDown={mouseDownHandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                    onMouseLeave={mouseUpHandler}
                    onTouchStart={mouseDownHandler}
                    onTouchMove={mouseMoveHandler}
                    onTouchEnd={mouseUpHandler}
                >
                    <img
                        src={images[currentImage || 0]}
                        alt={images[currentImage || 0]}
                        onDragStart={e => e.preventDefault()} // 드래그 복사 방지
                    />
                </ZoomedImage>

                <ImagesList>
                    <div>
                        {images.map((image, index) => (
                            <ImageListItemWrapper
                                key={index}
                                current={index === (currentImage || 0)}
                                onClick={() => {
                                    setZoomRate(1);
                                    setIsDragging(false);
                                    setDragPosition({x:0, y:0})
                                    setCurrentImage && setCurrentImage(index);
                                }}
                            >
                                <img
                                    src={image}
                                    alt={image}
                                    onDragStart={e => e.preventDefault()}
                                />
                            </ImageListItemWrapper>
                        ))}
                    </div>
                </ImagesList>
            </Container>

            <BtnsWrapper>
                <ZoomButtonWrapper>
                    <div onClick={clickZoomInHandler}>
                        <ReactSVG src={zoomIn}/>
                    </div>
                    <div onClick={clickZoomOutHandler}>
                        <ReactSVG src={zoomOut}/>
                    </div>
                </ZoomButtonWrapper>

                <ResetButtonWrapper onClick={resetZoomHandler}>
                    <ReactSVG src={reset}/>
                </ResetButtonWrapper>
            </BtnsWrapper>
        </>
    );

    return ReactDOM.createPortal(galleryContent, galleryRoot);
};

export default Gallery;