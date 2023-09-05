const bcrypt = require("bcryptjs");
const db = require("../data/database");

const mongoDb = require("mongodb");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  static async findById(userId) {
    const uid = new mongoDb.ObjectId(userId);

    return db.getDb().collection("users").findOne({_id: uid}, { projection: {password: 0}});
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
}

module.exports = User;
