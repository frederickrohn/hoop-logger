import connect from '../../utils/db';
import { Workout } from '../../utils/models';

//cite: https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/
//this helped me understand how pages routing works
export default async (req, res) => {
  await connect();

  const { method } = req;

  if (method === 'POST') { // create a new workout for a user

    // check to see if any fields aren't present
    if (!req.body.userId || !req.body.date || !req.body.title || !req.body.description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const workout = await Workout.create({ ...req.body });
      res.status(201).json(workout);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to create workout' });
    }
  } else if (method === 'GET') { // retrieve workouts for the specified user
    const { userId } = req.query; //for get, we have the userId passed in within the query

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const workouts = await Workout.find({ userId }).sort({ date: -1 }); // sorting by date, not tested, not sure if this works
      res.status(200).json(workouts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch workouts' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
