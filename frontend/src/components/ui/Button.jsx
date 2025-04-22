export default function Button({ children, ...props }) {
    return (
      <button
        {...props}
        className="px-8 bg-primary hover:bg-secondary text-black rounded-lg py-2 font-semibold text-base transition"
      >
        {children}
      </button>
    );
  }
  