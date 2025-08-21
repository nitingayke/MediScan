import { useState } from "react";
import PropTypes from 'prop-types';
import TextInput from "../../../../components/inputs/TextInput";
import SelectInput from "../../../../components/inputs/SelectInput";
import TextArea from "../../../../components/inputs/TextArea";
import BackButton from "../../../../components/common/BackButton";

export default function ProfessionalInfo({ formData, setFormData, nextStep, prevStep }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            professionalInfo: {
                ...prev.professionalInfo,
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
        const { professionalInfo } = formData;

        if (!professionalInfo?.specialization?.trim()) {
            newErrors.specialization = 'Specialization is required';
        }
        if (!professionalInfo?.experience) {
            newErrors.experience = 'Experience is required';
        }
        if (!professionalInfo?.hospital?.trim()) {
            newErrors.hospital = 'Hospital/Clinic name is required';
        }
        if (!professionalInfo?.licenseNumber?.trim()) {
            newErrors.licenseNumber = 'Medical license number is required';
        }
        if (!professionalInfo?.qualification?.trim()) {
            newErrors.qualification = 'Qualification is required';
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

    const specializationOptions = [
        { value: "", label: "Select Specialization" },
        { value: "cardiology", label: "Cardiology" },
        { value: "dermatology", label: "Dermatology" },
        { value: "endocrinology", label: "Endocrinology" },
        { value: "gastroenterology", label: "Gastroenterology" },
        { value: "general_medicine", label: "General Medicine" },
        { value: "general_surgery", label: "General Surgery" },
        { value: "gynecology", label: "Gynecology / Obstetrics" },
        { value: "neurology", label: "Neurology" },
        { value: "orthopedics", label: "Orthopedics" },
        { value: "pediatrics", label: "Pediatrics" },
        { value: "psychiatry", label: "Psychiatry" },
        { value: "pulmonology", label: "Pulmonology" },
        { value: "urology", label: "Urology" },
        { value: "oncology", label: "Oncology (Cancer)" },
        { value: "nephrology", label: "Nephrology (Kidney)" },
        { value: "ophthalmology", label: "Ophthalmology (Eye)" },
        { value: "otolaryngology", label: "ENT (Ear, Nose, Throat)" },
        { value: "radiology", label: "Radiology" },
        { value: "anesthesiology", label: "Anesthesiology" },
        { value: "emergency_medicine", label: "Emergency Medicine" },
        { value: "family_medicine", label: "Family Medicine / Primary Care" },
        { value: "rheumatology", label: "Rheumatology" },
        { value: "infectious_disease", label: "Infectious Disease" },
        { value: "critical_care", label: "Critical Care / ICU" },
        { value: "other", label: "Other" },
    ];


    const experienceOptions = [
        { value: "", label: "Select Experience" },
        { value: "0-1", label: "0-1 years" },
        { value: "1-3", label: "1-3 years" },
        { value: "3-5", label: "3-5 years" },
        { value: "5-10", label: "5-10 years" },
        { value: "10+", label: "10+ years" },
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
                    Professional <span className="text-green-600">Information</span>
                </h2>

                <form onSubmit={handleSubmit} className="px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <SelectInput
                                label="Specialization"
                                id="specialization"
                                name="specialization"
                                value={formData.professionalInfo?.specialization || ""}
                                onChange={handleChange}
                                options={specializationOptions}
                                required
                                error={errors.specialization}
                            />
                        </div>

                        <div>
                            <SelectInput
                                label="Years of Experience"
                                id="experience"
                                name="experience"
                                value={formData.professionalInfo?.experience || ""}
                                onChange={handleChange}
                                options={experienceOptions}
                                required
                                error={errors.experience}
                            />
                        </div>

                        <div>
                            <TextInput
                                label="Qualification"
                                id="qualification"
                                name="qualification"
                                value={formData.professionalInfo?.qualification || ""}
                                onChange={handleChange}
                                placeholder="e.g., MBBS, MD, MS, etc."
                                required
                                error={errors.qualification}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextInput
                                label="Hospital/Clinic Name"
                                id="hospital"
                                name="hospital"
                                value={formData.professionalInfo?.hospital || ""}
                                onChange={handleChange}
                                placeholder="Enter hospital or clinic name"
                                required
                                error={errors.hospital}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextInput
                                label="Medical License Number"
                                id="licenseNumber"
                                name="licenseNumber"
                                value={formData.professionalInfo?.licenseNumber || ""}
                                onChange={handleChange}
                                placeholder="Enter your medical license number"
                                required
                                error={errors.licenseNumber}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextArea
                                label="Bio/Introduction (Optional)"
                                id="bio"
                                name="bio"
                                value={formData.professionalInfo?.bio || ""}
                                onChange={handleChange}
                                placeholder="Brief introduction about yourself and your practice"
                                rows={4}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextArea
                                label="Areas of Expertise (Optional)"
                                id="expertise"
                                name="expertise"
                                value={formData.professionalInfo?.expertise || ""}
                                onChange={handleChange}
                                placeholder="List your areas of expertise or special procedures"
                                rows={3}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextArea
                                label="Awards & Achievements (Optional)"
                                id="awards"
                                name="awards"
                                value={formData.professionalInfo?.awards || ""}
                                onChange={handleChange}
                                placeholder="List any awards, certifications, or achievements"
                                rows={2}
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

ProfessionalInfo.propTypes = {
    formData: PropTypes.shape({
        professionalInfo: PropTypes.shape({
            specialization: PropTypes.string,
            experience: PropTypes.string,
            qualification: PropTypes.string,
            hospital: PropTypes.string,
            licenseNumber: PropTypes.string,
            bio: PropTypes.string,
            expertise: PropTypes.string,
            awards: PropTypes.string,
        })
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired
};