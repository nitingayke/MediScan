import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function OTPInput({
    digits = 6,
    value = '',
    onChange,
    className = '',
    disabled = false,
    autoFocus = true,
    ...props
}) {
    const [otp, setOtp] = useState(Array(digits).fill(''));
    const inputRefs = useRef([]);

    useEffect(() => {
        if (value && value.length === digits) {
            setOtp(value.split(''));
        }
    }, [value, digits]);

    useEffect(() => {
        if (autoFocus && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [autoFocus]);

    const handleChange = (index, e) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);

        setOtp(newOtp);

        if (value && index < digits - 1) {
            inputRefs.current[index + 1].focus();
        }

        const otpString = newOtp.join('');
        onChange(otpString);
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain');

        // Only allow numbers
        if (!/^\d+$/.test(pastedData)) return;

        const digitsArray = pastedData.substring(0, digits).split('');
        const newOtp = [...otp];

        digitsArray.forEach((digit, i) => {
            if (i < digits) {
                newOtp[i] = digit;
            }
        });

        setOtp(newOtp);

        // Focus on the next empty input or the last one
        const nextEmptyIndex = newOtp.findIndex(val => val === '');
        const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : digits - 1;

        if (inputRefs.current[focusIndex]) {
            inputRefs.current[focusIndex].focus();
        }

        // Call onChange with the complete OTP string
        const otpString = newOtp.join('');
        onChange(otpString);
    };

    const inputClass = `
    w-10 h-12 sm:w-12 sm:h-12 text-center rounded-lg bg-[#F7FAFC] dark:bg-neutral-800 
    text-gray-900 dark:text-gray-100 border border-[#CBD5E0] 
    focus:outline-none focus:ring-2 focus:ring-green-600
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `;

    return (
        <div className="flex justify-center !space-x-2">
            {otp.map((digit, index) => (
                <input
                    key={index * 0.1548}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={inputClass}
                    disabled={disabled}
                    {...props}
                />
            ))}
        </div>
    );
}

OTPInput.propTypes = {
    digits: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
};