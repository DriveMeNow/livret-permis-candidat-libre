export default function Input({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`px-6 py-2 rounded-lg text-white font-semibold transition duration-300 ease-in-out bg-gradient-to-r from-secondary to-accent hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
