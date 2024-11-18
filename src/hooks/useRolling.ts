import {useEffect, useRef, useState} from "react";

const useRolling = (
    contentLength: number,
    intervalTime: number,
    rollingHeight: string,
) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const rollingRef = useRef<HTMLDivElement>(null); // 컨텐츠
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // 타이머

    // 롤링 애니메이션
    useEffect(() => {
        if (contentLength > 0 && !isHovered) {
            intervalRef.current = setInterval(() => {
                if (rollingRef.current) {
                    // 0.5초로 트랜지션 주기
                    rollingRef.current.style.transform = `translateY(-${rollingHeight})`;
                    rollingRef.current.style.transition = "transform 0.5s ease-in-out";

                    setTimeout(() => {
                        rollingRef.current!.style.transition = "none"; // 트랜지션 멈추기
                        rollingRef.current!.appendChild(rollingRef.current!.firstElementChild!); // 첫번째 아이템을 맨 뒤로 추가하기
                        rollingRef.current!.style.transform = `translateY(0)`; // 맨 위로 이동
                    }, 500);
                }
            }, intervalTime);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [contentLength, isHovered]);

    return {setIsHovered, rollingRef, rollingHeight};
};

export default useRolling;