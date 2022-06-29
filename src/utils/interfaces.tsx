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

export interface specificSession {
    message?: string | undefined;
    data?: string[] | undefined;
}