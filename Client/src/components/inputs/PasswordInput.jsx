import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from './TextInput';

export default function PasswordInput({
    label,
    id,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    className = '',
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Input
                label={label}
                id={id}
                type={showPassword ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={className}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 dark:text-gray-400"
                tabIndex={-1}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </>
    );
};

PasswordInput.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
};