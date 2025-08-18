import { useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BackButton from "../../common/BackButton";

const inputClass =
    "w-full px-4 py-2 rounded-lg bg-[#F7FAFC] dark:bg-neutral-800 " +
    "text-gray-900 dark:text-gray-100 border border-[#CBD5E0] " +
    "focus:outline-none focus:ring-2 focus:ring-green-600";


export default function PatientSignupForm() {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setLoading(false);
            alert("Passwords do not match!");
            return;
        }

        setTimeout(() => {
            setLoading(false);
            alert(`Patient signed up: ${formData.firstName} ${formData.lastName}`);
        }, 1500);
    };

    return (
        <div className="relative w-full md:w-1/2 h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 transition-colors duration-300 p-4">
            <div className="h-full border-white mx-auto w-full max-w-xl bg-transparent sm:p-5 md:p-8 overflow-auto no-scrollbar" >
                <BackButton position="top-5 left-5" className="hidden sm:flex" />

                <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                    Patient <span className="text-green-600">Sign Up</span>
                </h2>

                <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="First Name" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
                    <InputField label="Last Name" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />

                    <InputField label="Phone" id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                    <InputField label="Email" id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />

                    <InputField label="Date of Birth" id="dob" type="date" name="dob" value={formData.dob} onChange={handleChange} />

                    <div>
                        <label htmlFor="gender" className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                            Address
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="123 Health Street, Pune"
                            rows={2}
                            className={inputClass}
                            required
                        />
                    </div>

                    <PasswordField label="Password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" />
                    <PasswordField label="Confirm Password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" />

                    {/* Submit */}
                    <div className="md:col-span-2 mt-4">
                        <button type="submit" disabled={loading} className="w-full bg-[#1A8151] hover:bg-[#13623d] text-white py-2 rounded-lg font-medium transition disabled:opacity-60">
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


function InputField({ label, id, type = "text", name, value, onChange, placeholder, required = true }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={inputClass}
                required={required}
            />
        </div>
    );
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
};

function PasswordField({ label, id, name, value, onChange, placeholder }) {
    const [show, setShow] = useState(false);

    return (
        <div className="md:col-span-2">
            <label htmlFor={id} className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={inputClass}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-3 text-gray-500 dark:text-gray-400"
                >
                    {show ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>
    );
}

PasswordField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

