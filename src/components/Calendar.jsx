export function Calendar({ date, setDate }) {
  return (
    <div className="my-6 flex flex-row items-center justify-center gap-10">
      <div className="flex w-5/6 flex-col items-center justify-center gap-2 rounded border-2 border-solid border-sky-600 p-5">
        <label
          className="pb-3 text-center text-lg font-semibold"
          htmlFor="date"
        >
          Data:
        </label>
        <input
          className="cursor-pointer"
          value={date}
          onChange={setDate}
          type="date"
          id="date"
        />
      </div>
    </div>
  );
}
