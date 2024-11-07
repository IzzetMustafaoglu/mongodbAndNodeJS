const express = require('express');
const { createUser, updateUserSalary, deleteUserByName } = require('./controllers/userController');

const app = express();
app.use(express.json());

// post add
app.post('/add-user', async (req, res) => {
  try {
    const user = await createUser();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// put update
app.put('/update-salary', async (req, res) => {
  try {
    const user = await updateUserSalary();
    if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı!' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete
app.delete('/delete-user', async (req, res) => {
  try {
    const user = await deleteUserByName();
    if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı!' });
    res.status(200).json({ message: 'Kullanıcı başarıyla silindi!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
