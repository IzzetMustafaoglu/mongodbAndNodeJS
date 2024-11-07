const User = require('../models/user');

// add
async function createUser() {
  try {
    const user = new User({
      name: "izzet Mustafağlu",
      department: "BM",
      salary: 55000
    });
    await user.save();
    console.log("Yeni kullanıcı eklendi:", user);
    return user;
  } catch (error) {
    console.error("Kullanıcı eklenirken hata:", error.message);
    throw error;
  }
}

// update
async function updateUserSalary() {
  try {
    const user = await User.findOneAndUpdate(
      { name: "izzet Mustafağlu" },
      { salary: 35000 },
      { new: true } 
    );
    if (!user) {
      console.log("Kullanıcı bulunamadı!");
      return null;
    }
    console.log("Kullanıcı maaşı güncellendi:", user);
    return user;
  } catch (error) {
    console.error("Kullanıcı güncellenirken hata:", error.message);
    throw error;
  }
}
// delete
async function deleteUserByName() {
  try {
    const user = await User.findOneAndDelete({ name: "izzet Mustafağlu" });
    if (!user) {
      console.log("Kullanıcı bulunamadı!");
      return null;
    }
    console.log("Kullanıcı silindi:", user);
    return user;
  } catch (error) {
    console.error("Kullanıcı silinirken hata:", error.message);
    throw error;
  }
}

module.exports = { createUser, updateUserSalary, deleteUserByName };
