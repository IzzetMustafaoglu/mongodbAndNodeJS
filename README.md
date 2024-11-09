# Blog Web Uygulaması - Node.js ve MongoDB

Bu proje, Node.js ve MongoDB kullanarak basit bir blog web uygulaması geliştirmek için hazırlanmıştır. Kullanıcılar blog yazıları oluşturabilir, güncelleyebilir, silebilir ve diğer kullanıcıların yazılarını görüntüleyebilir. Kullanıcılar ayrıca sisteme kayıt olabilir ve giriş yaparak kimlik doğrulaması yapabilirler.

## Proje İçeriği

Bu proje, aşağıdaki ana bileşenleri içermektedir:

### 1. **Kullanıcı Yönetimi**
- **Kayıt Olma (Sign Up)**: Kullanıcılar sisteme kayıt olabilir.
- **Giriş Yapma (Login)**: Kullanıcılar, kullanıcı Adı ve şifre ile giriş yapabilir.
- **JWT (JSON Web Token) ile Kimlik Doğrulama**: Giriş yapan kullanıcılar için token tabanlı kimlik doğrulama sağlanır.

### 2. **Blog Yönetimi**
- **Blog Yazıları Oluşturma**: Kullanıcılar yeni blog yazıları oluşturabilir.
- **Blog Yazıları Güncelleme**: Kullanıcılar kendi yazılarını güncelleyebilir.
- **Blog Yazıları Silme**: Kullanıcılar kendi yazılarını silebilir.
- **Blog Yazılarını Listeleme**: Tüm blog yazıları ana sayfada görüntülenebilir.

### 3. **Teknolojiler ve Araçlar**
- **Node.js**: Uygulama sunucusu.
- **Express.js**: Web framework'ü.
- **MongoDB**: Veritabanı.
- **Mongoose**: MongoDB ile bağlantı ve veri modelleri için kullanılan kütüphane.
- **JWT (JSON Web Token)**: Kullanıcı kimlik doğrulama için kullanılır.
- **Bcrypt.js**: Şifre güvenliği için şifreleri hash'lemek amacıyla kullanılır.<br><br>

### **Register** <br>

`http://localhost:5000/register`
<br><br>
![Register Image](https://github.com/IzzetMustafaoglu/mongodbAndNodeJS/blob/main/images/regsiter.png)
<br>
### **Login** <br>
`http://localhost:5000/login`
<br><br>
![Database Image](https://github.com/IzzetMustafaoglu/mongodbAndNodeJS/blob/main/images/login.png)
<br>
### **Blogs** <br>
`http://localhost:5000/home`
<br><br>
![Database Image](https://github.com/IzzetMustafaoglu/mongodbAndNodeJS/blob/main/images/blogs.png)
<br>
### **Add Blogs** <br>
`http://localhost:5000/home`
<br><br>
![Database Image](https://github.com/IzzetMustafaoglu/mongodbAndNodeJS/blob/main/images/add_blog.png)
<br>
### **My Blogs** <br>
`http://localhost:5000/home`
<br><br>
![Database Image](https://github.com/IzzetMustafaoglu/mongodbAndNodeJS/blob/main/images/my_blogs.png)
<br>
### **Edit Blogs** <br>
`http://localhost:5000/home`
<br><br>
![Database Image](https://github.com/IzzetMustafaoglu/mongodbAndNodeJS/blob/main/images/edit_blog.png)
<br>
### **Users Database** <br>
`http://localhost:5000/home`
<br><br>
![Database Image](https://github.com/IzzetMustafaoglu/mongodbAndNodeJS/blob/main/images/dt_users.png)
<br>
### **Blogs Database** <br>
`http://localhost:5000/home`
<br><br>
![Database Image](https://github.com/IzzetMustafaoglu/mongodbAndNodeJS/blob/main/images/dt_blogs.png)
