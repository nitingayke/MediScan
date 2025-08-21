import { useState } from "react";
import PropTypes from 'prop-types';
import TextInput from "../../../../components/inputs/TextInput";
import SelectInput from "../../../../components/inputs/SelectInput";
import TextArea from "../../../../components/inputs/TextArea";
import ImageUpload from "../../../../components/inputs/ImageInput";
import BackButton from "../../../../components/common/BackButton";

export default function BasicInfo({ formData, setFormData, nextStep, prevStep }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            basicInfo: {
                ...prev.basicInfo,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (imageData) => {
        setFormData((prev) => ({
            ...prev,
            basicInfo: {
                ...prev.basicInfo,
                personalPhoto: imageData,
            },
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const { basicInfo } = formData;

        if (!basicInfo?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!basicInfo?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!basicInfo?.dob) newErrors.dob = 'Date of birth is required';
        if (!basicInfo?.gender) newErrors.gender = 'Gender is required';
        if (!basicInfo?.contactNumber?.trim()) newErrors.contactNumber = 'Contact number is required';
        if (!basicInfo?.address?.trim()) newErrors.address = 'Address is required';

        // Validate contact number format (regex)
        if (basicInfo?.contactNumber && !/^\+?[\d\s\-()]{10,}$/.test(basicInfo.contactNumber)) {
            newErrors.contactNumber = 'Please enter a valid contact number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            nextStep();
        }, 1500);
    };

    const genderOptions = [
        { value: "", label: "Select Gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
        { value: "prefer_not_to_say", label: "Prefer not to say" },
    ];

    const getMaxBirthDate = () => {
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        return maxDate.toISOString().split('T')[0];
    };

    const getMinBirthDate = () => {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
        return minDate.toISOString().split('T');
    };

    return (
        <div className="relative w-full md:w-1/2 h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 transition-colors duration-300 py-8">
            <div className="h-full mx-auto w-full max-w-2xl bg-transparent sm:py-4 lg:p-8 overflow-auto no-scrollbar">
                <BackButton
                    position="top-5 left-5"
                    className="hidden sm:flex"
                    onClick={prevStep}
                />
                <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                    Basic <span className="text-green-600">Information</span>
                </h2>
                <form onSubmit={handleSubmit} className="px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <TextInput
                                label="First Name"
                                id="firstName"
                                name="firstName"
                                value={formData.basicInfo?.firstName || ""}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                                error={errors.firstName}
                            />
                        </div>
                        <div>
                            <TextInput
                                label="Last Name"
                                id="lastName"
                                name="lastName"
                                value={formData.basicInfo?.lastName || ""}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                                error={errors.lastName}
                            />
                        </div>
                        <div>
                            <label htmlFor="dob" className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.basicInfo?.dob || ""}
                                onChange={handleChange}
                                required
                                max={getMaxBirthDate()}
                                min={getMinBirthDate()}
                                className="w-full px-4 py-2 rounded-lg bg-[#F7FAFC] dark:bg-neutral-800 text-gray-900 dark:text-gray-100 border border-[#CBD5E0] focus:outline-none focus:ring-2 focus:ring-green-600"
                            />
                            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                        </div>
                        <div>
                            <SelectInput
                                label="Gender"
                                id="gender"
                                name="gender"
                                value={formData.basicInfo?.gender || ""}
                                onChange={handleChange}
                                options={genderOptions}
                                required
                                error={errors.gender}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TextInput
                                label="Contact Number"
                                id="contactNumber"
                                name="contactNumber"
                                type="tel"
                                value={formData.basicInfo?.contactNumber || ""}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                                required
                                error={errors.contactNumber}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <TextArea
                                label="Address"
                                id="address"
                                name="address"
                                value={formData.basicInfo?.address || ""}
                                onChange={handleChange}
                                placeholder="Enter your complete address"
                                rows={3}
                                required
                                error={errors.address}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <ImageUpload
                                label="Personal Photo (Optional)"
                                id="personalPhoto"
                                name="personalPhoto"
                                value={formData.basicInfo?.personalPhoto || null}
                                onChange={handleImageChange}
                                helpText="Upload a professional headshot (JPG, PNG, max 5MB)"
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-between">
                        <button
                            type="button"
                            onClick={prevStep}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-[#1A8151] hover:bg-[#13623d] text-white rounded-lg font-medium transition disabled:opacity-60"
                        >
                            {loading ? "Saving..." : "Save & Continue"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

BasicInfo.propTypes = {
    formData: PropTypes.shape({
        basicInfo: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            dob: PropTypes.string,
            gender: PropTypes.string,
            contactNumber: PropTypes.string,
            address: PropTypes.string,
            personalPhoto: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object
            ]),
        })
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired
};
