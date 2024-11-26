import {useEffect, useRef, useState} from "react";


const useModal = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("no-scroll");
        }
        return () => document.body.classList.remove("no-scroll");
    }, [showModal]);

    // 모달 창 외부의 backdrop 클릭 시, 모달 닫히게 하기
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            if (
                backdropRef.current &&
                modalRef.current &&
                backdropRef.current.contains(target) &&
                !modalRef.current.contains(target)
            ) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [backdropRef, modalRef, setShowModal]);

    return {showModal, setShowModal, modalRef, backdropRef};
};

export default useModal;