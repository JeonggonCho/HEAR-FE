import {z} from "zod";
import {DATE_REGEX} from "@constants/regex.ts";
import {timeRegex} from "@constants/regex.ts";

export const timeRangeSchema = z.object({
    startTime: z.string().regex(timeRegex, "시작 시간이 유효한 시간 형식이 아닙니다."),
    endTime: z.string().regex(timeRegex, "종료 시간이 유효한 시간 형식이 아닙니다."),
}).refine((data) => {
    const startHour = Number(data.startTime.split(":")[0]);
    const endHour = Number(data.endTime.split(":")[0]);
    return startHour < endHour;
}, {
    message: "시작 시간은 종료 시간보다 이전이여야 합니다",
    path: ["endTime"],
});

export const newMachineSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "기기명을 입력해주세요"),
});

export const updateHeatCountSchema = z.object({
    count: z
        .number()
        .int()
        .min(0).max(15),
});

export const cncHeatSchema = z.object({
    check: z
        .boolean()
        .refine(val => val, {message: "해당 항목에 체크가 되어야 합니다"}),
    date: z
        .string()
        .min(1, "날짜를 선택해주세요")
        .regex(DATE_REGEX, "날짜 형식은 YYYY-MM-DD이어야 합니다"),
});

export const laserSchema = z.object({
    machine: z
        .string()
        .min(1, "기기를 선택해주세요"),
    date: z
        .string()
        .min(1, "날짜를 선택해주세요")
        .regex(DATE_REGEX, "날짜 형식은 YYYY-MM-DD이어야 합니다"),
    time: z
        .string()
        .min(1, "시간을 선택해주세요"),
});

export const printerSchema = z.object({
    machine: z
        .string()
        .min(1, "기기를 선택해주세요"),
    date: z
        .string()
        .min(1, "날짜를 선택해주세요")
        .regex(DATE_REGEX, "날짜 형식은 YYYY-MM-DD이어야 합니다"),
});

export const sawVacuumSchema = z.object({
    date: z
        .string()
        .min(1, "날짜를 선택해주세요")
        .regex(DATE_REGEX, "날짜 형식은 YYYY-MM-DD이어야 합니다"),
    startTime: z.string().regex(timeRegex, "시작 시간이 유효한 시간 형식이 아닙니다."),
    endTime: z.string().regex(timeRegex, "종료 시간이 유효한 시간 형식이 아닙니다."),
}).refine((data) => {
    const startHour = Number(data.startTime.split(":")[0]);
    const endHour = Number(data.endTime.split(":")[0]);
    return startHour < endHour;
}, {
    message: "시작 시간은 종료 시간보다 이전이여야 합니다",
    path: ["endTime"],
});

export const laserTimeSchema = z.object({
    laser: z
        .string()
        .min(1, "레이저 커팅기를 선택해주세요"),
    times: z
        .array(z.string())
        .min(1, "시간을 최소 1개 이상 선택해주세요")
        .max(2, "최대 예약 가능 횟수만큼 시간 선택이 가능합니다"),
});