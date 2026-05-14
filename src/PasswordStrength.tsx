import React from 'react';

// Upravili jsme rozhraní, aby komponenta věděla, že jí App.tsx pošle 'strengthLevel'
interface Props {
    password: string;
    strengthLevel: string; // <-- Přidáno
}

export const PasswordStrength: React.FC<Props> = ({ password, strengthLevel }) => {
    const lengthValid = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNum = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);


    const score = [lengthValid, hasUpper, hasNum, hasSpecial].filter(Boolean).length;


    const color = strengthLevel === "Slabé" ? "#dc3545" : strengthLevel === "Střední" ? "#ffc107" : "#198754";

    return (
        <div className="mt-4">
            <div className="progress" style={{ height: '10px' }}>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${score * 25}%`, backgroundColor: color, transition: 'width 0.3s ease-in-out' }}
                />
            </div>

            <p className="mt-2" style={{ fontWeight: 'bold' }}>

                Síla hesla: <span style={{ color }}>{strengthLevel}</span>
            </p>

            <ul className="list-unstyled mt-2">
                <li style={{ color: lengthValid ? '#198754' : 'var(--text-main)' }}>
                    {lengthValid ? '✓' : '○'} Minimálně 8 znaků
                </li>
                <li style={{ color: hasUpper ? '#198754' : 'var(--text-main)' }}>
                    {hasUpper ? '✓' : '○'} Obsahuje velké písmeno
                </li>
                <li style={{ color: hasNum ? '#198754' : 'var(--text-main)' }}>
                    {hasNum ? '✓' : '○'} Obsahuje číslo
                </li>
                <li style={{ color: hasSpecial ? '#198754' : 'var(--text-main)' }}>
                    {hasSpecial ? '✓' : '○'} Speciální znak (!@#$%^&*)
                </li>
            </ul>
        </div>
    );
};