let type = require ('os');

'user strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect('mongodb://NguyenPham:Nguyen171096@ds121665.mlab.com:21665/bikesharingdb', {
    useMongoClient: true
});

autoIncrement.initialize(connection);
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },

    coordinates: {
        type: [Number],
    }
});


// tạo cấu trúc cho database
let RecordSchema = new Schema({
    recordID: {
        type: Number,
        unique: true,
    },
    userID: Number,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    vehicle: {
        type: Number,
    },
    distance: Number,
    timeDuration: Number,
    vehicleName: String,
    price: Number,
    startLocation: GeoSchema,
    endLocation: GeoSchema,
    startAddress: String,
    endAddress: String,
    startTime:{
        type: Date,
        timezone: 'Asia/Ho_Chi_Minh'
    },
    endTime: Date,
    isDelete: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

RecordSchema.index({'startLocation.coordinates': '2dsphere'});
RecordSchema.index({'endLocation.coordinates': '2dsphere'});
RecordSchema.plugin(autoIncrement.plugin, { model: 'Record', field: 'recordID' });

// đưa RecordSchema vào model
let Record = mongoose.model('Record', RecordSchema);
module.exports = Record;
