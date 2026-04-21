import React from 'react';

interface Props {
    password: string;
}

export const PasswordStrength: React.FC<Props> = ({ password }) => {
    const lengthValid = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNum = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    const score = [lengthValid, hasUpper, hasNum, hasSpecial].filter(Boolean).length;
    const strength = score < 2 ? "Slabé" : score < 4 ? "Střední" : "Silné";
    const color = score < 2 ? "red" : score < 4 ? "orange" : "green";

    return (
        <div>
            <div className="strength-bar-bg">
                <div
                    className="strength-bar-fill"
                    style={{ width: `${score * 25}%`, backgroundColor: color }}
                />
            </div>

            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>
                Síla hesla: <span style={{ color }}>{strength}</span>
            </p>

            <ul className="criteria-list">
                <li style={{ color: lengthValid ? 'green' : 'gray' }}>
                    {lengthValid ? '✓' : '○'} Minimálně 8 znaků
                </li>
                <li style={{ color: hasUpper ? 'green' : 'gray' }}>
                    {hasUpper ? '✓' : '○'} Obsahuje velké písmeno
                </li>
                <li style={{ color: hasNum ? 'green' : 'gray' }}>
                    {hasNum ? '✓' : '○'} Obsahuje číslo
                </li>
                <li style={{ color: hasSpecial ? 'green' : 'gray' }}>
                    {hasSpecial ? '✓' : '○'} Speciální znak (!@#$%^&*)
                </li>
            </ul>
        </div>
    );
};