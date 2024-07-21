import { useEffect, useState } from "react";
import { CurrencyBox } from "./components/CurrencyBox";
import { Calendar } from "./components/Calendar";

function App() {
  const [states, setStates] = useState({
    /* date: new Date().toISOString().slice(0, 10), */
    amountOne: 0,
    amountTwo: 0,
  });

  const [nbpStates, setNbpStates] = useState({
    date: "2024-07-16",
    currency: "eur",
  });

  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    fetch(
      `https://api.nbp.pl/api/exchangerates/rates/a/${nbpStates.currency}/${nbpStates.date}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setExchangeRate(data.rates[0].mid);
      })
      .catch((err) => console.log(err));
  }, [nbpStates, exchangeRate]);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-bl from-sky-500 to-indigo-500 p-4">
      <div className="flex flex-col justify-center rounded-lg bg-white p-4">
        <h1 className="pt-4 text-center text-4xl font-bold">
          Kursy Archiwalne NBP
        </h1>
        <p>(wczesna wersja, podejście drugie)</p>
        <Calendar
          date={nbpStates.date}
          setDate={(e) => {
            setNbpStates({ ...nbpStates, date: e.target.value });
            console.log(nbpStates);
          }}
        ></Calendar>
        <hr />
        <CurrencyBox
          amount={states.amountOne}
          setAmount={(e) => {
            setStates({
              ...states,
              amountOne: e.target.value,
              amountTwo: states.amountOne * exchangeRate,
            });
          }}
          currency={nbpStates.currency}
          setCurrency={(e) =>
            setNbpStates({ ...nbpStates, currency: e.target.value })
          }
          isSelectShown={true}
        >
          Waluta zagraniczna
        </CurrencyBox>
        <hr />
        <CurrencyBox
          amount={states.amountTwo}
          setAmount={(e) => {
            setStates({
              ...states,
              amountTwo: e.target.value,
              amountOne: states.amountTwo * exchangeRate,
            });
          }}
          isSelectShown={false}
        >
          PLN
        </CurrencyBox>

        <hr />

        <span>
          {nbpStates.currency} {exchangeRate} {nbpStates.date}
        </span>
      </div>
    </main>
  );
}

export default App;
