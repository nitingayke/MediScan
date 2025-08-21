import { useRef } from "react";
import PropTypes from "prop-types";
import { UploadCloud, X } from "lucide-react";

export default function ImageInput({
    label,
    id,
    name,
    value,
    onChange,
    placeholder = "Click to upload or drag and drop",
    helpText = "JPG, PNG, GIF (MAX. 5MB)",
    required = false,
    className = "",
    disabled = false,
    accept = "image/*",
    ...props
}) {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB limit");
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                onChange({
                    file,
                    preview: event.target.result,
                    name: file.name,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (disabled) return;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const event = { target: { files: [file] } };
            handleFileChange(event);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const containerClass = `
    w-full rounded-lg border border-dashed border-[#CBD5E0] 
    bg-[#F7FAFC] dark:bg-neutral-800 overflow-hidden p-1
    ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-green-400"}
    ${className}
  `;

    return (
        <div className="flex flex-col">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm mb-1 text-gray-700 dark:text-gray-300"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <input
                ref={fileInputRef}
                id={id}
                name={name}
                type="file"
                className="hidden"
                accept={accept}
                onChange={handleFileChange}
                disabled={disabled}
                {...props}
            />

            {value ? (
                <div className="relative">
                    <div className={containerClass}>
                        <img
                            src={value.preview || value}
                            alt="Preview"
                            className="w-full max-h-48 object-contain rounded-lg"
                        />
                    </div>
                    {!disabled && (
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        >
                            <X size={16} strokeWidth={2} />
                        </button>
                    )}
                    {value.name && (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                            {value.name}
                        </p>
                    )}
                </div>
            ) : (
                <label
                    htmlFor={id}
                    className={containerClass}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                        <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                            {placeholder}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {helpText}
                        </p>
                    </div>
                </label>
            )}
        </div>
    );
}

ImageInput.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    helpText: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
};
