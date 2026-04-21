export interface TimeResult {
    isTooFast: boolean;
    message: string;
}

export const checkTime = (startTime: number | null): TimeResult => {
    if (!startTime) return { isTooFast: false, message: "" };
    const diff = (Date.now() - startTime) / 1000;
    return {
        isTooFast: diff < 2,
        message: diff < 2 ? "Zadano moc rychle" : ""
    };
};