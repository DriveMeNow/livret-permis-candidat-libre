// src/components/ui/Form.jsx
export default function Form({ onSubmit, children, title }) {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-center text-gray-900">{title}</h2>
        {children}
      </form>
    );
  }
  