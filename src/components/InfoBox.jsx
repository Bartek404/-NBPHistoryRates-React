import { Loading } from "./Loading";

export function InfoBox({
  isLoading,
  date,
  currency,
  exchangeRate,
  errorMessage,
  holidayName,
}) {
  if (isLoading === true) {
    return <Loading errorMessage={errorMessage} holidayName={holidayName} />;
  }

  return (
    <div className="my-3">
      <div className="text-center">
        <p>Data: {date}</p>
        <p>Waluta: {currency.toUpperCase()}</p>
        <p>Kurs wymiany: {exchangeRate} PLN</p>
      </div>
      <div></div>
    </div>
  );
}
