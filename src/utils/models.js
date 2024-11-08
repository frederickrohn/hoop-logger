import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  goal: { type: String, default: '' },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const WorkoutSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });

const Workout = mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);

export { User, Workout };
