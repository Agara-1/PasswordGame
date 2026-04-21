export interface SequenceResult {
    isValid: boolean;
    count: number;
}

export const checkSequence = (password: string): SequenceResult => {
    let count = 0;


    for (let i = 0; i <= password.length - 4; i++) {
        const chunk = password.substring(i, i + 4);

        const hasLower = /[a-z]/.test(chunk);
        const hasUpper = /[A-Z]/.test(chunk);
        const hasNum = /[0-9]/.test(chunk);
        const hasSpecial = /[!@#$%^&*]/.test(chunk);

        if (hasLower && hasUpper && hasNum && hasSpecial) {
            count++;
        }
    }

    return { isValid: count > 0, count };
};