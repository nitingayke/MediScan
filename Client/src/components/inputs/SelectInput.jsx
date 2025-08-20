import PropTypes from 'prop-types';

export default function SelectInput({
    label,
    id,
    name,
    value,
    onChange,
    options = [],
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
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={inputClass}
                required={required}
                disabled={disabled}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
};

SelectInput.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            label: PropTypes.string,
        })
    ),
    required: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};