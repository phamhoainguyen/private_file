'user strict';
let bcrypt = require ("bcrypt");
let jwt = require ("jsonwebtoken");
let uniqueValidator = require ("mongoose-unique-validator");

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect('mongodb://NguyenPham:Nguyen171096@ds121665.mlab.com:21665/bikesharingdb', {
    useMongoClient: true
});

autoIncrement.initialize(connection);

// tạo cấu trúc cho database
let UserSchema = new Schema({
    userID: {
        type: Number,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: "" },
    name: String,

    city: String,
    birthYear: Number,
    gender: Boolean,
    profileImg: String,
    email: String,
    createTime: {
        type: Date,
        default: Date.now,
    },
    isDelete: {
        type: Number,
        default: 0,
    }

}, { timestamps: true });

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userID' });
//UserSchema.plugin(AutoIncrement, { inc_field: 'userID' });

// kiểm tra password có đúng k
UserSchema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
}


// set password sau khi tạo tài khoản
UserSchema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
}

// lưu lại token sau khi tạo thành công
UserSchema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
}

// tạo link để confirm 
UserSchema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
}


// tạo link để reset password
UserSchema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
    return `${process.env.HOST}/reset_password/${this.generateResetPasswordToken()}`;
};


// tạo token từ phoneNumber
UserSchema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        {
            userID: this.userID,
            phoneNumber: this.phoneNumber,
            confirmed: this.confirmed
        },
        process.env.JWT_SECRET
    );
};


//Tạo token để reset password
UserSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};


// trả về object sau khi tọa thành công 
// phoneNumber, confirm, token
UserSchema.methods.toAuthJSON = function toAuthJSON() {
    return {
        userID: this.userID,
        phoneNumber: this.phoneNumber,
        confirmed: this.confirmed,
        token: this.generateJWT()
    };
};


// sử dụng plugin để check unique
UserSchema.plugin(uniqueValidator, { message: "Số điện thoại đã được đăng ký!" });


let User = mongoose.model('User', UserSchema);
module.exports = User;
//module.exports = mongoose.model('User', UserSchema);





