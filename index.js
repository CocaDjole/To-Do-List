import express from "express";

const app = express();
const port = 3000;

// Pomoćni niz za skladištenje zadataka
let tasks = [];

app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { tasks });
});

// Ruta za dodavanje novog zadatka
app.post('/', (req, res) => {
  const { task } = req.body;
  if (task.trim() !== '') {
    tasks.push({ description: task, completed: false });
  }
  res.redirect('/');
});
app.post('/complete/:id', (req, res) => {
    const { id } = req.params;
    tasks[id].completed = !tasks[id].completed;
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.static('public'));
