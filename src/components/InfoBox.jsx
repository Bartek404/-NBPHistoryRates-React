import { Loading } from "./Loading";

export function InfoBox({
  isLoading,
  date,
  currency,
  exchangeRate,
  errorMessage,
}) {
  if (isLoading === true) {
    return <Loading></Loading>;
  }

  return (
    <div className="my-3">
      <div className="text-center">
        <p>Data: {date}</p>
        <p>Waluta: {currency.toUpperCase()}</p>
        <p>Kurs wymiany: {exchangeRate} PLN</p>
      </div>
      <div>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}
