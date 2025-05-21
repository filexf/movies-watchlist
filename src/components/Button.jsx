const Button = ({
  children,
  onClick,
  variant = "default",
  active = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900";

  const variants = {
    default: `${
      active
        ? "bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-600/30"
        : "bg-neutral-800 text-gray-200 border-neutral-700 hover:bg-sky-900 hover:text-white hover:shadow-md"
    } border`,
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
