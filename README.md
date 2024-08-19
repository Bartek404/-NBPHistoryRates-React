# Currency Converter

Preview link: https://nbp-calc.netlify.app

## Overview

This React application allows users to convert foreign currencies to Polish Zloty (PLN) and vice versa using exchange rates from the National Bank of Poland (NBP). The application includes features such as selecting past dates to retrieve historical exchange rates, and real-time conversion without needing to press a button. It also handles weekends and holidays by displaying appropriate messages when data is unavailable.

## Features

- **Real-Time Conversion**: Automatically updates conversion results as you type.
- **Historical Rates**: Allows users to select past dates to see historical exchange rates.
- **Weekend and Holiday Handling**: Displays messages when data is unavailable due to weekends or holidays.
- **Responsive Design**: Optimized for use on both desktop and mobile devices.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Bartek404/NBPHistoryRates-React
    cd currency-converter
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

The application should now be running at `http://localhost:3000`.

## Usage

1. **Select Currency**: Choose the foreign currency you want to convert to or from PLN.
2. **Enter Amount**: Enter the amount you want to convert.
3. **Select Date**: Choose the date for which you want to see the exchange rate.
4. **View Conversion**: The converted amount will be displayed automatically as you type.

## Code Structure

- `App.js`: Main component containing the overall structure and state management.
- `CurrencyConverter.js`: Component handling the conversion logic and UI.
- `DatePicker.js`: Component for selecting dates.
- `Calendar.js`: Handles calendar functionality.
- `checkWeekend.js`: Utility function to check if a date is a weekend or holiday.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

Thanks to the National Bank of Poland for providing the exchange rate API.
