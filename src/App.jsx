import { useMemo, useState, useRef, useEffect } from "react"

function App() {
  // campi controllati
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');

  // campi non controllati
  const nameRef = useRef();
  const specializzazioneRef = useRef();
  const esperienzaRef = useRef();
  const formRef = useRef();

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const isUsernameValid = useMemo(() => {
    const charValid = [...username].every(char =>
      letters.includes(char.toLowerCase()) ||
      numbers.includes(char));

    return charValid && username.trim().length >= 6;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      password.split('').some(char => letters.includes(char.toLowerCase())) &&
      password.split('').some(char => symbols.includes(char)) &&
      password.split('').some(char => numbers.includes(char))
    );
  }, [password])

  const isDescriptionValid = useMemo(() => {
    return description.trim().length >= 100 && description.trim().length <= 1000;
  }, [description])

  useEffect(() => {
    nameRef.current.focus();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const specializzazione = specializzazioneRef.current.value;
    const esperienza = esperienzaRef.current.value

    // effettuo i controlli
    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specializzazione.trim() ||
      !esperienza.trim() ||
      esperienza < 0 ||
      !description.trim() ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isDescriptionValid
    ) {
      console.error('Errore: compilare tutti i campi del form.')
      return;
    }

    // Stampo i dati
    console.log('Hai submittato: ', {
      name,
      username,
      password,
      specializzazione,
      esperienza,
      description
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    setDescription('');
    nameRef.current.value = '';
    specializzazioneRef.current.value = '';
    esperienzaRef.current.value = ''
    nameRef.current.focus();
  }

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        {/* name */}
        <label>Nome completo</label>
        <input
          type="text"
          name="name"
          placeholder="Inserisci il tuo nome completo..."
          ref={nameRef}
        />

        {/* username */}
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Inserisci il tuo username..."
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {username.trim() && (
          <p style={{ color: isUsernameValid ? 'green' : 'red' }}>
            {isUsernameValid ? 'Username valido' : 'Deve contenere almeno 6 caratteri alfanumerici'}
          </p>
        )}

        {/* password */}
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Inserisci la password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {password.trim() && (
          <p style={{ color: isPasswordValid ? 'green' : 'red' }}>
            {isPasswordValid ? 'Password valido' : 'Deve contenere almeno 8 caratteri di cui almeno 1 lettera, 1 numero e 1 simbolo speciale'}
          </p>
        )}

        {/* specializzazione */}
        <label>Specializzazione</label>
        <select
          name="specializzazione"
          ref={specializzazioneRef}
        >
          <option value='' default>Seleziona la tua specializzazione</option>
          <option value="Full Stack" >Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>

        {/* esperienza */}
        <label>Anni di esperienza</label>
        <input
          type="number"
          name="esperienza"
          ref={esperienzaRef}
        />

        {/* description */}
        <label>Breve descrizione</label>
        <textarea
          name="description"
          placeholder="Inserisci una breve descrizione..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        {description.trim() && (
          <p style={{ color: isDescriptionValid ? 'green' : 'red' }}>
            {isDescriptionValid ? 'Descrizione valida' : 'Deve contenere tra i 100 e i 1000 caratteri. (' + description.trim().length + ')'}
          </p>
        )}

        <button type="submit">Submit</button>
        <button type="" onClick={handleReset}>Reset</button>
      </form>
      <div className="blocco"></div>
      <button onClick={() => formRef.current.scrollIntoView({ behavior: 'smooth' })}>Vai al form</button>
    </>
  )
}

export default App
