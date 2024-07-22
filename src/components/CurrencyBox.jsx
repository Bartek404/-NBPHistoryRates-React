export function CurrencyBox({
  amount,
  setAmount,
  currency,
  setCurrency,
  isSelectShown,
  readOnly,
  children,
}) {
  return (
    <div className="my-6 flex flex-row items-center justify-center gap-10">
      <div className="w-5/6 rounded border-2 border-solid border-sky-500 p-5">
        <p className="pb-3 text-center text-lg font-semibold">{children}</p>
        <div className="mb-3 flex flex-col gap-1">
          <label htmlFor="amount-one">Kwota:</label>
          <input
            className="cursor-pointer"
            value={amount}
            onChange={setAmount}
            type="number"
            id="amount-one"
            placeholder="Podaj kwotę"
            readOnly={readOnly}
          />
        </div>
        {isSelectShown && (
          <div className="flex flex-col gap-1">
            <label htmlFor="currency-one">Waluta:</label>
            <select
              className="cursor-pointer"
              value={currency}
              onChange={setCurrency}
              id="currency-one"
            >
              <option value="eur">EUR - Euro</option>
              <option value="usd">USD - Dolar amerykański</option>
              <option value="czk">CZK - Korona czeska</option>
              <option value="ron">RON - Lej rumuński</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
