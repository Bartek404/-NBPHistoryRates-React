export function CurrencyBox({
  amount,
  setAmount,
  currency,
  setCurrency,
  isSelectShown,
  children,
}) {
  return (
    <div className="my-6 flex flex-row items-center justify-center gap-10">
      <div className="w-5/6 rounded border-2 border-solid border-slate-200 p-5">
        <p className="pb-3 text-center text-xl font-semibold">{children}</p>
        <div className="mb-3 flex flex-col gap-1">
          <label htmlFor="amount-one">Kwota:</label>
          <input
            className="cursor-pointer rounded border-2 bg-slate-200 px-2 outline-none focus:border-2 focus:border-sky-600"
            value={amount}
            onChange={setAmount}
            type="number"
            id="amount-one"
            placeholder="Podaj kwotę"
          />
        </div>
        {isSelectShown && (
          <div className="flex flex-col gap-1">
            <label htmlFor="currency-one">Waluta:</label>
            <select
              className="cursor-pointer rounded border-2 bg-slate-200 px-2 focus:border-2 focus:border-sky-600"
              value={currency}
              onChange={setCurrency}
              id="currency-one"
            >
              <option className="bg-slate-100" value="eur">
                EUR - Euro
              </option>
              <option className="bg-slate-100" value="usd">
                USD - Dolar amerykański
              </option>
              <option className="bg-slate-100" value="czk">
                CZK - Korona czeska
              </option>
              <option className="bg-slate-100" value="ron">
                RON - Lej rumuński
              </option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
