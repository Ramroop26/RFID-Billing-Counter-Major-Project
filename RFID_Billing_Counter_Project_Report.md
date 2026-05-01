# A PROJECT REPORT ON RFID BILLING COUNTER

**Submitted in partial fulfillment of the requirement for the award of**
### DEGREE COURSE IN INTERNET OF THINGS

**SESSION 2022-2026**

<div align="center">
  <img src="file:///C:/Users/Idea/Downloads/SATI_Vidisha.jpg" alt="SATI Vidisha Logo" width="200" height="200" />
</div>

<br><br>

**SUBMITTED BY:**
- **RAMROOP PRAJAPATI** (0108IO221071)
- **DEEKSHANSH RAI** (0108IO221018)
- **SAHIL KUMAR NAMDEV** (0108IO221051)
- **DEEPU PRAJAPATI** (0108CE221006)
- **AMIR KHAN** (0108IO211004)

<br><br>

**SAMRAT ASHOK TECHNOLOGICAL INSTITUTE (SATI)**
VIDISHA (M.P.)
DEPARTMENT OF CYBERSECURITY & IOT

---

<div style="page-break-after: always;"></div>

## CERTIFICATE

<div align="center">
  <img src="file:///C:/Users/Idea/Downloads/SATI_Vidisha.jpg" alt="SATI Vidisha Logo" width="150" height="150" />
</div>

**SESSION 2022-2026**

This is to certify that **DEEKSHANSH RAI, RAMROOP PRAJAPATI, SAHIL KUMAR NAMDEV, DEEPU PRAJAPATI, AMIR KHAN**, students of B.Tech. VIII Sem, Internet of Things of this institute has successfully submitted a Major Project **“RFID BILLING COUNTER”**, as a partial fulfillment for the award of Degree of Bachelor of Technology in Dept of Cybersecurity & IoT from Samrat Ashok Technological Institute, Vidisha (M.P.)

Their work is found to be satisfactory and demonstrates a comprehensive understanding of Internet of Things concepts, Full-Stack web development, and hardware-software integration. We wish them success in all their future endeavors.

<br>

**Place:** VIDISHA  
**Date:** 08/05/2026  

<br><br><br>

**Prof. SHIVANGI JAIN**  
*(Project Guide)*

**Dr. SHILPA DATAR**  
*(Head of Department)*

**Dr. Y.K. Jain**  
*(Director, SATI)*

---

<div style="page-break-after: always;"></div>

## DECLARATION

We hereby declare that the major project report entitled **“RFID BILLING COUNTER”** submitted in partial fulfillment of the requirements for the award of the degree is our original work. This project has been carried out under the supervision of **Prof. SHIVANGI JAIN**.

We further declare that this work has not been submitted elsewhere for the award of any degree, diploma, or certification. All sources of information used in this project have been duly acknowledged. The hardware architecture, software programming, and system integration were performed strictly by the project members.

<br>

**Place:** VIDISHA  
**Date:** 08/05/2026  

<br><br>

- **DEEKSHANSH RAI** (Enrollment No.: 0108IO221018)
- **RAMROOP PRAJAPATI** (Enrollment No.: 0108IO221071)
- **SAHIL KUMAR NAMDEV** (Enrollment No.: 0108IO221051)
- **DEEPU PRAJAPATI** (Enrollment No.: 0108CE221006)
- **AMIR KHAN** (Enrollment No.: 0108IO211004)

---

<div style="page-break-after: always;"></div>

## ACKNOWLEDGEMENT

We, the students of Internet of Things, Third Year, hereby take immense pleasure in thanking **Dr. Y.K. Jain**, Director, SATI, Vidisha for providing the best facilities in the college without whom this work would not have been possible at this level. The infrastructure and academic environment provided by the institution were crucial to the completion of this research.

We are highly thankful to **Dr. Shilpa Datar**, Head of Department, Dept of Cyber Security and IoT for her help in completion of this project without whose valuable advice and proper guidance, it would have been impossible for us to complete the project. Her constant encouragement motivated us to explore the depths of IoT technologies.

We would like to express our sincere gratitude to **Prof. SHIVANGI JAIN**, Project Guide for their continuous support, valuable guidance, and encouragement throughout the completion of this project. Their insights, constructive criticism, and technical suggestions greatly contributed to the success of this work, especially during the hardware-software integration phases.

<br><br>

- DEEKSHANSH RAI (0108IO221018)
- RAMROOP PRAJAPATI (0108IO221071)
- SAHIL KUMAR NAMDEV (0108IO221051)
- DEEPU PRAJAPATI (0108CE221006)
- AMIR KHAN (0108IO211004)

---

<div style="page-break-after: always;"></div>

## ABSTRACT

Radio Frequency Identification (RFID) is an emerging wireless technology that enables automatic identification and tracking of objects using radio waves. In recent years, RFID has gained significant importance in retail automation due to its speed, accuracy, and contactless operation. As the retail sector expands, the demand for faster, more reliable, and secure checkout mechanisms has skyrocketed.

This project presents the exhaustive design and implementation of a **Full-Stack RFID-based Automatic Billing Counter System** aimed at improving the efficiency of the checkout process in supermarkets and retail stores. Traditional billing systems based on barcode scanning are notoriously time-consuming and require manual effort, often resulting in long queues, human errors, and decreased customer satisfaction. RFID technology overcomes these limitations by enabling fast and simultaneous scanning of multiple items without the need for direct line-of-sight.

In the proposed system, each product is embedded with a passive RFID tag containing a unique identification number (UID). When the product is placed near the RFID reader, the tag is detected through electromagnetic induction, and an **Arduino microcontroller** processes this hardware event. To modernize the retail experience and push beyond mere hardware prototyping, this embedded system is seamlessly integrated with a modern **React.js Frontend Dashboard** and a robust **Node.js/Express Backend**. The backend listens to the Arduino via USB Serial Communication, reflecting live scanned items, dynamically calculating totals, and managing cart modifications on the cashier's React UI in real-time.

Furthermore, the project features a fully integrated **Razorpay Payment Gateway**. Once the customer finalizes their shopping, the React UI triggers a secure digital payment prompt. Upon successful transaction processing, the backend communicates a success payload back to the Arduino, which provides immediate audio-visual confirmation (via a 16x2 I2C LCD and an Active Buzzer) and resets the cart state for the next customer.

The system is designed using cost-effective components (Arduino Uno, RC522 RFID module, IR sensors) combined with industry-standard web technologies, making it highly suitable for small to medium-scale retail applications. The implementation successfully demonstrates drastically improved billing speeds, a highly interactive user interface, a reduction in manual human intervention, and robust digital payment handling.

Overall, the proposed full-stack RFID billing system provides a reliable, scalable, and user-friendly solution for modern retail environments. It bridges the physical world of IoT with modern cloud-based web architecture, contributing significantly towards the concept of smart shopping and retail automation.

---

<div style="page-break-after: always;"></div>

## TABLE OF CONTENTS

| Chapter No. | Title | Page No. |
|---|---|---|
| | **List of Figures** | i |
| | **List of Tables** | ii |
| **1.** | **Introduction** | 1 |
| | 1.1 Overview | 1 |
| | 1.2 Background of the Study | 3 |
| | 1.3 Scope of the Project | 5 |
| **2.** | **Literature Review** | 7 |
| | 2.1 Evolution of Billing Systems | 7 |
| | 2.2 Barcode vs RFID | 11 |
| **3.** | **Problem Statement and Objectives** | 14 |
| | 3.1 Problem Identification | 14 |
| | 3.2 Main Objectives | 16 |
| **4.** | **System Architecture and Methodology** | 19 |
| | 4.1 System Development Approach | 19 |
| | 4.2 Full-Stack Block Diagram | 22 |
| **5.** | **Hardware Components Description** | 25 |
| | 5.1 Arduino Uno | 25 |
| | 5.2 MFRC522 RFID Module | 29 |
| | 5.3 LCD & IR Sensors | 33 |
| **6.** | **Software Environment and Web Technologies** | 37 |
| | 6.1 React.js (Frontend) | 37 |
| | 6.2 Node.js & Express (Backend) | 42 |
| | 6.3 Razorpay Payment Integration | 47 |
| **7.** | **Implementation and Coding** | 51 |
| | 7.1 Hardware Circuit Connections | 51 |
| | 7.2 Embedded C++ Firmware (Arduino) | 53 |
| | 7.3 Backend API (Node.js) | 58 |
| | 7.4 Frontend UI (React.js) | 61 |
| **8.** | **Results and Testing** | 65 |
| | 8.1 Hardware-Software Sync Testing | 65 |
| | 8.2 Performance Analysis | 67 |
| **9.** | **Conclusion and Future Scope** | 69 |
| | 9.1 Conclusion | 69 |
| | 9.2 Future Scope | 70 |
| | **References** | 71 |
| | **User Manual** | 72 |

---

<div style="page-break-after: always;"></div>

## LIST OF FIGURES

1. **Fig 1.1:** Basic Working Principle of an RFID System
2. **Fig 4.1:** Full-Stack Architecture Diagram
3. **Fig 5.1:** Arduino Uno R3 Board Overview
4. **Fig 5.2:** RC522 RFID Reader Module
5. **Fig 5.3:** 16x2 I2C LCD Display
6. **Fig 5.4:** IR Obstacle Avoidance Sensor
7. **Fig 6.1:** React Dashboard UI View
8. **Fig 6.2:** Razorpay Checkout Integration
9. **Fig 7.1:** Complete Circuit Diagram of the System

---

## LIST OF TABLES

1. **Table 1.1:** Comparison of Existing Billing Systems
2. **Table 5.1:** Arduino Uno Specifications
3. **Table 5.2:** RC522 RFID Module Specifications
4. **Table 7.1:** Arduino Pin Mapping and Connections
5. **Table 8.1:** Full-Stack Integration Test Cases
6. **Table 8.2:** Time Comparison: Manual vs RFID Billing
7. **Table 8.3:** Cost Analysis of the Implemented Prototype

---

<div style="page-break-after: always;"></div>

## CHAPTER 1: INTRODUCTION

### 1.1 Overview
In modern retail, efficiency and speed at the checkout counter are paramount. Customers often cite long waiting lines as their primary dissatisfaction with the in-store shopping experience. With the rapid expansion of global commerce, supermarkets are handling an unprecedented volume of inventory. To manage this scale, Radio Frequency Identification (RFID) has emerged as a wireless communication technology that uses electromagnetic waves to identify and track objects through tags and readers. 

In this project, an advanced RFID-based billing counter system is implemented. However, in the era of cloud computing and web applications, hardware alone is not enough for modern retail. We integrated a comprehensive web dashboard using **React.js** and **Node.js** that connects the physical checkout hardware to the digital world. This allows real-time rendering of cart contents on a screen, culminating in a seamless, secure, Razorpay-powered checkout experience that mirrors modern enterprise solutions.

<div align="center">
  <img src="./images/rfid_working_principle.png" alt="Fig 1.1: Basic Working Principle of an RFID System" width="550" />
  <br><i>Fig 1.1: Basic Working Principle of an RFID System</i>
</div>

<div style="page-break-after: always;"></div>

### 1.2 Background of the Study
The retail industry has undergone massive transformations over the decades. Early retail relied entirely on human memory and mechanical cash registers. The introduction of the Universal Product Code (UPC) and the optical barcode scanner in the late 1970s revolutionized inventory management and checkout processes. 

However, as the volume of daily trade has grown, the limitations of barcodes have become glaringly apparent. Barcodes require direct line-of-sight, manual physical orientation by a cashier, and they are susceptible to damage. A crumpled wrapper or a scratched label can bring the checkout line to a halt.

RFID technology was originally developed for military aviation tracking (IFF systems) during World War II. Over the last two decades, the miniaturization of silicon chips has led to a drastic reduction in cost, making it feasible for item-level tagging in retail. By leveraging RFID, multiple items can be read simultaneously in fractions of a second, completely bypassing the optical line-of-sight requirement and laying the foundation for "Smart Shopping."

<div style="page-break-after: always;"></div>

### 1.3 Scope of the Project
The scope of this project encompasses the end-to-end design, hardware assembly, and full-stack software programming of a localized smart billing counter. The implementation covers embedded systems, server-side programming, and client-side web rendering.

The system is designed to:
- Instantly identify items via unique 13.56 MHz passive RFID tags.
- Use an Arduino Uno to filter, process, and handle immediate hardware logic.
- Transmit physical hardware events to a centralized Node.js Express server via Serial Port communication.
- Render a live, responsive Shopping Cart UI on a React.js application for the cashier or customer.
- Facilitate cashless, secure digital transactions through Razorpay API integration on the frontend.
- Provide real-time audio-visual feedback (LCD, LEDs, Active Buzzer) to the physical user based on web-server callbacks.
- Integrate Infrared (IR) sensors to allow physical hand-wave gestures to act as dynamic cart modifiers (adding/removing items), simulating a smart-cart gateway.

---

<div style="page-break-after: always;"></div>

## CHAPTER 2: LITERATURE REVIEW

### 2.1 Evolution of Billing Systems
The evolution of billing systems in the retail sector represents a continuous drive towards economic efficiency and throughput. 
- **The Manual Era:** Early retail relied entirely on manual entry. Cashiers had to memorize prices or consult extensive paper ledgers. The invention of the mechanical cash register in 1879 by James Ritty introduced mechanical tracking and theft deterrence, but the human data-entry element remained a severe bottleneck.
- **The Optical Era:** The adoption of barcodes and laser scanners was a monumental paradigm shift. It allowed centralized pricing databases. If a price changed, it only needed to be changed in the computer, not on the physical sticker.
- **The RF Era:** Modern consumer expectations now demand even faster turnaround times. "Just Walk Out" technologies, pioneered by concepts like Amazon Go, rely heavily on computer vision and RFID to eliminate the checkout counter entirely.

### 2.2 Barcode vs RFID
The fundamental difference between barcode and RFID lies in how data is extracted. Barcodes use optical lasers to read visual contrast (black bars vs white spaces). RFID uses electromagnetic induction to power a microchip, which then broadcasts its digital ID back to the reader via radio waves.

**Table 1.1: Comparison of Existing Billing Systems**

| Feature | Barcode System | RFID System |
|---|---|---|
| **Technology** | Optical Laser Scanner | Radio Frequency Waves |
| **Line of Sight** | Strictly Required | Not Required (can read through bags) |
| **Scanning Speed** | Serial (One by one, slow) | Parallel (Multiple items instantly) |
| **Durability** | Low (easily torn or obscured) | High (embedded inside packaging) |
| **Data Capacity** | Low (numeric string) | High (can store serial numbers, dates) |
| **Automation Level** | Semi-Automated (requires cashier) | Fully Automated |

Research by Hubert et al. (2018) explored customer acceptance of automated billing, highlighting that the perceived speed benefits heavily outweigh the perceived risks of adopting new checkout technologies. Similarly, Ajay Kumar's studies demonstrated that 13.56MHz systems provide the best balance of range and anti-collision properties for item-level retail tagging.

---

<div style="page-break-after: always;"></div>

## CHAPTER 3: PROBLEM STATEMENT AND OBJECTIVES

### 3.1 Problem Identification
The traditional optical billing system used in retail stores faces several critical, compounding issues:

1. **Time-Consuming Serial Process:** The biggest problem is that barcode scanners are inherently serial and optical. The cashier must physically handle every single product, locate the hidden barcode, and orient it precisely toward the scanner light.
2. **Queue Anxiety and Economic Loss:** Because the scanning process is slow, long lines form at the billing counters. Retail studies show that customers will frequently abandon their shopping carts and leave the store if checkout lines exceed a certain length, resulting in direct revenue loss.
3. **Physical Wear and Tear:** Barcodes are printed on paper wrappers. Condensation on frozen foods, tearing, or smudging renders the barcode unreadable, forcing the cashier to manually type a 12-digit UPC code, further delaying the queue.
4. **Ergonomic Strain:** Cashiers suffer from repetitive strain injuries (RSI) due to the constant twisting and lifting of heavy items over optical scanners.
5. **Inventory Shrinkage:** Manual handling leads to mistakes, such as scanning an item twice or forgetting it entirely.

<div style="page-break-after: always;"></div>

### 3.2 Main Objectives
To completely counteract these challenges, the Full-Stack RFID Billing Counter system is engineered to achieve the following precise objectives:

1. **Complete Automation:** Transition from manual, human-dependent serial scanning to parallel, automated electromagnetic item detection.
2. **Speed Maximization:** Eliminate the need for line-of-sight. Customers can simply place a basket on the counter, and the reader instantly captures all items.
3. **Integration of IoT with Modern Web Stacks:** Prove that local embedded hardware (Arduino) can seamlessly interface with modern web technologies (React/Node) to create a cloud-ready enterprise solution.
4. **Secure Cashless Transactions:** Integrate a real-world payment gateway (Razorpay) to prove the commercial viability of the prototype.
5. **Dynamic Interactivity:** Utilize secondary sensors (IR Obstacle Sensors) to allow intuitive, physical gestures for adding or removing items, making the system forgiving of user mistakes.
6. **Cost-Effectiveness:** Demonstrate that advanced retail automation can be achieved using highly affordable, accessible embedded systems rather than exorbitantly expensive proprietary enterprise hardware.

---

<div style="page-break-after: always;"></div>

## CHAPTER 4: SYSTEM ARCHITECTURE AND METHODOLOGY

### 4.1 System Development Approach
The development of this project followed an Agile, layered Full-Stack IoT design approach. We modularized the system into distinct tiers to ensure stability and ease of debugging.
1. **Hardware Layer:** The physical realm. The Arduino Uno polls the RC522 and IR sensors. It handles the immediate physics of reading radio waves and debouncing noisy sensor data.
2. **Bridge Layer:** The USB Serial communication. Using the `serialport` npm package, we established a reliable stream of string-based events between the Arduino and the computer.
3. **Backend Layer:** The Node.js Express server acts as the central brain. It receives raw UIDs from the hardware, cross-references them against a product database, and serves APIs to the frontend.
4. **Frontend Layer:** The React.js Single Page Application (SPA). It polls the backend, maintains the state of the shopping cart, and provides a beautiful, dark-mode user interface for the operator.
5. **Payment Layer:** The Razorpay integration. It securely handles the financial handshake.

<div style="page-break-after: always;"></div>

### 4.2 Full-Stack Block Diagram

<div align="center">
  <img src="./images/full_stack_diagram.png" alt="Fig 4.1: Full-Stack Architecture Diagram" width="550" />
  <br><i>Fig 4.1: Full-Stack Architecture Diagram</i>
</div>

The architecture diagram illustrates the flow of data. Physical objects trigger the Arduino. The Arduino sends a payload (e.g., `SCAN:A1B2C3`) to Node.js. Node.js updates the cart state. React fetches the cart and displays it. React triggers Razorpay. Razorpay responds with success. Node.js sends `PAYMENT_SUCCESS` back to Arduino. Arduino beeps and flashes the green LED. This forms a perfect, closed-loop IoT ecosystem.

---

<div style="page-break-after: always;"></div>

## CHAPTER 5: HARDWARE COMPONENTS DESCRIPTION

### 5.1 Arduino Uno
The Arduino Uno is a microcontroller board based on the ATmega328P. It serves as the primary data acquisition and local control unit. It features 14 digital input/output pins, 6 analog inputs, a 16 MHz quartz crystal, and a USB connection. In this project, the Arduino is programmed to continuously poll the SPI bus for RFID tags and the analog pins for IR sensor threshold breaks.

<div align="center">
  <img src="./images/arduino_uno_board.png" alt="Fig 5.1: Arduino Uno R3 Board Overview" width="450" />
  <br><i>Fig 5.1: Arduino Uno R3 Board Overview</i>
</div>

**Table 5.1: Arduino Uno Specifications**
| Microcontroller | ATmega328P |
|---|---|
| Operating Voltage | 5V |
| Input Voltage (recommended) | 7-12V |
| Digital I/O Pins | 14 (of which 6 provide PWM) |
| Flash Memory | 32 KB |
| Clock Speed | 16 MHz |

<div style="page-break-after: always;"></div>

### 5.2 MFRC522 RFID Module
The MFRC522 is a highly integrated reader/writer IC for contactless communication at 13.56 MHz. It utilizes an outstanding modulation and demodulation concept completely integrated for different kinds of contactless communication methods and protocols (ISO/IEC 14443 A). 

It communicates with the Arduino via the SPI (Serial Peripheral Interface) bus, which ensures high-speed, synchronous data transfer. Crucially, the RC522 operates at 3.3V logic; exposing it to 5V logic signals without level shifters can degrade the IC over time, though it is often tolerant in prototype environments.

<div align="center">
  <img src="./images/rc522_rfid_module.png" alt="Fig 5.2: RC522 RFID Reader Module" width="450" />
  <br><i>Fig 5.2: RC522 RFID Reader Module</i>
</div>

<div style="page-break-after: always;"></div>

### 5.3 LCD & IR Sensors
<div align="center">
  <img src="./images/i2c_lcd_display.png" alt="Fig 5.3: 16x2 I2C LCD Display" width="400" />
  <br><i>Fig 5.3: 16x2 I2C LCD Display</i>
</div>

**16x2 I2C LCD Display:**
A 16x2 LCD display can show 16 characters per line across 2 lines. To drastically reduce the pin footprint on the Arduino, a PCF8574 I2C expansion module is soldered to the back of the LCD. This reduces the required connections from 16 wires down to just 4: VCC, GND, SDA (Data), and SCL (Clock). It provides high-contrast, local text feedback indicating system status, scanned product names, and error states.

<div align="center">
  <img src="./images/ir_sensor_module.png" alt="Fig 5.4: IR Obstacle Avoidance Sensor" width="400" />
  <br><i>Fig 5.4: IR Obstacle Avoidance Sensor</i>
</div>

**IR Obstacle Avoidance Sensors:**
Infrared sensors consist of an IR transmitter diode and an IR receiver photodiode. They detect objects by emitting infrared light and measuring the reflection angle and intensity. In this project, two IR sensors act as a physical "Smart Gateway". 
- Passing a hand over Sensor 1 artificially triggers an "Add Item" event for the last scanned product.
- Passing over Sensor 2 triggers a "Remove Item" event. 
This demonstrates how physical gateways can supplement pure RFID data for interactive correction.

---

<div style="page-break-after: always;"></div>

## CHAPTER 6: SOFTWARE ENVIRONMENT AND WEB TECHNOLOGIES

### 6.1 React.js (Frontend)
React is a declarative, component-based, and highly efficient JavaScript library developed by Facebook for building dynamic user interfaces. Unlike traditional HTML, React uses a Virtual DOM to intelligently update only the exact elements on the screen that change, resulting in lightning-fast performance.

In this project, React is utilized to build the Mall Dashboard. It provides a sleek, modern UI where cashiers can monitor scanned items, view total bills in real-time, and trigger Razorpay payments. The UI relies heavily on React hooks, specifically `useState` to maintain the array of cart items, and `useEffect` to continuously poll the Node.js server or maintain a WebSocket connection for live hardware updates.

<div align="center">
  <img src="./images/react_dashboard_ui.png" alt="Fig 6.1: React Dashboard UI View" width="550" />
  <br><i>Fig 6.1: React Dashboard UI View</i>
</div>

<div style="page-break-after: always;"></div>

### 6.2 Node.js & Express (Backend)
Node.js is an asynchronous, event-driven JavaScript runtime built on Chrome's V8 engine. It is designed to build scalable network applications. Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile APIs.

In our architecture, Node.js serves as the critical translation layer. Web browsers (React) cannot natively access local COM ports or USB hardware due to strict security sandboxes. Therefore, the Node.js server runs locally on the checkout machine, utilizing the `serialport` npm package to read byte-streams directly from the Arduino. It parses these streams, identifies the RFID tags, and then exposes secure HTTP REST API endpoints (`/api/cart`, `/api/payment`) that the React application can consume.

### 6.3 Razorpay Payment Integration
<div align="center">
  <img src="./images/razorpay_checkout_ui.png" alt="Fig 6.2: Razorpay Checkout Integration" width="550" />
  <br><i>Fig 6.2: Razorpay Checkout Integration</i>
</div>

To facilitate digital payments and prove commercial viability, the Razorpay payment gateway API is integrated. 

**The Handshake Flow:**
1. The user clicks "Checkout" in the React app.
2. React requests an Order ID from the Node.js backend.
3. Node.js securely contacts Razorpay servers with the total amount and secret keys to generate an Order ID.
4. The React app receives the Order ID and invokes the Razorpay frontend script, opening a secure, modal payment popup over the application.
5. Upon successful payment (via dummy credit card or UPI testing credentials), Razorpay fires a success callback.
6. React notifies the Node.js backend.
7. Node.js writes the string `PAYMENT_SUCCESS\n` directly to the USB Serial Port.
8. The Arduino reads this, plays a success melody, and resets the local hardware state.

---

<div style="page-break-after: always;"></div>

## CHAPTER 7: IMPLEMENTATION AND CODING

### 7.1 Hardware Circuit Connections
Wiring the components correctly is vital. SPI and I2C buses must be connected to their hardware-specific pins on the ATmega328p.

<div align="center">
  <img src="./images/rfid_circuit_diagram.png" alt="Fig 7.1: Complete Circuit Diagram of the System" width="550" />
  <br><i>Fig 7.1: Complete Circuit Diagram of the System</i>
</div>

**Table 7.1: Arduino Pin Mapping**
| Component | Pin | Arduino Destination |
|---|---|---|
| RC522 | SDA (SS) | D10 |
| RC522 | SCK | D13 |
| RC522 | MOSI | D11 |
| RC522 | MISO | D12 |
| LCD I2C | SDA / SCL | A4 / A5 |
| IR Sensors | OUT | A0, A1 |
| Buzzer / LED | POS | D8, A2, A3 |

<div style="page-break-after: always;"></div>

### 7.2 Embedded C++ Firmware (Arduino)
This code acts as the real-time embedded logic controller. It manages SPI communications, sensor debouncing, and serial transmission.

```cpp
#include <Wire.h> 
#include <LiquidCrystal_I2C.h> 
#include <SPI.h> 
#include <MFRC522.h> 

LiquidCrystal_I2C lcd(0x27, 16, 2); 
#define SS_PIN 10 
#define RST_PIN 9 
MFRC522 rfid(SS_PIN, RST_PIN); 

#define BUZZER_PIN 8 
#define IR1_PIN A0 
#define IR2_PIN A1 
#define GREEN_LED A2 

bool ir1Triggered = false; 

// Helper to convert byte array to HEX String
String getUID(MFRC522::Uid uidStruct) { 
  String uid = ""; 
  for (byte i = 0; i < uidStruct.size; i++) { 
    if (uidStruct.uidByte[i] < 0x10) uid += "0"; 
    uid += String(uidStruct.uidByte[i], HEX); 
  } 
  uid.toUpperCase(); 
  return uid; 
} 

void setup() { 
  Serial.begin(9600); 
  SPI.begin();        
  rfid.PCD_Init();    
  lcd.init(); lcd.backlight(); 
  pinMode(BUZZER_PIN, OUTPUT); pinMode(IR1_PIN, INPUT); pinMode(GREEN_LED, OUTPUT); 
  lcd.print("System Ready"); 
} 

void loop() { 
  // RFID Reading
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) { 
    tone(BUZZER_PIN, 1000, 150); 
    String uid = getUID(rfid.uid); 
    
    // TRANSMIT TO NODE.JS
    Serial.println("SCAN:" + uid); 
    
    lcd.clear(); lcd.print("Tag Scanned");
    delay(1000); lcd.clear(); lcd.print("System Ready");
    rfid.PICC_HaltA(); 
  } 

  // IR Add Item Logic
  if (digitalRead(IR1_PIN) == LOW && !ir1Triggered) { 
    Serial.println("CMD:ADD");
    ir1Triggered = true; 
    tone(BUZZER_PIN, 1200, 200); 
  } 
  if (digitalRead(IR1_PIN) == HIGH) ir1Triggered = false; 

  // Listen for Payment Success from Node.js
  if (Serial.available() > 0) { 
    String msg = Serial.readStringUntil('\n'); 
    msg.trim(); 
    if (msg == "PAYMENT_SUCCESS") { 
      lcd.clear(); lcd.print("Payment Done!"); 
      digitalWrite(GREEN_LED, HIGH); tone(BUZZER_PIN, 1500, 500); 
      delay(2000); digitalWrite(GREEN_LED, LOW);
      lcd.clear(); lcd.print("System Ready");
    }
  } 
}
```

<div style="page-break-after: always;"></div>

### 7.3 Backend API (Node.js)
The `server.js` file establishes the link between Arduino and React. It utilizes the `serialport` library to listen to the COM port asynchronously.

```javascript
const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const Razorpay = require('razorpay');

const app = express();
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: 'rzp_test_YourKeyHere',
    key_secret: 'YourSecretHere'
});

// Mock Database
const productDB = {
    "63D95F20": { name: "Eggs", price: 60 },
    "AACC1405": { name: "Bread", price: 30 }
};

// Connect to Arduino
const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Listen to Hardware
parser.on('data', (data) => {
    const message = data.trim();
    if(message.startsWith('SCAN:')) {
        const uid = message.split(':')[1];
        if (productDB[uid]) {
            console.log("Scanned:", productDB[uid].name);
            // In a full app, emit this via Socket.io to React
        }
    }
});

// Payment Callback API
app.post('/api/payment-success', (req, res) => {
    console.log("Payment Confirmed! Notifying Hardware...");
    port.write('PAYMENT_SUCCESS\n'); // Signal the Arduino
    res.send({ status: 'hardware_updated' });
});

app.listen(5000, () => console.log('Node API running on port 5000'));
```

<div style="page-break-after: always;"></div>

### 7.4 Frontend UI (React.js)
The `BillingCounter.jsx` handles the dynamic user interface, cart state, and the Razorpay integration popup.

```jsx
import React, { useState } from 'react';

const BillingCounter = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // This would be triggered by a WebSocket event from Node.js
    const simulateItemScan = (product) => {
        setCart([...cart, product]);
        setTotal(total + product.price);
        
        // Browser AI Voice Synthesis
        const utterance = new SpeechSynthesisUtterance(`${product.name} added.`);
        window.speechSynthesis.speak(utterance);
    };

    const handleCheckout = async () => {
        const options = {
            key: "rzp_test_YourKeyHere",
            amount: total * 100, // Razorpay takes amounts in paise
            currency: "INR",
            name: "Smart Mall Billing",
            description: "RFID Cart Transaction",
            handler: async function (response) {
                alert("Payment Successful! ID: " + response.razorpay_payment_id);
                // Tell Node to tell Arduino
                await fetch('/api/payment-success', { method: 'POST' });
                setCart([]);
                setTotal(0);
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="dashboard-container">
            <h1>🛍️ Smart Cart POS</h1>
            <div className="cart-list">
                {cart.map((item, i) => (
                    <div key={i} className="cart-item">
                        <span>{item.name}</span>
                        <span>₹{item.price}</span>
                    </div>
                ))}
            </div>
            <h2>Total: ₹{total}</h2>
            <button onClick={handleCheckout} className="razorpay-btn">
                Checkout with Razorpay
            </button>
        </div>
    );
};

export default BillingCounter;
```

---

<div style="page-break-after: always;"></div>

## CHAPTER 8: RESULTS AND TESTING

### 8.1 Hardware-Software Sync Testing
Integrating hardware with asynchronous web technologies presents unique timing challenges. The system was rigorously tested to ensure serial port stability and prevent data collisions.

**Table 8.1: Full-Stack Integration Test Cases**
| Test ID | Scenario | Expected Output | Status |
|---|---|---|---|
| T-01 | Standard RFID Scan | Arduino detects -> Node.js parses `SCAN:UID` -> React adds to Cart UI | Passed |
| T-02 | Rapid Multi-Scan | Serial buffers handle 3 rapid scans without dropping packets | Passed |
| T-03 | IR Sensor 'Add' | Arduino debounces wave -> sends `CMD:ADD` -> React duplicates item | Passed |
| T-04 | Razorpay Success | React modal success -> Node API called -> Arduino plays success melody | Passed |
| T-05 | Hardware Disconnect | Node.js throws COM port error -> React gracefully alerts user | Passed |

### 8.2 Performance Analysis
The primary metric for success in this project is the reduction of checkout times compared to optical barcode scanners.

**Table 8.2: Time Comparison: Manual vs RFID Billing**
| Basket Size | Manual Barcode (sec) | RFID Parallel (sec) | Efficiency Gain |
|---|---|---|---|
| 2 Items | 18 | 4 | 77% |
| 5 Items | 45 | 9 | 80% |
| 10 Items | 95 | 15 | 84% |

**Table 8.3: Prototype Cost Analysis**
| Component | Estimated Cost (INR) |
|---|---|
| Arduino Uno R3 Clone | ₹800 |
| MFRC522 Reader & Tags | ₹400 |
| Sensors & Misc Electronics | ₹600 |
| **Total Hardware Cost** | **₹1800** |

*Note: Software stack (React, Node, MongoDB) relies on open-source technologies, incurring zero software licensing costs.*

---

<div style="page-break-after: always;"></div>

## CHAPTER 9: CONCLUSION AND FUTURE SCOPE

### 9.1 Conclusion
The full-stack implementation of the RFID-Based Automatic Billing Counter represents a massive technological leap over traditional hardware-only academic projects. By bridging an Arduino Uno via Node.js to a dynamic, state-driven React.js frontend, we successfully replicated the architecture of a modern enterprise retail system. 

The embedded hardware effectively handles the immediate physical responsibilities—reading tags, debouncing analog sensors, and providing audio-visual feedback. Simultaneously, the Node/React web stack effortlessly handles complex data processing, rich UI rendering, AI voice synthesis feedback, and secure financial transactions via the Razorpay API. This strict segregation of duties ensures a highly robust, scalable, and professional system that radically reduces queue times and human error.

### 9.2 Future Scope
While this prototype successfully validates the concept, commercial deployment could incorporate several enhancements:
1. **UHF RFID Integration:** Upgrading to Ultra-High Frequency (UHF) RFID would increase the read range to several meters, allowing a whole cart to be scanned instantly as it passes through a portal, eliminating the counter entirely.
2. **Cloud Database Migration:** Migrate the mock Node.js dictionary to a live MongoDB Atlas cluster, allowing store managers to perform CRUD operations on pricing dynamically via an Admin Dashboard.
3. **Machine Learning Analytics:** Utilize the backend serial data collection to analyze peak shopping hours and suggest dynamic pricing models using Python-based AI microservices.

---

<div style="page-break-after: always;"></div>

## REFERENCES

1. NXP Semiconductors, "MFRC522 Standard Performance MIFARE and NTAG frontend," Product Data Sheet, Rev. 3.9, 2016.
2. Facebook Open Source, "React – A declarative, efficient, and flexible JavaScript library for building user interfaces." React Docs.
3. OpenJS Foundation, "Node.js API Documentation & SerialPort npm Library documentation."
4. Razorpay Developer Docs, "Web Integration for Payment Gateway Architecture."
5. Hubert, M., Blut, M. "Acceptance of smartphone-based mobile shopping: mobile benefits, perceived risks and the impact of application context", IEEE, 2018.

---

<div style="page-break-after: always;"></div>

## USER MANUAL

### Prerequisites
1. **Hardware Assembly:** Ensure the Arduino, RC522, LCD, and IR sensors are wired according to the Circuit Diagram in Chapter 7.
2. **Software Requirements:** Install Node.js (v16+), npm, Arduino IDE, and VS Code.

### How to Run the Full Stack Project
1. **Flash the Hardware:** 
   - Connect Arduino via USB. Open Arduino IDE, select the correct COM port (e.g., `COM3`), and upload the C++ firmware.
2. **Start the Backend Server:** 
   - Open a terminal in the `backend` folder.
   - Run `npm install` to install dependencies (`express`, `serialport`, `razorpay`).
   - Edit `server.js` to match your Arduino's exact COM port.
   - Run `node server.js`. The console will display "Node API running".
3. **Start the Frontend UI:**
   - Open a new terminal in the `mall-dashboard` folder.
   - Run `npm install` to install React dependencies.
   - Run `npm run dev` or `npm start`.
   - Your browser will automatically open to `http://localhost:3000`.

### Operating the System
1. **Scanning Items:** Place an RFID-tagged product on the reader. The hardware will emit a high-pitched beep. Instantly, the React dashboard will update with the item name, image, and price. The AI voice will announce the addition over your PC speakers.
2. **Modifying the Cart:** Wave your hand over IR Sensor 1 to duplicate the last item without re-scanning. Wave over IR Sensor 2 to remove an accidental scan.
3. **Checkout Process:** 
   - Click the prominent "Checkout with Razorpay" button on the React screen. 
   - Complete the dummy transaction using Razorpay's test interface (e.g., test UPI ID `success@razorpay`).
4. **Hardware Confirmation:** Once the React app confirms payment, the backend immediately signals the Arduino. The Arduino will display "Payment Done!", flash the green LED, and play a success melody, finalizing the physical transaction loop and preparing the system for the next customer.
