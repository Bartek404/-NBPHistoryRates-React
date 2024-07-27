export function Button({ onClick, children }) {
  return (
    <button
      className="m-3 h-12 w-1/3 rounded border border-blue-700 bg-blue-500 font-bold text-white hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
