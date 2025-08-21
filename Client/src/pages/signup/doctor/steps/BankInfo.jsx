import { useState } from "react";
import PropTypes from "prop-types";
import BackButton from "../../../../components/common/BackButton";

export default function BankInfo({ formData, setFormData, nextStep, prevStep }) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            bankInfo: {
                ...prev.bankInfo,
                [name]: value,
            },
        }));

        // Clear error if user is fixing that field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const { bankInfo } = formData;

        // Only validate if values are entered
        if (bankInfo?.accountNo && !/^\d{6,18}$/.test(bankInfo.accountNo)) {
            newErrors.accountNo = "Account number must be 6-18 digits";
        }

        if (bankInfo?.ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankInfo.ifsc)) {
            newErrors.ifsc = "Invalid IFSC code format (e.g., ABCD0123456)";
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
        }, 1200);
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
                    Bank <span className="text-green-600">Information</span>
                </h2>

                <form onSubmit={handleSubmit} className="px-4">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Bank Name */}
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="bankName"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Bank Name (Optional)
                            </label>
                            <input
                                type="text"
                                id="bankName"
                                name="bankName"
                                value={formData.bankInfo?.bankName || ""}
                                onChange={handleChange}
                                placeholder="Enter bank name"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none border-gray-300 focus:ring-1 focus:ring-green-600 dark:bg-neutral-800 dark:text-white dark:border-gray-600"
                            />
                        </div>

                        {/* Account Number */}
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="accountNo"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Account Number (Optional)
                            </label>
                            <input
                                type="text"
                                id="accountNo"
                                name="accountNo"
                                value={formData.bankInfo?.accountNo || ""}
                                onChange={handleChange}
                                placeholder="Enter account number"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition ${errors.accountNo
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-600"
                                    } dark:bg-neutral-800 dark:text-white dark:border-gray-600`}
                            />
                            {errors.accountNo && (
                                <p className="text-red-500 text-sm font-medium">{errors.accountNo}</p>
                            )}
                        </div>

                        {/* IFSC Code */}
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="ifsc"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                IFSC Code (Optional)
                            </label>
                            <input
                                type="text"
                                id="ifsc"
                                name="ifsc"
                                value={formData.bankInfo?.ifsc || ""}
                                onChange={handleChange}
                                placeholder="Enter IFSC code"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition ${errors.ifsc
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-green-600"
                                    } dark:bg-neutral-800 dark:text-white dark:border-gray-600`}
                            />
                            {errors.ifsc && (
                                <p className="text-red-500 text-sm font-medium">{errors.ifsc}</p>
                            )}
                        </div>
                    </div>

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

BankInfo.propTypes = {
    formData: PropTypes.shape({
        bankInfo: PropTypes.shape({
            bankName: PropTypes.string,
            accountNo: PropTypes.string,
            ifsc: PropTypes.string,
        }),
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
};
