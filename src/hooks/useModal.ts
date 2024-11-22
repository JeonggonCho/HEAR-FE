import {MouseEvent, useEffect, useState} from "react";

const useModal = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);

    const open = () => {
        setShowModal(true);
    };

    const close = (e: MouseEvent) => {
        e.stopPropagation();
        setShowModal(false);
    };

    // 모달 창 외부의 background 클릭 시, 모달 닫히게 하기
    // useEffect(() => {
    //     const handleClickOutside = (e: MouseEvent) => {
    //         if (backdropRef.current && modalRef.current && backdropRef.current.contains(e.target as Node) && !modalRef.current.contains(e.target as Node)) {
    //             setShowModal(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, [modalRef, setShowModal]);

    return {showModal, open, close};
};

export default useModal;