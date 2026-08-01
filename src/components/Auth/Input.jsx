import "./Input.css";

function Input({
    label,
    type = "text",
    name,
    id,
    value,
    onChange,
    placeholder,
    error,
    disabled = false,
    required = false,
    autoComplete,
}) {
    return (
        <div className="input-group">

            {label && (
                <label
                    htmlFor={id || name}
                    className="input-label"
                >
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}

            <input
                id={id || name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                className={`input-field ${error ? "input-error" : ""}`}
            />

            {error && (
                <span className="input-error-text">
                    {error}
                </span>
            )}

        </div>
    );
}

export default Input;