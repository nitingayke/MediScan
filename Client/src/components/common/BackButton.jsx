import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";
import PropTypes from "prop-types";

export default function BackButton({
  position = "top-7 left-7",
  className = "",
  onClick,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "w-fit h-fit absolute bg-gray-500/10 dark:bg-gray-500/20 hover:bg-gray-500/20 dark:hover:bg-gray-500/30 p-2 rounded-md text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white",
        position,
        className
      )}
    >
      <ArrowLeft size={22} />
    </button>
  );
}

BackButton.propTypes = {
  position: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
