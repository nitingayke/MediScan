import PropTypes from "prop-types";
import Footer from "../components/footer/Footer";
import PatientNavbar from "../components/Navbar/PatientNavbar";

export default function PatientLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900 transition-colors duration-300">
            <PatientNavbar />
            <main className="flex-1 max-w-7xl mx-auto px-3 py-4 mx:px-6 md:py-8">
                {children}
            </main>
            <Footer />
        </div>
    )
}

PatientLayout.propTypes = {
  children: PropTypes.node.isRequired
}