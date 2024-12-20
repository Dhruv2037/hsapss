import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const UserSchema = new mongoose.Schema({
    phone: { type: String, unique: true, required: true },
    password: { type: String },
    verified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiresAt: { type: Date },
});


UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

export default mongoose.models.User || mongoose.model('User',UserSchema);