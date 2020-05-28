const dotenv =require('dotenv')
dotenv.config()
const mongoose  =require('mongoose')


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})

const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function () {
    return this.toString();
};
