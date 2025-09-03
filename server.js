const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive message data and save as JSON file
app.post('/save-message', (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({ error: 'No data provided' });
  }

  // Create a filename with timestamp
  const filename = `message_${Date.now()}.json`;
  const filepath = path.join(__dirname, 'messages');

  // Ensure the messages directory exists
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
  }

  // Write the JSON data to file
  fs.writeFile(path.join(filepath, filename), JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error saving message:', err);
      return res.status(500).json({ error: 'Failed to save message' });
    }
    // On success, redirect user to tersimpan.html
    res.redirect('/tersimpan.html');
  });
});

// Serve static files (optional, if you want to serve pesan.html from here)
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
