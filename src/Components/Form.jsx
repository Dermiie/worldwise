// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useUrlConverter } from '../hooks/useUrlConverter';
import { useCities } from '../contexts/CitiesContext';

import Button from './Button';
import BackButton from './BackButton';
import Spinner from './Spinner';
import Message from './Message';
import DatePicker from 'react-datepicker';

import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client?';

function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [geoLocationError, setGeoLocationError] = useState('');
  const [isLoadingCountryPosition, setIsLoadingCountryPosition] =
    useState(false);

  const [lat, lng] = useUrlConverter();
  const { addNewCity } = useCities();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingCountryPosition(true);
          setGeoLocationError('');
          const res = await fetch(
            `${BASE_URL}latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city, please click somewhere else 😊"
            );
          setCityName(data.cityName || data.locality);
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoLocationError(err.message);
        } finally {
          setIsLoadingCountryPosition(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmitForm(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await addNewCity(newCity);
    navigate('/app/cities');
  }

  if (!lat & !lng)
    return (
      <Message
        message={'Please begin by selecting a city on the map'}
      ></Message>
    );

  if (isLoadingCountryPosition) return <Spinner></Spinner>;

  if (geoLocationError) return <Message message={geoLocationError}></Message>;

  return (
    <form className={styles.form} onSubmit={handleSubmitForm}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={'dd/MM/yyyy'}
        ></DatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'}>Add</Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
