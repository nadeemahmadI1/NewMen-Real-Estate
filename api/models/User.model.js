import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default:
      "https://www.bing.com/images/search?view=detailV2&ccid=jCdbWeH%2b&id=C22B6F7A8ED99829656EDA813AFD5508488ABF7D&thid=OIP.jCdbWeH-uFMS8z_ILqlHRAAAAA&mediaurl=https%3a%2f%2fwww.logolynx.com%2fimages%2flogolynx%2fb4%2fb4ef8b89b08d503b37f526bca624c19a.jpeg&exph=360&expw=360&q=Profile+Logo&simid=608055009155678233&FORM=IRPRST&ck=F0EC0320F9BC11462E57D7D55DBF7B7F&selectedIndex=12&itb=0",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
