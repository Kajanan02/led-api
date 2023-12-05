import mongoose from "mongoose";

const ledSchema = new mongoose.Schema({
    status: Number,
});
const Led = mongoose.model('led', ledSchema);
export default Led;