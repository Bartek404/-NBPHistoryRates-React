import { useEffect, useState } from "react";
import { CurrencyBox } from "./components/CurrencyBox";
import { Calendar } from "./components/Calendar";

function App() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [currency, setCurrency] = useState("eur");
  const [foreignAmount, setForeignAmount] = useState(1);
  const [plnAmount, setPlnAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/${date}`)
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data.rates[0].mid);
      })
      .catch((err) => {
        console.log(err);
        setExchangeRate(null);
      });
  }, [date, currency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setPlnAmount(foreignAmount * exchangeRate);
    }
  }, [exchangeRate, foreignAmount]);

  function handleForeignAmountChange(e) {
    const value = parseFloat(e.target.value) || "";
    setForeignAmount(value);
    if (exchangeRate !== null) {
      setPlnAmount(value * exchangeRate);
    }
  }

  function handlePlnAmountChange(e) {
    const value = parseFloat(e.target.value) || "";
    setPlnAmount(value);
    if (exchangeRate !== null) {
      setForeignAmount(value / exchangeRate);
    }
  }

  function handleResetButton() {
    setForeignAmount(0);
    setPlnAmount(0);
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-bl from-sky-500 to-indigo-500 p-4">
      <div className="flex flex-col justify-center rounded-lg bg-white p-4">
        <h1 className="pt-4 text-center text-4xl font-bold">
          Kursy Archiwalne NBP
        </h1>
        <p>(wczesna wersja)</p>
        <Calendar date={date} setDate={(e) => setDate(e.target.value)} />
        <hr />

        <CurrencyBox
          amount={foreignAmount}
          setAmount={handleForeignAmountChange}
          currency={currency}
          setCurrency={(e) => setCurrency(e.target.value)}
          isSelectShown={true}
        >
          {currency}
        </CurrencyBox>

        <hr />

        <CurrencyBox
          amount={plnAmount}
          setAmount={handlePlnAmountChange}
          isSelectShown={false}
        >
          PLN
        </CurrencyBox>

        <hr />

        <button
          className="rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleResetButton}
        >
          Reset
        </button>

        <span>
          <center>
            {date}/{currency}/{exchangeRate}
          </center>
        </span>
      </div>
    </main>
  );
}

export default App;
