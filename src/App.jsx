import { useEffect, useState } from "react";
import { CurrencyBox } from "./components/CurrencyBox";
import { Calendar } from "./components/Calendar";
import { Button } from "./components/Button";
import { InfoBox } from "./components/InfoBox";

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
        throw new Error("Błąd ładowania danych!");
      })
      .then((data) => {
        setExchangeRate(data.rates[0].mid);
      })
      .catch((Error) => {
        console.log(Error);
        setErrorMessage(Error.message);
        setExchangeRate(null);
        setIsLoading(true);
      });
  }, [date, currency]);

  /* sprawdzic wyswietlanie bledow o swietach narodowych */

  useEffect(() => {
    setHolidayName("");
    const year = date.slice(0, 4);
    fetch(`https://date.nager.at/api/v3/publicholidays/${year}/PL`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Błąd ładowania danych!");
      })
      .then((data) => {
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
    <main className="flex w-10/12 flex-col items-center justify-center p-4">
      <div className="flex flex-col justify-center rounded-lg bg-white p-4">
        <h1 className="pt-4 text-center text-4xl font-bold">
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

        <hr />

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
