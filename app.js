require('dotenv').config();
const express = require('express'); //Node.js ile web uygulamaları geliştirmeye yarayan kütüphane
const mongoose = require('mongoose'); //MongoDB veritabanı ile çalışmak için kullanılan Mongoose kütüphanesi
const bodyParser = require('body-parser'); //JSON verilerini ve URL encoded form verilerini işlemek için
const cors = require('cors'); // Farklı domainlerden gelen isteklerin sunucuya ulaşabilmesini sağlar.
const bcrypt = require('bcryptjs'); //Şifreleri güvenli bir şekilde hash'lemek için
const User = require('./models/User'); // User modelini dahil eder
const Blog = require('./models/Blog'); // Blog modelini dahil eder
const session = require('express-session'); // Express.js uygulamasına oturum yönetimi ekler
const path = require('path'); // Dinamik dosya yolları oluşturmak için 

const app = express();

// EJS yapılandırması
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware'ler
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Giriş sayfası
app.get('/login', (req, res) => {
  res.render('login');  // login.ejs dosyasını render eder
});

// Giriş işlemi (POST isteği ile)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  User.findOne({ username })
      .then(user => {
          if (!user) {
              return res.status(400).send('User not found');
          }

          bcrypt.compare(password, user.password)
              .then(isMatch => {
                  if (!isMatch) {
                      return res.status(400).send('Invalid credentials');
                  }

                  req.session.userId = user._id;  // Oturumda kullanıcının ID'sini saklıyoruz
                  res.redirect('/home');  // Başarılı giriş sonrası ana sayfaya yönlendir
              })
              .catch(err => res.status(500).send('Server error'));
      })
      .catch(err => res.status(500).send('Server error'));
});

// Home sayfasında blogları getirme (tersten sıralama)
app.get('/home', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })  // createdAt alanına göre azalan sırada getir
    .populate('author', 'username')  // Yazarın adını almak
    .then(blogs => {
      res.render('home', { blogs });
    })
    .catch(err => {
      console.error('Error fetching blogs:', err);
      res.status(500).send('Error fetching blogs');
    });
});


// Kayıt sayfası (GET isteği ile)
app.get('/register', (req, res) => {
  res.render('register');  // 'register.ejs' dosyasını render eder
});

// Kayıt işlemi (GET isteği ile)
app.get('/register-process', (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      const newUser = new User({
        username,
        password: hashedPassword
      });
      return newUser.save();
    })
    .then(() => res.redirect('/login'))  // Başarılı kayıt sonrası login sayfasına yönlendir
    .catch(err => {
      console.error('Error during registration:', err);
      res.status(500).send('Error during registration');
    });
});

// Blog oluşturma sayfası (GET isteği ile)
app.get('/create-blog', (req, res) => {
  res.render('create-blog');  // Blog oluşturma formunu render et
});

// Blog oluşturma işlemi (POST isteği ile)
app.post('/create-blog', (req, res) => {
  const { title, content } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).send('Please login first');  // Kullanıcı giriş yapmamışsa uyarı
  }

  const newBlog = new Blog({
    title,
    content,
    author: userId,
  });

  newBlog.save()
    .then(() => {
      res.redirect('/my-blogs');  // Blog başarıyla eklendikten sonra kullanıcının bloglarını göster
    })
    .catch(err => {
      console.error('Error creating blog:', err);
      res.status(500).send('Error creating blog');
    });
});


// Kendi bloglarını görüntüleme (GET isteği ile)
app.get('/my-blogs', (req, res) => {
  const userId = req.session.userId;  // Giriş yapan kullanıcının ID'sini alıyoruz

  if (!userId) {
    return res.status(401).send('Please login first');  // Kullanıcı giriş yapmamışsa uyarı
  }

  Blog.find({ author: userId })  // Yalnızca giriş yapan kullanıcının bloglarını getiriyoruz
    .then(blogs => {
      res.render('my-blogs', { blogs });  // Kullanıcıya ait blogları 'my-blogs.ejs' dosyasına gönderiyoruz
    })
    .catch(err => {
      console.error('Error fetching user blogs:', err);
      res.status(500).send('Error fetching user blogs');
    });
});

// Blog düzenleme sayfası (GET isteği ile)
app.get('/edit-blog/:id', (req, res) => {
  const blogId = req.params.id;

  Blog.findById(blogId)
    .then(blog => {
      if (!blog) {
        return res.status(404).send('Blog not found');
      }
      res.render('edit-blog', { blog });
    })
    .catch(err => {
      console.error('Error fetching blog for editing:', err);
      res.status(500).send('Error fetching blog');
    });
});

// Blog düzenleme işlemi (POST isteği ile)
app.post('/edit-blog/:id', (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  Blog.findByIdAndUpdate(blogId, { title, content }, { new: true })
    .then(updatedBlog => {
      res.redirect('/my-blogs');  // Güncellenen blog ile kullanıcıyı kendi blogları sayfasına yönlendiriyoruz
    })
    .catch(err => {
      console.error('Error updating blog:', err);
      res.status(500).send('Error updating blog');
    });
});


// Blog silme işlemi (GET isteği ile)
app.get('/delete-blog/:id', (req, res) => {
  const blogId = req.params.id;

  Blog.findByIdAndDelete(blogId)
    .then(() => {
      res.redirect('/my-blogs');  // Silinen blogdan sonra kullanıcının blog sayfasına yönlendiriyoruz
    })
    .catch(err => {
      console.error('Error deleting blog:', err);
      res.status(500).send('Error deleting blog');
    });
});

// Çıkış işlemi (GET isteği ile)
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');  // Çıkış yaptıktan sonra login sayfasına yönlendir
  });
});

// Kullanıcı giriş yapmamışsa yönlendir (Middleware)
app.use((req, res, next) => {
  if (!req.session.userId && req.url !== '/login' && req.url !== '/register') {
    return res.redirect('/login');  // Giriş yapmamışsa login sayfasına yönlendir
  }
  next();
});

// Veritabanına Bağlanma
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Sunucu Başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
