import PropTypes from "prop-types";
import { Edit2 } from "lucide-react";

function EditIconButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Edit section"
            className="ml-2 p-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-green-600 transition"
        >
            <Edit2 className="h-4 w-4 text-gray-700 dark:text-gray-100 text-sm" />
        </button>
    );
}

EditIconButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export function Section({ title, onEdit, children }) {
    return (
        <div className="mb-6 relative">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white flex items-center justify-between">
                <span>{title}</span>
                {onEdit && <EditIconButton onClick={onEdit} />}
            </h3>
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 space-y-2 shadow-sm">
                {children}
            </div>
        </div>
    );
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    onEdit: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export function Row({ label, value }) {
    return (
        <div className="flex justify-between text-sm">
            <span
                className="text-gray-600 dark:text-gray-400 max-w-[40%] truncate"
                title={label}
            >
                {label}
            </span>
            <span
                className="font-medium text-gray-900 dark:text-gray-200 max-w-[55%] truncate"
                title={value || ""}
            >
                {value || <span className="italic text-gray-400">Not provided</span>}
            </span>
        </div>
    );
}

Row.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default function ReviewSubmit({ formData, prevStep, handlePage }) {
    const handleFinalSubmit = () => {
        alert("Your details have been submitted successfully!");
    };

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 transition-colors duration-300 py-8">
            <div className="h-full mx-auto w-full max-w-3xl bg-transparent sm:py-4 lg:p-8 overflow-auto no-scrollbar">
                <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                    Review <span className="text-green-600">Your Details</span>
                </h2>

                {/* Account Setup */}
                <Section title="Account Setup" onEdit={() => handlePage(1)}>
                    <Row label="Email" value={formData.email} />
                    <Row label="Mobile" value={formData.mobile} />
                    <Row label="Password" value={"••••••••"} />
                </Section>

                {/* Basic Info */}
                <Section title="Basic Information" onEdit={() => handlePage(2)}>
                    <Row label="First Name" value={formData.basicInfo?.firstName} />
                    <Row label="Last Name" value={formData.basicInfo?.lastName} />
                    <Row label="Date of Birth" value={formData.basicInfo?.dob} />
                    <Row label="Gender" value={formData.basicInfo?.gender} />
                    <Row label="Contact Number" value={formData.basicInfo?.contactNumber} />
                    <Row label="Address" value={formData.basicInfo?.address} />
                </Section>

                {/* Professional Info */}
                <Section title="Professional Information" onEdit={() => handlePage(3)}>
                    <Row label="Specialization" value={formData.professionalInfo?.specialization} />
                    <Row label="Experience" value={formData.professionalInfo?.experience ? `${formData.professionalInfo?.experience} years` : undefined} />
                    <Row label="Hospital/Clinic" value={formData.professionalInfo?.hospital} />
                    <Row label="License Number" value={formData.professionalInfo?.licenseNumber} />
                    <Row label="Qualification" value={formData.professionalInfo?.qualification} />
                    <Row label="Awards" value={formData.professionalInfo?.awards} />
                    <Row label="Expertise" value={formData.professionalInfo?.expertise} />
                    <Row label="Bio" value={formData.professionalInfo?.bio} />
                </Section>

                {/* Education Info */}
                <Section title="Education Information" onEdit={() => handlePage(4)}>
                    <Row label="Degree" value={formData.educationInfo?.degree} />
                    <Row label="College/University" value={formData.educationInfo?.college} />
                    <Row label="Passing Year" value={formData.educationInfo?.passingYear} />
                    <Row label="Specialization" value={formData.educationInfo?.specialization} />
                    <Row label="Registration Number" value={formData.educationInfo?.registrationNumber} />
                    <Row label="Currently Studying" value={formData.educationInfo?.currentlyStudying ? "Yes" : "No"} />
                </Section>

                {/* Bank Info */}
                <Section title="Bank Information (Optional)" onEdit={() => handlePage(5)}>
                    <Row label="Bank Name" value={formData.bankInfo?.bankName} />
                    <Row label="Account Number" value={formData.bankInfo?.accountNo} />
                    <Row label="IFSC Code" value={formData.bankInfo?.ifsc} />
                </Section>

                {/* Buttons */}
                <div className="mt-8 flex justify-between">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition"
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="px-6 py-2 bg-[#1A8151] hover:bg-[#13623d] text-white rounded-lg font-medium transition"
                    >
                        Submit Application
                    </button>
                </div>
            </div>
        </div>
    );
}

ReviewSubmit.propTypes = {
    formData: PropTypes.shape({
        email: PropTypes.string,
        mobile: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string,
        privacyAgreed: PropTypes.bool,
        basicInfo: PropTypes.object,
        professionalInfo: PropTypes.object,
        educationInfo: PropTypes.object,
        bankInfo: PropTypes.object,
    }).isRequired,
    prevStep: PropTypes.func.isRequired,
    handlePage: PropTypes.func.isRequired,
};
