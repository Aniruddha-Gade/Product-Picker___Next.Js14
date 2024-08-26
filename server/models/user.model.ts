import bcrypt from 'bcryptjs';
import { Schema, model, models } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    accountType: 'Admin' | 'Team member';
}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters"],
        select: false // whenever we fetch user data from DB , by default password will be excluded
    },
    accountType: {
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
