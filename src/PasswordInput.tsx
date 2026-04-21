import React, { useState } from 'react';

interface Props {
    password: string;
    setPassword: (val: string) => void;
}

export const PasswordInput: React.FC<Props> = ({ password, setPassword }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="input-group">
            <input
                className="password-input"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zadejte heslo"
            />
            <button className="toggle-btn" onClick={() => setShow(!show)}>
                {show ? "Skrýt" : "Zobrazit"}
            </button>
        </div>
    );
};