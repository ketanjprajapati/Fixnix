const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const twilio = require('twilio');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index2.html'));
  });


// Route to serve the contact.html file
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
  });
  
// Route to serve the faq.html file
app.get('/faq', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'faq.html'));
});

// Route to serve the about.html file
app.get('/about', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route to serve the team.html file
app.get('/team', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'team.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/services-details', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services-details.html'));
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});


// Twilio credentials
const accountSid = 'AC9ee4907feb916fd13840389ede916e30';
const authToken = '0b71b13f4cbd8f233fb1da416467d4f2';
const twilioNumber = '+1 469 620 8306';

// Create Twilio client
const client = twilio(accountSid, authToken);

// Function to send OTP
function sendOTP(phoneNumber) {
    const otp = generateOTP(); // Generate OTP
    const message = `Your OTP is: ${otp}`;

    // Send OTP using Twilio
    client.messages.create({
        body: message,
        to: phoneNumber,
        from: twilioNumber
    })
    .then((message) => {
        console.log(`OTP sent successfully to ${phoneNumber}`);
    })
    .catch((err) => {
        console.error(`Failed to send OTP: ${err}`);
    });

    return otp; // Return the OTP for verification
}

// Function to generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    // Send OTP
    const otp = sendOTP(phoneNumber);

    res.status(200).json({ message: 'OTP sent successfully' });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
