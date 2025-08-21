import React, { useEffect, useState } from "react";
import AccountSetup from "./steps/AccountSetup";
import BasicInfo from "./steps/BasicInfo";
import ProfessionalInfo from "./steps/ProfessionalInfo";
import EducationInfo from "./steps/EducationInfo";
import BankInfo from "./steps/BankInfo";
import ReviewSubmit from "./steps/ReviewSubmit";
import DoctorSignupLayout from "../../../layouts/DoctorSignupLayout";

export default function DoctorSignup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "Your progress will be lost. Are you sure you want to leave?";
        };

        if (step >= 2) {
            window.addEventListener("beforeunload", handleBeforeUnload);
        } else {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [step]);


    const getStepComponent = () => {
        switch (step) {
            case 1:
                return (
                    <AccountSetup
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                    />
                );
            case 2:
                return (
                    <BasicInfo
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                );
            case 3:
                return (
                    <ProfessionalInfo
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                );
            case 4:
                return (
                    <EducationInfo
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                );
            case 5:
                return (
                    <BankInfo
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                );
            case 6:
                return <ReviewSubmit formData={formData} prevStep={prevStep} handlePage={setStep} />;

            default:
                return null;
        }
    };

    if (step === 6) {
        return getStepComponent();
    }

    return <DoctorSignupLayout>{getStepComponent()}</DoctorSignupLayout>;
}
