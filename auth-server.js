// Simple Express backend for Metropol Jugendhilfe Auth
// Run: npm install express bcrypt nodemailer jsonwebtoken cors

const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = path.join(__dirname, 'users.json');
const JWT_SECRET = 'supergeheimespasswort'; // Change in production
const EMAIL_FROM = 'noreply@metropoljugendhilfe.de';

// Load users from file
function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Nodemailer transporter (configure for your SMTP)
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP
  port: 587,
  secure: false,
  auth: {
    user: 'smtp-user',
    pass: 'smtp-pass',
  },
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich.' });
  let users = loadUsers();
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'E-Mail ist bereits registriert.' });
  const hash = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
  users.push({ email, password: hash, confirmed: false });
  saveUsers(users);
  // Send confirmation email
  const confirmUrl = `http://localhost:3000/api/confirm/${token}`;
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Bitte bestätigen Sie Ihre Registrierung',
    html: `<p>Willkommen bei Metropol Jugendhilfe!</p><p>Bitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie auf den folgenden Link klicken:</p><p><a href="${confirmUrl}">${confirmUrl}</a></p><p>Mit freundlichen Grüßen,<br>Ihr Metropol Jugendhilfe Team</p>`
  });
  res.json({ message: 'Registrierung erfolgreich! Bitte prüfen Sie Ihre E-Mails zur Bestätigung.' });
});

// Email confirmation endpoint
app.get('/api/confirm/:token', (req, res) => {
  try {
    const { email } = jwt.verify(req.params.token, JWT_SECRET);
    let users = loadUsers();
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).send('Benutzer nicht gefunden.');
    user.confirmed = true;
    saveUsers(users);
    res.send('E-Mail erfolgreich bestätigt! Sie können sich jetzt einloggen.');
  } catch (e) {
    res.status(400).send('Ungültiger oder abgelaufener Bestätigungslink.');
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  let users = loadUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'E-Mail nicht gefunden.' });
  if (!user.confirmed) return res.status(400).json({ message: 'Bitte bestätigen Sie zuerst Ihre E-Mail.' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Falsches Passwort.' });
  // For demo: no session, just success
  res.json({ message: 'Login erfolgreich!' });
});

app.listen(3000, () => console.log('Auth-Server läuft auf http://localhost:3000'));
