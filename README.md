# Weather App

This is a simple and intuitive Weather App built using React. The application allows users to view current weather conditions for any location worldwide, with features like temperature, humidity, wind speed.

## Features

- **Search Locations**: Enter a city name to fetch real-time weather data.
- **Current Weather**: Displays the temperature, weather condition, humidity, wind speed, and more.
- **Dynamic Icons**: Weather conditions are represented with dynamic icons.
- **Responsive Design**: The app is optimized for both desktop and mobile devices.

## Technologies Used

- **React**: For building the user interface.
- **OpenWeatherMap API**: To fetch real-time weather data.
- **CSS**: For styling the application.

## Installation and Setup

Follow these steps to set up and run the Weather App locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/n-saji/weather_app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd weather_app
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open your browser and visit `http://localhost:3000` to view the app.

## Folder Structure


## API Usage

The app uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You need an API key to access this data. Register for a free API key and add it to your `.env` file as shown in the installation steps.



## Screenshots

![Home Page](https://github.com/n-saji/weather_app/sample.png)
*Screenshot of the home page showing current weather details.*


## Future Enhancements

- Add weather forecast.
- Allow users to save favorite locations.
- Include hourly weather updates.
- Add dark mode.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you find a bug or have suggestions for improvement.

## Contact

If you have any questions or feedback, feel free to reach out