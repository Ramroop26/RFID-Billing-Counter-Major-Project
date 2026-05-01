import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "../Billing.css";

function BillingDashboard() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [lastTransactionId, setLastTransactionId] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [lastAction, setLastAction] = useState("");

  /* ================= RFID FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/billing/latest");
        const data = res.data;

        if (!data || !data.transactionId) return;
        if (data.transactionId === lastTransactionId) return;

        setLastTransactionId(data.transactionId);
        setLastAction(data.action);

        if (data.action === "SCAN") {
          updateCart(data.name, data.price, 1);
          const currentTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
          const priceVal = parseFloat(data.price) || 0;
          const newTotal = currentTotal + priceVal;
          speak(`${data.name || "Item"} scan ho gaya. Iska price ${priceVal} rupees hai. Aapka total bill ${newTotal} rupees ho gaya hai.`);
        } else if (data.action === "ADD") {
          updateCart("Manual Item", data.price, 1);
          const currentTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
          const priceVal = parseFloat(data.price) || 0;
          const newTotal = currentTotal + priceVal;
          speak(`Item add ho gaya. Price ${priceVal} rupees hai. Total bill ${newTotal} rupees ho gaya hai.`);
        } else if (data.action === "REMOVE") {
          updateCart(null, data.price, -1);
          const currentTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
          const priceVal = parseFloat(data.price) || 0;
          const newTotal = Math.max(0, currentTotal - priceVal);
          speak(`Item hat gaya. Ab total bill ${newTotal} rupees hai.`);
        } else if (data.action === "PAYMENT_DONE") {
          resetBilling();
        } else if (data.action === "INVALID") {
          // Do nothing
        }

      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    const interval = setInterval(fetchData, 1000); 
    return () => clearInterval(interval);
  }, [lastTransactionId, cart]);

  const updateCart = (name, price, qty, manual = false) => {
    setCart((prevCart) => {
      const itemName = name || "Item";
      const existing = prevCart.find((item) => item.name === itemName);

      if (qty > 0) {
        if (existing) {
          return prevCart.map((item) =>
            item.name === itemName
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        } else {
          return [...prevCart, { name: itemName, price: parseFloat(price), quantity: qty }];
        }
      } else {
        // Removal logic
        if (existing) {
          if (existing.quantity + qty <= 0) {
            return prevCart.filter((item) => item.name !== itemName);
          }
          return prevCart.map((item) =>
            item.name === itemName
              ? { ...item, quantity: item.quantity + qty }
              : item
          );
        } else {
          // Fallback to price-based removal for RFID scans that might not send a name
          const index = [...prevCart].reverse().findIndex(item => item.price === price);
          if (index !== -1) {
            const actualIndex = prevCart.length - 1 - index;
            const newCart = [...prevCart];
            if (newCart[actualIndex].quantity > 1) {
              newCart[actualIndex] = { ...newCart[actualIndex], quantity: newCart[actualIndex].quantity - 1 };
            } else {
              newCart.splice(actualIndex, 1);
            }
            return newCart;
          }
        }
      }
      return prevCart;
    });
  };

  const handleQuantityChange = (name, newQty) => {
    const qty = parseInt(newQty);
    if (isNaN(qty) || qty < 0) return;
    
    setCart((prevCart) => {
      if (qty === 0) {
        return prevCart.filter((item) => item.name !== name);
      }
      return prevCart.map((item) =>
        item.name === name ? { ...item, quantity: qty } : item
      );
    });
  };

  const resetBilling = () => {
    setCart([]);
    setTotal(0);
    setLastTransactionId(null);
    setShowQR(false);
  };

  /* ================= TOTAL ================= */
  useEffect(() => {
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cart]);

  /* ================= VOICE ================= */
  const speak = (text) => {
    console.log("Attempting to speak:", text);
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Clear any stuck speech

    const msg = new SpeechSynthesisUtterance(text);
    
    // Get voices
    const voices = window.speechSynthesis.getVoices();
    // Try to get any Hindi or English voice
    let selectedVoice = voices.find(v => v.lang === "hi-IN" && v.name.includes("Google")) ||
                        voices.find(v => v.lang === "hi-IN") || 
                        voices.find(v => v.lang.includes("en-IN"));
    
    if (selectedVoice) {
      msg.voice = selectedVoice;
    }

    msg.rate = 0.9; 
    msg.pitch = 1.0;
    msg.volume = 1.0;

    window.speechSynthesis.speak(msg);
  };

  /* ================= RECEIPT ================= */
  const handlePrint = (paymentId = "RFID-" + Date.now()) => {
    const content = `
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; width: 250px; padding: 20px; color: #000; }
            .header { text-align: center; border-bottom: 2px dashed #000; margin-bottom: 10px; }
            table { width: 100%; margin-top: 10px; }
            .total-row { font-weight: bold; border-top: 1px solid #000; }
            .footer { text-align: center; margin-top: 20px; font-size: 0.8em; }
            .txn-id { font-size: 0.7em; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>MALL STORE</h2>
            <p>${new Date().toLocaleString()}</p>
            <p class="txn-id">TXN ID: ${paymentId}</p>
          </div>
          <table>
            ${cart.map(item => `
              <tr>
                <td>${item.name} x${item.quantity}</td>
                <td style="text-align:right">₹${item.price * item.quantity}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td>TOTAL</td>
              <td style="text-align:right">₹${total}</td>
            </tr>
          </table>
          <div class="footer">
            <p>Thank you for shopping!</p>
            <p>Visit again 🙏</p>
          </div>
        </body>
      </html>
    `;

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(content);
    iframeDoc.close();

    setTimeout(() => {
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 2000);
    }, 250);
  };

  /* ================= RAZORPAY ================= */
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (bankCode = null) => {
    if (total === 0) return;
    speak(`Aapka total price ${total} rupees hai. Kripya payment karein.`);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Checkout UI failed to load!");
      return;
    }

    try {
      const { data: order } = await axios.post("http://localhost:5000/api/payment/order", { amount: total });

      const options = {
        key: "rzp_test_dxyxSEUuzSF3bo", 
        amount: order.amount,
        currency: "INR",
        name: "Premium Mall Store",
        description: "RFID Smart Billing System",
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post("http://localhost:5000/api/payment/confirm", response);
            speak("Payment successful ho gaya hai. Dhanyawad.");
            handlePrint(response.razorpay_payment_id); // 🔥 Pass TXN ID here
            alert("Payment Done ✅");
            resetBilling();
          } catch (e) {
            alert("Verification Failed ❌");
          }
        },
        theme: { color: "#00f2fe" }
      };

      // 🔥 Pre-select bank if bankCode is provided
      if (bankCode) {
        options.method = 'netbanking';
        options.bank = bankCode;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment Error!");
    }
  };

  const popularBanks = [
    { name: "SBI", code: "SBIN", logo: "🏦" },
    { name: "HDFC", code: "HDFC", logo: "🏛️" },
    { name: "ICICI", code: "ICIC", logo: "🏢" },
    { name: "AXIS", code: "UTIB", logo: "🏪" }
  ];

  return (
    <div className="dashboard-container">
      <div className="title-wrapper">
        <h1 className="title">✨ Smart RFID Counter</h1>
        <div className="header-controls">
          <div className="status-badge">🟢 Online</div>
        </div>
      </div>

      <div className="glass-card">
        <div className="section-header">
          <span>🛒 Shopping Cart</span>
          {lastAction && (
            <span className={`action-pill ${lastAction.toLowerCase()}`}>
              Last Action: {lastAction}
            </span>
          )}
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📡</div>
              <p>Waiting for RFID scans...</p>
              <small>Scan a product or use triggers to start</small>
            </div>
          ) : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, i) => (
                  <tr key={i} className="cart-row">
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="qty-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => {
                            updateCart(item.name, item.price, -1, true);
                            if(item.quantity > 1) {
                              speak(`${item.name} ki quantity kam ho gayi.`);
                            } else {
                              speak(`${item.name} hat gaya.`);
                            }
                          }}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          className="qty-input"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                          min="1"
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => {
                            updateCart(item.name, item.price, 1, true);
                            speak(`${item.name} ki quantity badh gayi.`);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button 
                        className="remove-btn-icon" 
                        onClick={() => handleQuantityChange(item.name, 0)}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="footer-section">
          <div className="billing-summary">
            <div className="bill-item">
              <span>Items Count:</span>
              <span>{cart.reduce((s, i) => s + i.quantity, 0)}</span>
            </div>
            <div className="total-display">
              <span className="total-label">Grand Total</span>
              <span className="total-amount">₹{total}</span>
            </div>
          </div>

          <div className="action-row">
            <button
              className="glow-btn pay-btn"
              onClick={() => handlePayment()}
              disabled={cart.length === 0}
            >
              <span>🚀 Proceed to Checkout</span>
            </button>
            <button
              className="outline-btn"
              onClick={() => setShowQR(!showQR)}
              disabled={cart.length === 0}
            >
              {showQR ? "Hide QR" : "Show UPI QR"}
            </button>
          </div>

          {/* 🔥 Popular Banks Section */}
          {!showQR && cart.length > 0 && (
            <div className="banks-section">
              <p className="banks-title">Pay via Popular Banks:</p>
              <div className="banks-grid">
                {popularBanks.map((bank) => (
                  <button
                    key={bank.name}
                    className="bank-card"
                    onClick={() => handlePayment(bank.code)}
                  >
                    <span className="bank-logo">{bank.logo}</span>
                    <span className="bank-name">{bank.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showQR && (
            <div className="qr-box">
              <QRCodeCanvas 
                value={`upi://pay?pa=8269709627@axl&pn=Mall&am=${total}&cu=INR`} 
                size={180}
                includeMargin={true}
              />
              <p>Scan with any UPI App</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BillingDashboard;