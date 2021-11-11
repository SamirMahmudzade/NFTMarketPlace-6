import { Request, Response } from "express";
import Voucher from "../models/voucher";

const express = require('express')
const path = require('path')
const app = express()
  
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const FetchAllVouchers = async (req: Request, res: Response) => {
  let allVoucher;
  try {
    allVoucher = await Voucher.find({});
  } catch (err) {
    console.log(err);
  }

  return res.json({
    allVoucher,
  });
};

export default FetchAllVouchers;
