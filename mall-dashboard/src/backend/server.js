// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_dxyxSEUuzSF3bo",
  key_secret: "FOki2uihMNCAh7keCfNOlfeW",
});

// Express setup
const app = express();
app.use(express.json());
app.use(cors()); 

// ✅ MongoDB connect (Optional but kept for flexibility)
mongoose.connect("mongodb://127.0.0.1:27017/billing_counter")
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.warn("⚠️ MongoDB not connected, using fallback products."));

// ✅ Product model
const productSchema = new mongoose.Schema({
  uid: String,
  name: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);

// Fallback products based on USER'S ARDUINO CODE
const fallbackProducts = [
  { uid: "63D95F20", name: "Eggs", price: 60 },
  { uid: "AACC1405", name: "Bread", price: 30 },
  { uid: "43F17720", name: "Milk", price: 50 },
  { uid: "9538DD00", name: "Juice", price: 80 }
];

// ✅ Arduino COM port setup
const port = new SerialPort({
  path: "COM5",   // Ensure this matches your Arduino port
  baudRate: 9600,
  autoOpen: false 
});

port.open(function (err) {
  if (err) {
    console.error("Arduino COM Port Error:", err.message);
  } else {
    console.log("✅ Arduino connected on COM5");
  }
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

let latestData = {
  transactionId: null,
  action: null,
  name: null,
  price: 0
};

// ✅ Arduino data listener
parser.on("data", async (line) => {
  line = line.trim();
  console.log("Arduino Message:", line);

  if (line.startsWith("Scanned UID:")) {
    const uid = line.replace("Scanned UID:", "").trim().toUpperCase();
    
    // 1. Try finding in MongoDB
    let product;
    try {
      product = await Product.findOne({ uid });
    } catch (e) {}

    // 2. Fallback to hardcoded list if MongoDB fails/misses
    if (!product) {
      product = fallbackProducts.find(p => p.uid === uid);
    }

    if (product) {
      latestData = {
        transactionId: Date.now(),
        action: "SCAN",
        name: product.name,
        price: product.price
      };
    } else {
      latestData = { transactionId: Date.now(), action: "INVALID", name: "Unknown", price: 0 };
    }
  } 
  // Handling IR Sensor / Manual Add/Remove signals (Needs Arduino code update)
  else if (line.startsWith("ADD:")) {
    const price = parseInt(line.replace("ADD:", "").trim());
    latestData = {
      transactionId: Date.now(),
      action: "ADD",
      name: "Item", 
      price: price
    };
  }
  else if (line.startsWith("REMOVE:")) {
    const price = parseInt(line.replace("REMOVE:", "").trim());
    latestData = {
      transactionId: Date.now(),
      action: "REMOVE",
      name: "Item",
      price: price
    };
  }
});

// ✅ API routes
app.get("/api/billing/latest", (req, res) => {
  res.json(latestData);
});

// Reset latestData after fetch to prevent double adding if logic requires it
// But React frontend handles it with lastTransactionId, so it's fine.

// ✅ Create Razorpay Order
app.post("/api/payment/order", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Confirm Razorpay Payment
app.post("/api/payment/confirm", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const confirmAndNotifyArduino = () => {
    if (port.isOpen) {
      port.write("PAYMENT_SUCCESS\n");
      console.log("Sent PAYMENT_SUCCESS to Arduino");
    }
    latestData = { transactionId: Date.now(), action: "PAYMENT_DONE", name: null, price: 0 };
    return res.json({ status: "Success" });
  };

  if (razorpay_signature) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", "FOki2uihMNCAh7keCfNOlfeW")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return confirmAndNotifyArduino();
    } else {
      if (port.isOpen) port.write("PAYMENT_FAILED\n");
      return res.status(400).json({ status: "Failed", message: "Invalid Signature" });
    }
  }

  // Debug/Manual confirm
  confirmAndNotifyArduino();
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
