import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PasswordInput } from './PasswordInput';
import { PasswordStrength } from './PasswordStrength';
import { checkTime } from './PasswordTimeValidator';
import { checkSequence } from './CharacterSequenceValidator';
import { CountryFlagValidator } from './CountryValidator';

const evaluatePassword = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[!@#$%^&*]/.test(pwd)) score++;

    if (score < 2) return "Slabé";
    if (score < 4) return "Střední";
    return "Silné";
};

export default function App() {
    const [password, setPassword] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [passwordStrength, setPasswordStrength] = useState("Slabé");

    useEffect(() => {
        const strength = evaluatePassword(password);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPasswordStrength(strength);
    }, [password]);

    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword(prevPassword => {
                const action = Math.random() < 0.5 ? 'add' : 'remove';
                if (action === 'add') {
                    return prevPassword + "😜";
                } else {
                    if (prevPassword.length === 0) return prevPassword;
                    const index = Math.floor(Math.random() * prevPassword.length);
                    return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
                }
            });
        }, 10000);

        return () => clearInterval(sabotageInterval);
    }, []);

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
        if (newPassword.length > 0 && startTime === null) {
            setStartTime(Date.now());
        } else if (newPassword.length === 0) {
            setStartTime(null);
        }
    };

    const timeResult = checkTime(startTime);
    const sequenceResult = checkSequence(password);

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center theme-bg transition-all p-3">
            <div className="theme-card shadow-sm rounded-4 p-4 p-md-5 w-100" style={{ maxWidth: '440px' }}>

                <h2 className="text-center mb-4 fw-bold theme-text">Kontrola hesla</h2>

                <PasswordInput password={password} setPassword={handlePasswordChange} />

                {timeResult.isTooFast && (
                    <div className="alert alert-danger py-2 px-3 mt-3 text-center" role="alert">
                        ⚠️ {timeResult.message}
                    </div>
                )}

                <div className="mt-3 p-3 rounded-3 theme-info-box border text-center">
                    Speciální sekvence:{' '}
                    <strong style={{ color: sequenceResult.isValid ? 'var(--clr-success)' : 'inherit' }}>
                        {sequenceResult.isValid ? 'Nalezena ✅' : 'Chybí ❌'}
                    </strong>
                </div>


                <CountryFlagValidator password={password} />

                <PasswordStrength password={password} strengthLevel={passwordStrength} />
            </div>
        </div>
    );
}