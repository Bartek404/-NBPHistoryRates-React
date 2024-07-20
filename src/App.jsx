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
        console.log(data);
        console.log(data.rates[0].mid);
        setExchangeRate(data.rates[0].mid);
      })
      .catch((err) => console.log(err));
  }, [currency, date]);

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
          setAmount={(e) => {
            setAmountOne(e.target.value);
            setAmountTwo(e.target.value * exchangeRate);
          }}
          currency={currency}
          setCurrency={(e) => setCurrency(e.target.value)}
          isSelectShown={true}
        >
          Waluta zagraniczna
        </CurrencyBox>
        <hr />
        <CurrencyBox
          amount={amountTwo}
          setAmount={(e) => {
            setAmountTwo(e.target.value);
            setAmountOne(e.target.value / exchangeRate);
          }}
          isSelectShown={false}
        >
          PLN
        </CurrencyBox>

        <hr />

        <span>Tu będą nformacje o kursie, blędach, świętach itd.</span>
      </div>
    </main>
  );
}

export default App;
