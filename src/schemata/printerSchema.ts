import {z} from "zod";

export const printerSchema = z.object({
    machine: z
        .string(),
    date: z
        .date(),
    time: z
        .string(),
});