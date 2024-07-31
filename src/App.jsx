import { useEffect, useState } from "react";
import { CurrencyBox } from "./components/CurrencyBox";
import { Calendar } from "./components/Calendar";
import { Button } from "./components/Button";
import { InfoBox } from "./components/InfoBox";
import { checkWeekend } from "./utils/checkWeekend";

function App() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [currency, setCurrency] = useState("eur");
  const [foreignAmount, setForeignAmount] = useState(1);
  const [plnAmount, setPlnAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [holidayName, setHolidayName] = useState("");

  useEffect(() => {
    fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/${date}`)
      .then((res) => {
        if (res.ok) {
          setIsLoading(false);
          setErrorMessage("");
          return res.json();
        }
        throw new Error("Błąd ładowania.");
      })
      .then((data) => {
        setExchangeRate(data.rates[0].mid);
      })
      .catch((Error) => {
        setErrorMessage(Error.message);
        setExchangeRate(null);
        setIsLoading(true);
      });
  }, [date, currency]);

  useEffect(() => {
    setHolidayName("");
    const year = date.slice(0, 4);
    fetch(`https://date.nager.at/api/v3/publicholidays/${year}/PL`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Błąd ładowania.");
      })
      .then((data) => {
        setHolidayName(checkWeekend(date));
        data.forEach((element) => {
          if (element.date === date) {
            return setHolidayName(element.localName);
          }
        });
      })
      .catch((Error) => {
        setErrorMessage(Error.message);
      });
  }, [date]);

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

  function handlePlnAmountChange() {
    if (exchangeRate !== null) {
      setForeignAmount(plnAmount / exchangeRate);
    }
  }

  function handleReset() {
    setForeignAmount(1);
  }

  return (
    <main className="flex flex-col items-center justify-center p-4 md:w-10/12 ">
      <div className="flex flex-col justify-center rounded-lg bg-slate-400 p-4 border-2 border-slate-200">
        <h1 className="pt-4 text-center text-4xl font-bold text-slate-100 underline">
        Kursy Archiwalne NBP
        </h1>
        <Calendar date={date} setDate={(e) => setDate(e.target.value)} />
        <hr />

        <CurrencyBox
          amount={foreignAmount}
          setAmount={handleForeignAmountChange}
          currency={currency}
          setCurrency={(e) => setCurrency(e.target.value)}
          isSelectShown={true}
        >
          {currency.toUpperCase()}
        </CurrencyBox>

        <div className="m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#0369a1"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
            />
          </svg>
        </div>

        <CurrencyBox
          amount={plnAmount}
          setAmount={(e) => {
            setPlnAmount(parseFloat(e.target.value));
          }}
          isSelectShown={false}
        >
          PLN
        </CurrencyBox>

        <hr />

        <div className="text-center">
          <Button onClick={handlePlnAmountChange}>
            PLN/{currency.toUpperCase()}
          </Button>
          <Button onClick={handleReset}>RESET</Button>
        </div>

        <hr />

        <InfoBox
          isLoading={isLoading}
          date={date}
          currency={currency}
          exchangeRate={exchangeRate}
          errorMessage={errorMessage}
          holidayName={holidayName}
        ></InfoBox>
      </div>
    </main>
  );
}

export default App;
