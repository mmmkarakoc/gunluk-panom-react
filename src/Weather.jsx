import { useState, useEffect } from 'react';

function Weather() {
  const [weather, setWeather] = useState('Yükleniyor...');

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.87&longitude=32.48&current_weather=true');
        const data = await res.json();
        setWeather(`Şu an: ${data.current_weather.temperature}°C`);
      } catch (err) {
        setWeather('Hava durumu alınamadı');
      }
    }

    fetchWeather();
  }, []);

  return (
    <div>
      <h2>Hava Durumu</h2>
      <p>{weather}</p>
    </div>
  );
}

export default Weather;