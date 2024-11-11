import {z} from "zod";

import {useThemeStore} from "@store/useThemeStore.ts";
import {DATE_REGEX, TIME_REGEX} from "@constants/regex.ts";
import {messageCategories} from "@constants/messageCategories.ts";

const MachineSchemaProvider = () => {
    const {lang} = useThemeStore();

    const timeRangeSchema = z.object({
        startTime: z.string().regex(TIME_REGEX, messageCategories.startTimeForm[lang]),
        endTime: z.string().regex(TIME_REGEX, messageCategories.endTimeForm[lang]),
    }).refine((data) => {
        const startHour = Number(data.startTime.split(":")[0]);
        const endHour = Number(data.endTime.split(":")[0]);
        return startHour < endHour;
    }, {
        message: messageCategories.timeSequence[lang],
        path: ["endTime"],
    });

    const newMachineSchema = z.object({
        name: z
            .string()
            .trim()
            .min(1, messageCategories.machineName[lang]),
    });

    const updateHeatCountSchema = z.object({
        count: z
            .number()
            .int()
            .min(0).max(15),
    });

    const cncHeatSchema = z.object({
        check: z
            .boolean()
            .refine(val => val, {message: messageCategories.mustCheck[lang]}),
        date: z
            .string()
            .min(1, messageCategories.selectDate[lang])
            .regex(DATE_REGEX, messageCategories.dateForm[lang]),
    });

    const sawVacuumSchema = z.object({
        date: z
            .string()
            .min(1, messageCategories.selectDate[lang])
            .regex(DATE_REGEX, messageCategories.dateForm[lang]),
        startTime: z.string().regex(TIME_REGEX, messageCategories.startTimeForm[lang]),
        endTime: z.string().regex(TIME_REGEX, messageCategories.endTimeForm[lang]),
    }).refine((data) => {
        const startHour = Number(data.startTime.split(":")[0]);
        const endHour = Number(data.endTime.split(":")[0]);
        return startHour < endHour;
    }, {
        message: messageCategories.timeSequence[lang],
        path: ["endTime"],
    });

    const laserTimeSchema = z.object({
        laser: z
            .string()
            .min(1, messageCategories.selectLaser[lang]),
        times: z
            .array(z.string())
            .min(1, messageCategories.minimumSelectTime[lang])
            .max(2, messageCategories.maximumSelectTime[lang]),
    });

    return {timeRangeSchema, newMachineSchema, updateHeatCountSchema, cncHeatSchema, sawVacuumSchema, laserTimeSchema}
};

export default MachineSchemaProvider;