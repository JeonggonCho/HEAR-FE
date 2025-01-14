import {z} from "zod";
import {EducationType} from "@/types/education.ts";


const TestSchemaProvider = (questions: EducationType[]) => {
    const testSchema = z.object(
        Object.fromEntries(
            questions.map((question) => [
                question._id,
                question.questionType === "shortAnswer"
                    ? z.string().optional()
                    : z.array(z.string()).optional(),
            ])
        )
    );

    return {testSchema};
};

export default TestSchemaProvider;