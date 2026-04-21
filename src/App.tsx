import { useState } from 'react';
import { PasswordInput } from './PasswordInput';
import { PasswordStrength } from './PasswordStrength';
import { checkTime } from './PasswordTimeValidator';
import { checkSequence } from './CharacterSequenceValidator';
import './App.css'; // Nezapomeň importovat CSS!

export default function App() {
    const [password, setPassword] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);

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
        <div className="app-container">
            <h1>Kontrola hesla</h1>

            <PasswordInput password={password} setPassword={handlePasswordChange} />

            {timeResult.isTooFast && (
                <p className="alert-error">⚠️ {timeResult.message}</p>
            )}

            <div
                className="sequence-box"
                style={{
                    backgroundColor: sequenceResult.isValid ? '#e8f5e9' : '#f5f5f5',
                    border: sequenceResult.isValid ? '1px solid #4caf50' : '1px solid #ccc'
                }}
            >
                <p style={{ margin: 0 }}>
                    Speciální sekvence (4 různé typy znaků):{' '}
                    <strong>{sequenceResult.isValid ? 'Nalezena ✅' : 'Chybí ❌'}</strong>
                </p>
            </div>

            <PasswordStrength password={password} />
        </div>
    );
}