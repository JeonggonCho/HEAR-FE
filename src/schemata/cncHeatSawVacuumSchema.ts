import {z} from "zod";

export const cncHeatSawVacuumSchema = z.object({
   date: z.date(),
   time: z.string(),
});