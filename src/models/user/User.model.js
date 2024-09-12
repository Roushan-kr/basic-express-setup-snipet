import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  jwt_secret,
  jwt_refresh_secret,
  jwt_expiration,
  jwt_refresh_expiration,
} from '../../conf/config.js';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    refreshToken: String,
    lastAcess: {
      type: Date,
      default: Date.now,
    },
    role:{
      type:String,
      enum:['student','teacher',"admin", "superadmin"],
      default:'student'
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: Number,
      validate: {
        validator: function () {
          // If the user is a student, the semester field must be provided
          if (this.role === 'student') {
            return this.semester !== null;
          }
          return true; // Otherwise, it's valid
        },
        message: 'Semester is required for students.',
      },
    },
    section: {
      type: String,
      validate: {
        validator: function () {
          // If the user is a student, the semester field must be provided
          if (this.role === 'student') {
            return this.semester !== null;
          }
          return true; // Otherwise, it's valid
        },
        message: 'section is required for students.',
      },
    },
    DOJ:{ // Date of Joining
      type:Date,
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id , email:user.email}, jwt_secret, {
    expiresIn: jwt_expiration,
  });
  return token;
};

userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, jwt_refresh_secret, {
    expiresIn: jwt_refresh_expiration,
  });
  user.refreshToken = token;
  await user.save();
  return token;
};


userSchema.statics.findByCredentials = async (
  email = '',
  userName = '',
  password
) => {
  const user = await User.findOne({ $or: [{ email }, { userName }] });
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }
  return user;
};

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;