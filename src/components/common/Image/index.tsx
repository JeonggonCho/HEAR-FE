import React, {useState} from "react";
import Gallery from "@components/common/Gallery";
import {Container} from "./style.ts";


interface IImageProps {
    images: string[];
    targetIndex: number;
    currentImage?: number;
    setCurrentImage?: React.Dispatch<React.SetStateAction<number>>;
}


const Image = (
    {
        images,
        targetIndex,
        currentImage,
        setCurrentImage
    }: IImageProps
) => {
    const [showGallery, setShowGallery] = useState<boolean>(false);

    const clickImageHandler = (targetIndex:number) => {
        setCurrentImage && setCurrentImage(targetIndex);
        setShowGallery(true);
    };

    return (
        <>
            <Container
                onClick={() => clickImageHandler(targetIndex)}
                onDragStart={e => e.preventDefault()}
            >
                <img src={images[targetIndex]} alt={images[targetIndex]}/>
            </Container>

            {showGallery &&
                <Gallery
                  images={images}
                  currentImage={currentImage}
                  setGallery={setShowGallery}
                  setCurrentImage={setCurrentImage}
                />
            }
        </>
    );
};

export default Image;