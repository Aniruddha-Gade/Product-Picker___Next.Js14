import bcrypt from 'bcryptjs';
import { Schema, model, models } from 'mongoose';

interface IUser {
    email: string;
    password: string;
    role: 'Admin' | 'Team member';
}


const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Team member'],
        required: true
    },
});


// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
