import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
    const [workouts, setWorkouts] = useState([]); // state to store fetched workouts
    const [loading, setLoading] = useState(true); // loading state for user feedback
    const userId = '123456781234567812345678'; // hardcoded user id LOL, replace this once auth is actually built


    //this is what actually gets the workouts
    useEffect(() => {
        // fetch workouts data when the component mounts
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(`/api/workouts?userId=${userId}`, {
                    method: 'GET',
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setWorkouts(data);
                } else {
                    throw new Error('Failed to fetch workouts');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkouts();
    }, []);

    //cite: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    //working with Date objects
    return (
        <div>
            <h1>Hoop Logger</h1>
            <p>Welcome! This is a placeholder homepage.<br />
                Navigate to <Link href="/log-workout">Log Workout</Link> to log a new workout.<br />
                Note: Authentication has not been implemented yet.
            </p>
            <h2>Workout List</h2>
            <p>This is just a temporary display to verify that the form works!</p>
            {loading ? (
                <p>Loading workouts...</p>
            ) : workouts.length > 0 ? (
                <ul>
                    {workouts.map((workout) => (
                        <li key={workout._id}>
                            <strong>{workout.title}</strong> - {workout.description} on {new Date(workout.date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No workouts logged yet.</p>
            )}
        </div>
    );
}