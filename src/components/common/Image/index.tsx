import {FC, useState} from "react";

import Gallery from "@components/common/Gallery";

import {IImageProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";


const Image:FC<IImageProps> = ({images, targetIndex, currentImage, setCurrentImage}) => {
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