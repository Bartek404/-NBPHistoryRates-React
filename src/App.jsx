import { useEffect, useState } from "react";
import { CurrencyBox } from "./components/CurrencyBox";
import { Calendar } from "./components/Calendar";

function App() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [currency, setCurrency] = useState("eur");
  const [amountOne, setAmountOne] = useState(0);
  const [amountTwo, setAmountTwo] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/${date}`)
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data.rates[0].mid);
      })
      .catch((err) => console.log(err));
  }, [currency, date]);

  useEffect(
    function calculate() {
      setAmountTwo(amountOne * exchangeRate);
    },
    [amountOne, exchangeRate],
  );

  function calculate(e) {
    setAmountOne(e.target.valueAsNumber);
    setAmountTwo(amountOne * exchangeRate);
  }

  function calculateTwo() {
    setAmountOne(amountTwo / exchangeRate);
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-bl from-sky-500 to-indigo-500 p-4">
      <div className="flex flex-col justify-center rounded-lg bg-white p-4">
        <h1 className="pt-4 text-center text-4xl font-bold">
          Kursy Archiwalne NBP
        </h1>
        <p>(wczesna wersja)</p>
        <Calendar
          date={date}
          setDate={(e) => setDate(e.target.value)}
        ></Calendar>
        <hr />

        <CurrencyBox
          amount={amountOne}
          setAmount={calculate}
          currency={currency}
          setCurrency={(e) => setCurrency(e.target.value)}
          isSelectShown={true}
        >
          Waluta zagraniczna
        </CurrencyBox>

        <hr />

        <CurrencyBox
          amount={amountTwo}
          setAmount={(e) => setAmountTwo(e.target.valueAsNumber)}
          isSelectShown={false}
          readOnly={false}
        >
          PLN
        </CurrencyBox>

        <button
          className="mx-20 my-5 rounded border border-sky-500 bg-transparent px-4 py-2 font-semibold text-sky-700 hover:border-transparent hover:bg-sky-500 hover:text-white"
          onClick={calculateTwo}
        >
          Przelicz odwrotnie
        </button>
        <hr />

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
