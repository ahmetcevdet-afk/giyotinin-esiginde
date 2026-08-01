import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import "./PasswordInput.css";

function PasswordInput({
    label,
    name,
    id,
    value,
    onChange,
    placeholder = "Şifrenizi girin",
    error,
    disabled = false,
    required = false,
    autoComplete = "current-password",
}) {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="password-group">

            {label && (

                <label
                    htmlFor={id || name}
                    className="password-label"
                >
                    {label}

                    {required && (
                        <span className="required">*</span>
                    )}

                </label>

            )}

            <div className="password-wrapper">

                <input
                    id={id || name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    className={`password-input ${error ? "password-error" : ""}`}
                />

                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                        showPassword
                            ? "Şifreyi gizle"
                            : "Şifreyi göster"
                    }
                >

                    {showPassword
                        ? <EyeOff size={18}/>
                        : <Eye size={18}/>
                    }

                </button>

            </div>

            {error && (

                <span className="password-error-text">

                    {error}

                </span>

            )}

        </div>

    );

}

export default PasswordInput;