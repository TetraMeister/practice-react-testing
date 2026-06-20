import React, {useState} from "react";

const Card = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const isValidCard = (number) => {
    const digits = String(number).replace(/\s/g, '').padStart(16, '0');

    let sum = 0;
    for (let i = 0; i < 16; i++) {
      const d = Number(digits[i]);
      const weight = i % 2 === 0 ? 2 : 1;
      const product = d * weight;
      sum += product > 9 ? product - 9 : product;
    }

    return sum % 10 === 0;
  }

  const cardSpecs = [
    {
      type: 'Visa',
      lengths: [16, 13],
      test: (number) => number[0] === '4'
    },
    {
      type: 'MasterCard',
      lengths: [16],
      test: (number) => Number(number[1]) >= 1 && Number(number[1]) <= 5
    },
    {
      type: 'American Express',
      lengths: [15],
      test: (number) => number[0] === '3' && (number[1] === '4' || number[1] === '7')
    },
    {
      type: 'Diners Club / Carte Blanche',
      lengths: [14],
      test: (number) => number[0] === '3' && ['0', '6', '8'].includes(number[1])
    },
    {
      type: 'JCB',
      lengths: [16],
      test: (number) => ['3088', '3096', '3112', '3158', '3337', '3528'].includes(number.slice(0, 4))
    }
  ]

  const detectCardType = (number) => {
    const n = String(number).replace(/\s/g, '');
    const len = n.length;
    // const jcbPrefixes = ['3088', '3096', '3112', '3158', '3337', '3528'];

    // if (n[0] === '4' && (len === 16 || len === 13)) return 'Visa';

    // if (n[0] === '5' && Number(n[1]) >= 1 && Number(n[1]) <= 5 && len === 16) return 'MasterCard';

    // if (n[0] === '3' && (n[1] === '4' || n[1] === '7') && len === 15) return 'American Express';

    // if (n[0] === '3' && ['0', '6', '8'].includes(n[1]) && len === 14) return 'Diners Club / Carte Blanche';

    // if (jcbPrefixes.includes(n.slice(0, 4)) && len === 16) return 'JCB';

    const card = cardSpecs.find(el=> el.lengths.includes(len) && el.test(n))

    return card ? card.type : null;
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!isValidCard(number)) {
        setError('Invalid Card number');
        setResult(null);
        return;
    }

    const res = detectCardType(number);
    if (!res) {
        setError("Couldn't find matching card type");
        setResult(null);
        return;
    }

    setError(null);
    setResult(res);
  };

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Wpisz numer karty
          <input type="text" value={number} onChange={(ev) => {
            setResult(null)
            setError(null)
            setNumber(ev.target.value)
          }}/>
        </label>
        <button>Send</button>
      </form>
      {number ? (
        <div>
          {error ? <span>{error}</span> : <span>Typ Twojej karty to: {result}</span>}
        </div>
      ) : <span>Podaj numer karty...</span>}
    </div>
  )
}

export default Card
