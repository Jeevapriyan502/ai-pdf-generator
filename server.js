const express = require('express');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'supersecretkey'; // In production, use env vars

// Hardcoded user
const USER = { username: 'user', password: 'password' };

app.use(cors());
app.use(bodyParser.json());

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// PDF generation endpoint
app.post('/generate-pdf', authenticateToken, (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: 'No content provided' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');

  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(16).text(content, 100, 100);
  doc.end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 