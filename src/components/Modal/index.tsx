import React, {FC, useEffect, useRef} from 'react';
import {Container} from "./style.ts";

interface IModalProps {
    content: React.ReactElement;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal:FC<IModalProps> = ({content, setModalOpen}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef, setModalOpen]);

    return (
        <Container>
            <div ref={modalRef}>
                {content}
            </div>
        </Container>
    );
};

export default Modal;