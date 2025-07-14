import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [20, "Name must not exceed 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: (props: any) => `${props.value} is not a valid email`,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: {
      values: ["Librarian", "Customer"],
      message: "{VALUE} is not an acceptable role",
    },
  },
});

const User = model<IUser>("user", userSchema);
export default User;
