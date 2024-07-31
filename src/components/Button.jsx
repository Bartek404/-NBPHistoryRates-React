export function Button({ onClick, children }) {
  return (
    <button
      className="m-3 h-12 w-1/3 rounded border border-sky-700 bg-sky-600 font-bold text-white hover:border-slate-200 hover:bg-sky-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
