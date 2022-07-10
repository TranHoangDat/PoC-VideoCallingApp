import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export async function getUserById(id: any): Promise<any> {
  try {
    const result = await User.findById(new mongoose.Types.ObjectId(id)).exec();
    return result.toJSON();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function registerUser(user: any): Promise<any> {
  user.password = bcrypt.hashSync(user.password, 10);
  try {
    const result = await User.create({
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role === "tutee" ? 0 : 1,
    });
    return result.toJSON();
  } catch (err) {
    return null;
  }
}

export async function logUserIn(email: string, password: string): Promise<any> {
  const data = await User.findOne({
    email,
  });

  if (data === null) {
    return null;
  }

  const user = data.toJSON() as any;

  if (bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}
