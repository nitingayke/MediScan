import { useState } from "react";
import LoginCover from "../../../components/login/LoginCover";
import BackButton from "../../../components/common/BackButton";
import TextInput from "../../../components/inputs/TextInput";
import PasswordInput from "../../../components/inputs/PasswordInput";
import SelectInput from "../../../components/inputs/SelectInput";
import TextArea from "../../../components/inputs/TextArea";

export default function PatientSignup() {

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

    const genderOptions = [
        { value: "", label: "Select" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
    ];

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
        <div className="w-full h-screen overflow-hidden md:flex">
            <LoginCover />

            <div className="relative w-full md:w-1/2 h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 transition-colors duration-300 py-8">
                <div className="h-full mx-auto w-full max-w-2xl bg-transparent sm:py-4 lg:p-8 overflow-auto no-scrollbar" >
                    <BackButton position="top-5 left-5" className="hidden sm:flex" />

                    <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
                        Patient <span className="text-green-600">Sign Up</span>
                    </h2>

                    <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                        <div>
                            <TextInput label="First Name" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required />
                        </div>
                        <div>
                            <TextInput label="Last Name" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required />
                        </div>
                        <div>
                            <TextInput label="Phone" id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                        </div>
                        <div>
                            <TextInput label="Email" id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                        </div>
                        <div>
                            <TextInput label="Date of Birth" id="dob" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                        </div>
                        <div>
                            <SelectInput
                                label="Gender"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                options={genderOptions}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextArea
                                label="Address"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="123 Health Street, Pune"
                                rows={2}
                                required
                            />
                        </div>

                        <div className="relative md:col-span-2">
                            <PasswordInput
                                label="Password"
                                id="password"
                                name="password"
                                value={formData.password}
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
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter your password"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <button type="submit" disabled={loading} className="w-full bg-[#1A8151] hover:bg-[#13623d] text-white py-2 rounded-lg font-medium transition disabled:opacity-60">
                                {loading ? "Signing up..." : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}