import { useState } from "react";
import PropTypes from 'prop-types';
import TextInput from "../../../../components/inputs/TextInput";
import SelectInput from "../../../../components/inputs/SelectInput";
import BackButton from "../../../../components/common/BackButton";

export default function EducationInfo({ formData, setFormData, nextStep, prevStep }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            educationInfo: {
                ...prev.educationInfo,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const { educationInfo } = formData;

        if (!educationInfo?.degree?.trim()) newErrors.degree = 'Degree is required';
        if (!educationInfo?.college?.trim()) newErrors.college = 'College/University is required';
        if (!educationInfo?.passingYear) newErrors.passingYear = 'Passing year is required';

        // Validate passing year is reasonable (between 1950 and current year + 5)
        const currentYear = new Date().getFullYear();
        if (educationInfo?.passingYear) {
            const year = parseInt(educationInfo.passingYear);
            if (year < 1950 || year > currentYear + 5) {
                newErrors.passingYear = 'Please enter a valid passing year';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            nextStep();
        }, 1500);
    };

    const degreeOptions = [
        { value: "", label: "Select Degree" },
        { value: "mbbs", label: "MBBS" },
        { value: "bds", label: "BDS" },
        { value: "bams", label: "BAMS" },
        { value: "bhms", label: "BHMS" },
        { value: "bums", label: "BUMS" },
        { value: "bpt", label: "BPT (Physiotherapy)" },
        { value: "bsc_nursing", label: "B.Sc Nursing" },
        { value: "md", label: "MD" },
        { value: "ms", label: "MS" },
        { value: "dm", label: "DM" },
        { value: "mch", label: "MCh" },
        { value: "mds", label: "MDS" },
        { value: "mph", label: "MPH" },
        { value: "mpt", label: "MPT" },
        { value: "msc_nursing", label: "M.Sc Nursing" },
        { value: "phd", label: "PhD" },
        { value: "diploma", label: "Diploma" },
        { value: "fellowship", label: "Fellowship" },
        { value: "other", label: "Other" },
    ];

    // Generate passing year options (from 1950 to current year + 5)
    const currentYear = new Date().getFullYear();
    const passingYearOptions = [
        { value: "", label: "Select Passing Year" },
        ...Array.from({ length: currentYear + 5 - 1950 + 1 }, (_, i) => {
            const year = currentYear + 5 - i;
            return { value: year.toString(), label: year.toString() };
        })
    ];

    return (
        <div className="relative w-full md:w-1/2 h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 transition-colors duration-300 py-8">
            <div className="h-full mx-auto w-full max-w-2xl bg-transparent sm:py-4 lg:p-8 overflow-auto no-scrollbar">
                <BackButton
                    position="top-5 left-5"
                    className="hidden sm:flex"
                    onClick={prevStep}
                />

                <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                    Education <span className="text-green-600">Information</span>
                </h2>

                <form onSubmit={handleSubmit} className="px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <SelectInput
                                label="Degree/Certification"
                                id="degree"
                                name="degree"
                                value={formData.educationInfo?.degree || ""}
                                onChange={handleChange}
                                options={degreeOptions}
                                required
                                error={errors.degree}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextInput
                                label="College/University"
                                id="college"
                                name="college"
                                value={formData.educationInfo?.college || ""}
                                onChange={handleChange}
                                placeholder="Enter college or university name"
                                required
                                error={errors.college}
                            />
                        </div>

                        <div>
                            <SelectInput
                                label="Passing Year"
                                id="passingYear"
                                name="passingYear"
                                value={formData.educationInfo?.passingYear || ""}
                                onChange={handleChange}
                                options={passingYearOptions}
                                required
                                error={errors.passingYear}
                            />
                        </div>

                        <div>
                            <TextInput
                                label="Specialization (Optional)"
                                id="specialization"
                                name="specialization"
                                value={formData.educationInfo?.specialization || ""}
                                onChange={handleChange}
                                placeholder="e.g., Cardiology, Surgery, etc."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextInput
                                label="Registration Number (Optional)"
                                id="registrationNumber"
                                name="registrationNumber"
                                value={formData.educationInfo?.registrationNumber || ""}
                                onChange={handleChange}
                                placeholder="Medical council registration number"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="currentlyStudying"
                                    name="currentlyStudying"
                                    checked={formData.educationInfo?.currentlyStudying || false}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label htmlFor="currentlyStudying" className="text-sm text-gray-700 dark:text-gray-300">
                                    I am currently studying here
                                </label>
                            </div>
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

EducationInfo.propTypes = {
    formData: PropTypes.shape({
        educationInfo: PropTypes.shape({
            degree: PropTypes.string,
            college: PropTypes.string,
            passingYear: PropTypes.string,
            specialization: PropTypes.string,
            registrationNumber: PropTypes.string,
            currentlyStudying: PropTypes.bool,
        })
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired
};