import {z} from "zod";
import {DATE_REGEX} from "@constants/reservationRegex.ts";

export const printerSchema = z.object({
    machine: z
        .string()
        .min(1, "기기를 선택해주세요"),
    date: z
        .string()
        .min(1, "날짜를 선택해주세요.")
        .regex(DATE_REGEX, "날짜 형식은 YYYY-MM-DD이어야 합니다"),
    time: z
        .string()
        .min(1, "시간을 선택해주세요"),
});