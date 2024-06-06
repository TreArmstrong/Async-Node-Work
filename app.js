

//  Modules needed
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

// Database
let data = [
  { id: 1, name: "Tra" },
  { id: 2, name: "Winslow" }
];



// GET all entries
app.get('/api/data', (req, res) => {
  res.json(data);
});

// POST a new entry
app.post('/api/data', (req, res) => {
  const newData = req.body;
  data.push(newData);
  res.status(201).json(newData);
});

// PUT update an entry by ID
app.put('/api/data/:id', (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  data = data.map(entry => (entry.id === parseInt(id) ? { ...entry, ...updateData } : entry));
  res.json(data.find(entry => entry.id === parseInt(id)));
});

// DELETE an entry by ID
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;
  data = data.filter(entry => entry.id !== parseInt(id));
  res.sendStatus(204);
});



// created delay function
function delay(callback, ms) {
  setTimeout(callback, ms);
}

// endpoint with delay
app.get('/api/async', (req, res) => {
  delay(() => {
    res.send('Async operation completed!');
  }, 2000); // 2 seconds delay
});

// Setting port for server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
