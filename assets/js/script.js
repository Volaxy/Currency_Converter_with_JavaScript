const $fromCurrency = document.getElementById("from-currency-select");
const $toCurrency = document.getElementById("to-currency-select");

fetch("https://v6.exchangerate-api.com/v6/4f1ba660e45448e8be2563a8/latest/USD")
    .then(response => response.json())
    .then(data => {
        for (const currency in data.conversion_rates) {
            if (Object.hasOwnProperty.call(data.conversion_rates, currency)) {
                const $option = document.createElement("option");
                $option.innerText = currency;

                $fromCurrency.appendChild($option.cloneNode(true));
                $toCurrency.appendChild($option);
            }
        }
    })
    .catch(() => {
        const $result = document.getElementById("result");

        $result.innerText = "An error occurred on the server or the maximum number of requests allowed for the API has already been made :("
    });

const $convertButton = document.getElementById("convert-button");
$convertButton.addEventListener("click", () => {
    const fromCurrencyText = $fromCurrency.value;
    const toCurrencyText = $toCurrency.value;

    fetch(`https://v6.exchangerate-api.com/v6/4f1ba660e45448e8be2563a8/latest/${fromCurrencyText}`)
        .then(response => response.json())
        .then(data => {
            const amount = document.getElementById("amount").value;
            const $result = document.getElementById("result");
            
            const valueOfCurrencyConverted = (amount * data.conversion_rates[toCurrencyText]).toLocaleString(undefined, { minimumFractionDigits: 4 });
            $result.textContent = `${amount} ${fromCurrencyText} = ${valueOfCurrencyConverted} ${toCurrencyText}`;
        })
        .catch(() => {
            const $result = document.getElementById("result");
    
            $result.innerText = "An error occurred on the server or the maximum number of requests allowed for the API has already been made :("
        });
});