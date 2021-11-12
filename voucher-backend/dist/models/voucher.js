"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));

const VoucherSchema = new mongoose_1.default.Schema({
    voucher: {
        uri: {
            type: String,
            required: true,
        },
        minPrice: { 
            type: {
                type: String,
                required: true,
            },
            hex: {
                type: String,
                required: true,
            },
        },
        tokenId: {
            type: Number,
            required: true,
            unique: true,
        },
    },
    col:{
        name:{
            type:String,
            
        },
        amount:{
            type: Number,
            
        }
    },
    
    signature: {
        type: String,
        required: true,
    },
    redeemed: {
        type: Boolean,
        required: true,
    },
    
});
exports.default = mongoose_1.default.model("Voucher", VoucherSchema);
//# sourceMappingURL=voucher.js.map
/*
collection: {
    col_name:{
        type: String,
        required: false,
    },
    amount:{
        type: Number,
        required: false,
    }
},
*/