import PropTypes from 'prop-types';

export default function TextInput({
    label,
    id,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    className = '',
    disabled = false,
    ...props
}) {
    const inputClass = `
    w-full px-4 py-2 rounded-lg bg-[#F7FAFC] dark:bg-neutral-800 
    text-gray-900 dark:text-gray-100 border border-[#CBD5E0] 
    focus:outline-none focus:ring-2 focus:ring-green-600
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `;

    return (
        <>
            {label && (
                <label htmlFor={id} className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={inputClass}
                required={required}
                disabled={disabled}
                {...props}
            />
        </>
    );
};

TextInput.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};