import {z} from "zod";
import {useThemeStore} from "@store/useThemeStore.ts";
import {DATE_REGEX} from "@constants/regex.ts";
import {messageCategories} from "@constants/messageCategories.ts";


const EducationSchemaProvider = () => {
    const {lang} = useThemeStore();

    const dateRangeSchema = z.object({
        startDate: z.string().optional().refine((value) => {
            return value === "" || DATE_REGEX.test(value as string);
        }, {
            message: messageCategories.dateForm[lang],
        }),
        endDate: z.string().optional().refine((value) => {
            return value === "" || DATE_REGEX.test(value as string);
        }, {
            message: messageCategories.dateForm[lang],
        }),
    })
        .refine((data) => {
            if (!data.startDate && !data.endDate) return true;

            if (data.startDate && data.endDate) {
                const startDay = new Date(data.startDate);
                const endDay = new Date(data.endDate);
                return startDay <= endDay;
            }

            return false;
        }, {
            message: messageCategories.dateSequence[lang],
            path: ["endDate"],
        });

    return {dateRangeSchema};
};


export default EducationSchemaProvider;