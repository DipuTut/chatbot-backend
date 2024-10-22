// backend/tests/chat.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/chat', (req, res) => {
  const { message } = req.body;
  let reply = 'Ich verstehe dich nicht.';

  if (message.toLowerCase().includes('hallo')) {
    reply = 'Hallo! Wie kann ich Ihnen helfen?';
  } else if (message.toLowerCase().includes('hilfe')) {
    reply = 'Gerne! Was brauchen Sie?';
  }

  res.json({ reply });
});

describe('POST /chat', () => {
  it('should return a response for "Hallo"', async () => {
    const res = await request(app)
      .post('/chat')
      .send({ message: 'Hallo' });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBe('Hallo! Wie kann ich Ihnen helfen?');
  });

  it('should return a response for "Hilfe"', async () => {
    const res = await request(app)
      .post('/chat')
      .send({ message: 'Hilfe' });

    expect(res.statusCode).toBe(200);
    expect(res.body.reply).toBe('Gerne! Was brauchen Sie?');
  });
});
