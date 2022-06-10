import { useState, useEffect } from 'react'; 
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { apikey } from '../config';

import './Tab1.css';


const Tab1: React.FC = () => {

  //call wheather api to get temp in Benidorm
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [visibility, setVisibility] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    const getWeather = async () => {
      setIsLoading(true);
      const weather = await getWeatherData();
      setIsLoading(false);
      if (weather) {
        setTemp(weather.main.temp);
        setCity(weather.name);
        setCountry(weather.sys.country);
        setIcon(weather.weather[0].icon);
        setDescription(weather.weather[0].description);
        setHumidity(weather.main.humidity);
        setWindSpeed(weather.wind.speed);
        setVisibility(weather.visibility);
        setSunrise(weather.sys.sunrise);
        setSunset(weather.sys.sunset);
      } else {
        setError('Could not get weather data.');
      }
    }
    getWeather();
  }, []);

  const getWeatherData = async () => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Benidorm,es&appid=${apikey}&units=metric`);
    const data = await response.json();
    console.log(data)
    return data;
  }



  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText className="container">Hola!</IonText>
        <IonText className="textLegend">Hace una temperatura en Benidorm de {temp}</IonText>
    
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
