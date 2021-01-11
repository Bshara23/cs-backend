const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db_config");

// middleware
app.use(cors());
app.use(express.json());

// create a user
app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
    const {
      id,
      name,
      family_name,
      email,
      promo_code,
      country,
      city,
      street,
      zip_code,
      password,
      spare1,
      spare2,
      spare3,
      spare4,
    } = req.body;

    const addUser = await pool.query(
      "INSERT INTO users (id, name, family_name, email, promo_code, country, city, street, zip_code, password, spare1, spare2, spare3, spare4) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      [
        id,
        name,
        family_name,
        email,
        promo_code,
        country,
        city,
        street,
        zip_code,
        password,
        spare1,
        spare2,
        spare3,
        spare4,
      ]
    );
    //user_id | user_name
    res.json(addUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const getAllUsers = await pool.query("SELECT * FROM users;");
    res.json(getAllUsers.rows);
  } catch (error) {
    console.log(error);
  }
});

// get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await pool.query("SELECT * FROM users WHERE id = $1;", [
      id,
    ]);
    res.json(getUser.rows);
  } catch (error) {
    console.log(error);
  }
});

// update user's password
app.put("/user_password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET password = $2 WHERE id = $1;",
      [id, password]
    );
    res.json("User password updated");
  } catch (error) {
    console.log(error);
  }
});

// update user's spare1
app.put("/user_spare1/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { spare1 } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET spare1 = $2 WHERE id = $1;",
      [id, spare1]
    );
    res.json("User spare1 updated");
  } catch (error) {
    console.log(error);
  }
});

// update user's spare2
app.put("/user_spare2/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { spare2 } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET spare2 = $2 WHERE id = $1;",
      [id, spare2]
    );
    res.json("User spare2 updated");
  } catch (error) {
    console.log(error);
  }
});

// update user's spare3
app.put("/user_spare3/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { spare3 } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET spare3 = $2 WHERE id = $1;",
      [id, spare3]
    );
    res.json("User spare3 updated");
  } catch (error) {
    console.log(error);
  }
});

// update user's spare4
app.put("/user_spare4/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { spare4 } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET spare4 = $2 WHERE id = $1;",
      [id, spare4]
    );
    res.json("User spare4 updated");
  } catch (error) {
    console.log(error);
  }
});

// delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1;", [
      id,
    ]);
    res.json("User deleted");
  } catch (error) {
    console.log(error);
  }
});

// create a promoCode
app.post("/promo", async (req, res) => {
  try {
    console.log(req.body);
    const { id, promo_code, description } = req.body;

    const promoCode = await pool.query(
      "INSERT INTO users (id, promo_code, description) VALUES($1, $2, $3) RETURNING *",
      [id, promo_code, description]
    );
    //user_id | user_name
    res.json(promoCode.rows[0]);
  } catch (error) {
    console.log(error);
  }
});
