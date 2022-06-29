export interface submissionData {
    title?: string | null;
    date?: string | null;
    exercises?: string[] | null[];
    reps?: number[][] | null;
    weights?: number[][] | null
}

export interface exercises {
    message?: string | undefined;
    data?: string[] | undefined;
}

export interface specificSessionInput {
    date: string;
    title: string;
}

export interface specificSessionOutput {
    date: string;
    title: string;
}