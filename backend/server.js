import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv'; // Import dotenv

// Load variabel dari file .env
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

// --- ENDPOINT CUACA (Proxy Pattern) ---
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.VITE_WEATHER_API_KEY;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data cuaca' });
  }
});

app.get('/api/forecast', async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.VITE_WEATHER_API_KEY;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data forecast' });
  }
});

// --- ENDPOINT AUTH (Sudah ada sebelumnya) ---
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Backend is running' });
});

app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) return res.status(400).json({ message: 'Semua field wajib diisi.' });
  if (password !== confirmPassword) return res.status(400).json({ message: 'Password tidak sama.' });

  try {
    const user = await prisma.user.create({ data: { username, email, password } });
    return res.status(201).json({ message: 'Registrasi berhasil.', user });
  } catch (error) {
    if (error.code === 'P2002') return res.status(409).json({ message: 'Username/email sudah terpakai.' });
    return res.status(500).json({ message: 'Gagal memproses registrasi.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    const isValid = Boolean(user && user.password === password);
    
    await prisma.loginRecord.create({ data: { username, password, success: isValid, userId: user?.id } });
    
    if (!isValid) return res.status(401).json({ message: 'Login gagal.' });
    return res.json({ message: 'Login berhasil.', user: { id: user.id, username: user.username, email: user.email } });
  } catch (_error) {
    return res.status(500).json({ message: 'Gagal login.' });
  }
});

// ... sisanya (forgot-password dan reset-password) biarkan sama ...

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

const shutdown = async () => { await prisma.$disconnect(); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);