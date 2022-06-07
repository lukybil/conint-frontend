import './App.css';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { AiFillFire } from 'react-icons/ai';
import { GiWaterDrop } from 'react-icons/gi';
import { FaRegCircle } from 'react-icons/fa';
import Dragon from './img/dragon2.png';
import Elf from './img/elf.jpg';
import Goblin from './img/goblin.jpg';
import Knight from './img/knight.jpg';
import Kraken from './img/kraken.jpg';
import Orc from './img/orc.jpg';
import Spell from './img/spell.jpg';
import Wizard from './img/wizard.jpg';


//Normal, Water, Fire
//Spell, Goblin, Dragon, Wizard, Orc, Knight, Kraken, Elf

type Card = {
  id: string
  name?: string
  race: number
  damage: number
  element: number
}
type CardProps = {
  card: Card
}

function Card({card}:CardProps) {
  const elements = ['Normal', 'Water', 'Fire'];
  /* eslint-disable */
  const elementIcons = [<FaRegCircle style={{color: '#eee'}}/>, <GiWaterDrop style={{color: 'rgba(0, 92, 200)'}}/>, <AiFillFire style={{color: 'rgb(255, 65, 2)'}}/>];
  const races = ['Spell', 'Goblin', 'Dragon', 'Wizard', 'Orc', 'Knight', 'Kraken', 'Elf'];
  const racesImages = [Spell, Goblin, Dragon, Wizard, Orc, Knight, Kraken, Elf];
  const {id, name, race, damage, element} = card;
  const waterFilter = 'rgba(0, 0, 255, 0.2)'; //rgba(0, 92, 200, 0.2)
  const fireFilter = 'rgba(255, 0, 0, 0.2)'; //rgba(255, 65, 2, 0.2)
  const displayName = name != null ? name : `${elements[card.element]} ${races[card.race]}`;
  let filter = '';
  switch (element) {
  case 1:
    filter = waterFilter;
    break;
  case 2:
    filter = fireFilter;
    break;
  default:
    break;
  } //<img src={racesImages[race]} alt=''/>
  return (
    <div className='Card'>
      <div className="image-container">
        <div className="image" style={{backgroundImage: `url(${racesImages[race]})`}}>
          <div className='image-filter' style={{backgroundColor: filter}}>
          </div>
        </div>
      </div>
      <div className='name'>{displayName}</div>
      <div className='element'>{elementIcons[element]} {races[race]}</div>
      <div className='damage'>{damage}</div>
    </div>
  );
}

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Card[]>([]);

  useEffect(() => {
    let input: HTMLInputElement;
    if (document && (input = (document.getElementById('input-userToken') as HTMLInputElement)))
      input.value = 'lukas-token';
  }, []);

  const getCards = () => {
    //fetch("/api/cards", {
    fetch('/api/cards', {
      headers: {
        'Authorization': 'Basic ' + userToken()
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const itemsToCards = () => {
    return items.map( (card) => {
      return (
        <Grid key={card.id} item xs={6} lg={3}>
          <Card card={card} />
        </Grid>
      );
    });
  };

  const userToken = () => {
    const input = document?.getElementById('input-userToken') as HTMLInputElement;
    return input.value;
  };

  console.log(items);

  return (
    <div className="App">
      <header>
        <input type="text" id="input-userToken"/>
        <button onClick={(e) => getCards()}>Get Cards</button>
      </header>
      <div className="container">
        <Grid 
          container 
          rowSpacing={1} 
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="center"
          alignItems="center"
        >
          {itemsToCards()}
        </Grid>
      </div>
    </div>
  );
}

export default App;
