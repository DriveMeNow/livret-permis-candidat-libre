export default function AuthLayout({ children }) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fcedcc]">
        <div className="bg-black p-8 rounded-xl shadow-2xl w-full max-w-md">
          {children}
        </div>
      </div>
    );
  }
  