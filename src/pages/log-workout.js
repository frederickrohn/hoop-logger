import { useState } from 'react';
import styles from './log-workout.module.css';

const mockUserId = '123456781234567812345678'; // replace this with actual userId once authentication is set up

export default function LogWorkout() {

  //cite tutorial: https://siamahnaf.medium.com/how-to-use-next-js-server-actions-to-handle-form-submissions-a9a9e12508c9
  //didn't follow it exactly, but this gave me a lot of help in understanding how this page should work
  const [form, setForm] = useState({
    date: '',
    title: '',
    description: '',
  });

  const [message, setMessage] = useState(''); // message for success or error feedback

  // changes the state of the form as information being inputted into the fields
  //cite: https://react.dev/reference/react-dom/components/input
  //that has information about onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => ({
      ...oldForm,
      [name]: value,
    }));
  };

  // handle form submission
  //this takes the current state of the form, and sends a POST request to the /api/workouts route
  const handleSubmit = async (e) => {
    e.preventDefault();

    // convert date to Date object as a failsafe to make sure nothing gets broken when sent to the backend
    const workoutData = { ...form, userId: mockUserId, date: new Date(form.date) };

    try { //this is the actual post request
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
      });

      //case: if it didn't work
      if (!response.ok) throw new Error('Failed to log workout');

      // reset form and show success message
      setForm({ date: '', title: '', description: '' });
      setMessage('Workout logged successfully!');

    } catch (error) {
      console.error(error);
      setMessage('Error: Could not log workout'); //this shows the user the operation wasn't successful
    }
  };

  return (
    <div className={styles['log-workout-page']}>
      <h1>Log Workout</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., 3pt shooting workout"
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="describe your workout..."
            required
          />
        </label>
        <button type="submit">Log Workout</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}