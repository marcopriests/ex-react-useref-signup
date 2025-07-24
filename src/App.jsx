import { useState } from "react"

function App() {
  const formInitialData = {
    name: '',
    username: '',
    password: '',
    specializzazione: '',
    esperienza: '',
    description: ''
  };

  const [formData, setFormData] = useState(formInitialData);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Stampo i dati
    console.log('Hai submittato!', formData);

    // resetto i campi del form
    setFormData(formInitialData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* name */}
        <label>Nome completo</label>
        <input
          type="text"
          name="name"
          placeholder="Inserisci il tuo nome completo..."
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* username */}
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Inserisci il tuo username..."
          value={formData.username}
          onChange={handleChange}
          required
        />

        {/* password */}
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Inserisci la password..."
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* specializzazione */}
        <label>Specializzazione</label>
        <select
          name="specializzazione"
          value={formData.specializzazione}
          onChange={handleChange}
          required
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
          min={0}
          value={formData.esperienza}
          onChange={handleChange}
          required
        />

        {/* description */}
        <label>Breve descrizione</label>
        <textarea
          name="description"
          placeholder="Inserisci una breve descrizione..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default App
