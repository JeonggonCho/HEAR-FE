import {z} from "zod";

export const laserSchema = z.object({
    machine: z
        .string(),
    date: z
        .date(),
    time: z
        .string(),
});