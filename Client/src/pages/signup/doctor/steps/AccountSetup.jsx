import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextInput from "../../../../components/inputs/TextInput";
import PasswordInput from "../../../../components/inputs/PasswordInput";
import OTPInput from "../../../../components/inputs/OTPInput";
import BackButton from "../../../../components/common/BackButton";

export default function AccountSetup({ formData, setFormData, nextStep }) {
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const handleSave = () => {
        if (!formData.mobile || !formData.email || !formData.password || !formData.confirmPassword || !formData.privacyAgreed) {
            alert("Please fill all required fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setOtpSent(true);
            setResendTimer(60);
            alert("OTP sent to your mobile number!");
        }, 1500);
    };

    const handleResendOTP = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setResendTimer(60); 
            alert("OTP resent to your mobile number!");
        }, 1500);
    };

    const handleContinue = () => {
        if (otp.length !== 6) {
            alert("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            nextStep();
        }, 1500);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="relative w-full md:w-1/2 h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 transition-colors duration-300 py-8">
            <div className="h-full mx-auto w-full max-w-2xl bg-transparent sm:py-4 lg:p-8 overflow-auto no-scrollbar">
                <BackButton position="top-5 left-5" className="hidden sm:flex" />

                <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                    Doctor <span className="text-green-600">Account Setup</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                    <div className="md:col-span-2">
                        <TextInput
                            label="Mobile Number"
                            id="mobile"
                            type="tel"
                            name="mobile"
                            value={formData.mobile || ""}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <TextInput
                            label="Email Address"
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="relative md:col-span-2">
                        <PasswordInput
                            label="Password"
                            id="password"
                            name="password"
                            value={formData.password || ""}
                            onChange={handleChange}
                            placeholder="Create a strong password"
                            required
                        />
                    </div>

                    <div className="relative md:col-span-2">
                        <PasswordInput
                            label="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword || ""}
                            onChange={handleChange}
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 flex items-center mt-2">
                        <input
                            type="checkbox"
                            id="privacyAgreed"
                            name="privacyAgreed"
                            checked={formData.privacyAgreed || false}
                            onChange={handleChange}
                            className="mr-2"
                            required
                        />
                        <label htmlFor="privacyAgreed" className="text-sm text-gray-700 dark:text-gray-300">
                            I agree to the Terms & Conditions and Privacy Policy
                        </label>
                    </div>

                    {otpSent && (
                        <>
                            <div className="max-w-md mx-auto pt-10 md:col-span-2">
                                <div className="mb-2 font-medium text-green-700 dark:text-green-300">
                                    Enter OTP Sent to {formData.mobile}
                                </div>
                                <OTPInput
                                    digits={6}
                                    value={otp}
                                    onChange={setOtp}
                                />
                            </div>

                            <div className="md:col-span-2 flex justify-center items-center mt-2">
                                {resendTimer > 0 ? (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Resend OTP in {resendTimer} seconds
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={loading}
                                        className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition disabled:opacity-60"
                                    >
                                        {loading ? "Resending..." : "Resend OTP"}
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    <div className="md:col-span-2 mt-4">
                        {!otpSent ? (
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={loading || !formData.mobile || !formData.email || !formData.password || formData.password !== formData.confirmPassword || !formData.privacyAgreed}
                                className="w-full bg-[#1A8151] hover:bg-[#13623d] text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleContinue}
                                disabled={loading || otp.length !== 6}
                                className="w-full bg-[#1A8151] hover:bg-[#13623d] text-white py-2 rounded-lg font-medium transition disabled:opacity-60"
                            >
                                {loading ? "Verifying..." : "Verify & Continue"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

AccountSetup.propTypes = {
    formData: PropTypes.shape({
        mobile: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string,
        privacyAgreed: PropTypes.bool,
    }).isRequired,
    setFormData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired
};