// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

function App() {
  const [money, setMoney] = useState(0);
  const [cur1, setCur1] = useState("USD");
  const [cur2, setCur2] = useState("USD");
  const [output, setOutput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function handleMoney(money) {
    setMoney(money);
  }

  function handleCurrency1(currency) {
    setCur1(currency);
  }

  function handleCurrency2(currency) {
    setCur2(currency);
  }

  useEffect(
    function () {
      async function fetchCurrency() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${money}&from=${cur1}&to=${cur2}`
        );
        const data = await res.json();
        setOutput(data.rates[cur2]);
        setIsLoading(false);
      }
      if (cur2 === cur1) return setOutput(money);
      fetchCurrency();
      // if (cur1 !== cur2 && money !== 0) {
      //   fetchCurrency();
      // }
    },
    [money, cur1, cur2]
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleMoney(Number(e.target.value))}
        value={money}
        disabled={isLoading}
      />
      <select
        value={cur1}
        onChange={(e) => handleCurrency1(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={cur2}
        onChange={(e) => handleCurrency2(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {cur2}
      </p>
    </div>
  );
}

export default App;
