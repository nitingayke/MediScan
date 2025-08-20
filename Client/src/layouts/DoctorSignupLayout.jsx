import PropTypes from "prop-types";
import LoginCover from "../components/login/LoginCover";

export default function DoctorSignupLayout({ children }) {

    return (
        <div className="w-full h-screen overflow-hidden md:flex">
            {children}
            <LoginCover />
        </div>
    );
}

DoctorSignupLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
