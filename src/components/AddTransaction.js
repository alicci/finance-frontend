import { useState } from 'react';
import axios from 'axios';

function AddTransaction() {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    date: '',
    category: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/transactions', form);
      alert('Transakcja dodana!');
      setForm({ title: '', amount: '', date: '', category: '' });
    } catch (error) {
      console.error(error);
      alert('Błąd podczas dodawania transakcji');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Nazwa" required />
      <input name="amount" value={form.amount} onChange={handleChange} placeholder="Kwota" type="number" required />
      <input name="date" value={form.date} onChange={handleChange} placeholder="Data" type="date" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Kategoria" required />
      <button type="submit">Dodaj</button>
    </form>
  );
}

export default AddTransaction;
