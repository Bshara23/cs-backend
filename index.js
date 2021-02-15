const express = require ('express');
const app = express ();
const cors = require ('cors');
const pool = require ('./db_config');
const nodemailer = require ('nodemailer');
const crypto = require ('crypto');
const { v4: uuidv4 } = require('uuid');
// middleware
app.use (cors ());
app.use (express.json ());

const EMAIL = 'bshara23demo@gmail.com';
const PASSWORD = 'dW!dbJH<q*5)K@7$';

// const algorithm = 'aes-256-ctr';
// const ENCRYPTION_KEY = 'aaaabbbbccccdddd';
// const IV_LENGTH = 16;

// function encrypt (
//   text,
//   onEnd = e => {
//     console.log (e);
//   }
// ) {
//   const algorithm = 'aes-192-cbc';
//   crypto.scrypt (PASSWORD, 'salt', 24, (err, key) => {
//     if (err) throw err;

//     crypto.randomFill (new Uint8Array (16), (err, iv) => {
//       if (err) throw err;

//       const cipher = crypto.createCipheriv (algorithm, key, iv);

//       let encrypted = '';
//       cipher.setEncoding ('hex');

//       cipher.on ('data', chunk => (encrypted += chunk));
//       cipher.on ('end', () => onEnd (encrypted)); // Prints encrypted data with key

//       cipher.write (text);
//       cipher.end ();
//     });
//   });
// }

// function decrypt (
//   text
// ) {
//   const algorithm = 'aes-192-cbc';
//   const password = 'Password used to generate key';
  
//   // We will first generate the key, as it is dependent on the algorithm.
//   // In this case for aes192, the key is 24 bytes (192 bits).
//   // We will use the async `crypto.scrypt()` instead for deciphering.
//   const key = crypto.scryptSync(password, 'salt', 24);
//   // The IV is usually passed along with the ciphertext.
//   const iv = Buffer.alloc(16, 0); // Initialization vector.
  
//   // Create decipher with key and iv
//   const decipher = crypto.createDecipheriv(algorithm, key, iv);
  
//   let decrypted = '';
//   decipher.on('readable', () => {
//     while (null !== (chunk = decipher.read())) {
//       decrypted += chunk.toString('utf8');
//     }
//   });
//   decipher.on('end', () => {
//     console.log(decrypted);
//     // Prints: some clear text data
//   });
  
//   // Encrypted with same algorithm, key and iv.
//   const encrypted =
//     'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
//   decipher.write(encrypted, 'hex');
//   decipher.end();
// }

// // encrypt
// app.post ('/encrypt', async (req, res) => {
//   try {
//     const {text} = req.body;
//     encrypt (text, e => {
//       res.json (e);
//     });
//   } catch (error) {
//     console.log (error);
//   }
// });
// // decrypt
// app.post ('/decrypt', async (req, res) => {
//   try {
//     const {text} = req.body;
//     decrypt (text);
//     res.json ("d");
//   } catch (error) {
//     console.log (error);
//   }
// });
// send a mail
app.post ('/sendMail', async (req, res) => {
  try {
    const {to, subject, text} = req.body;

    var transporter = nodemailer.createTransport ({
      service: 'Gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    var mailOptions = {
      from: EMAIL,
      to,
      subject,
      text,
    };

    transporter.sendMail (mailOptions, function (error, info) {
      if (error) {
        res.json ('error');
      } else {
        res.json (info.response);
      }
    });
  } catch (error) {
    console.log (error);
  }
});

// create a user
app.post ('/users', async (req, res) => {
  try {
    console.log (req.body);
    const {name, family_name, email, promo_code, password} = req.body;

    // This is okay for such small systems, similar to a uuid
    const id = Math.floor (Math.random () * 10000000 + 1);
    const addUser = await pool.query (
      'INSERT INTO users (id, name, family_name, email, promo_code, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, name, family_name, email, promo_code, password]
    );
    //user_id | user_name
    res.json (addUser.rows[0]);
  } catch (error) {
    console.log (error);
  }
});



// get all users
app.get ('/token', async (req, res) => {
  try {
    const getAllUsers = await pool.query ('SELECT * FROM users;');
    res.json (getAllUsers.rows);
  } catch (error) {
    console.log (error);
  }
});

// get all users
app.get ('/users', async (req, res) => {
  try {
    const getAllUsers = await pool.query ('SELECT * FROM users;');
    res.json (getAllUsers.rows);
  } catch (error) {
    console.log (error);
  }
});

// get user by email
app.get ('/users/:email', async (req, res) => {
  try {
    const {email} = req.params;
    const getUser = await pool.query ('SELECT * FROM users WHERE email = $1;', [
      email,
    ]);
    res.json (getUser.rows[0]);
  } catch (error) {
    console.log (error);
  }
});

app.get ('/spare1/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const getUser = await pool.query (
      'SELECT spare1 FROM users WHERE id = $1;',
      [id]
    );
    res.json (getUser.rows[0]);
  } catch (error) {
    console.log (error);
  }
});
// get user by id
app.get ('/users/:email/:password', async (req, res) => {
  try {
    const {email, password} = req.params;
    const getUser = await pool.query (
      'SELECT * FROM users WHERE email = $1 AND password = $2;',
      [email, password]
    );
    res.json (getUser.rows[0]);
  } catch (error) {
    console.log (error);
  }
});

// update user's password
app.put ('/user_password/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {password} = req.body;
    const updateUser = await pool.query (
      'UPDATE users SET password = $2 WHERE id = $1;',
      [id, password]
    );
    res.json ('User password updated');
  } catch (error) {
    console.log (error);
  }
});

// update user's password
app.put ('/updatePasswordByToken', async (req, res) => {
  try {
    const {id, spare1, newPassword} = req.body;
    console.log(req.body);
    const updateUser = await pool.query (
      'UPDATE users SET password = $3 WHERE id = $1 AND spare1 = $2;',
      [id, spare1, newPassword]
    );
    res.json (updateUser.rowCount);
  } catch (error) {
    res.json ('User password was not updated');

  }
});

// update user's spare1
app.put ('/spare1', async (req, res) => {
  try {
    const {id, spare1} = req.body;
    const updateUser = await pool.query (
      'UPDATE users SET spare1 = $2 WHERE id = $1;',
      [id, spare1]
    );
    res.json ('User spare1 updated');
  } catch (error) {
    console.log (error);
  }
});

// update user's spare1 by email
app.put ('/spare1email', async (req, res) => {
  try {
    const {email} = req.body;
    const spare1 = uuidv4(); // generate a random spare
    const updateUser = await pool.query (
      'UPDATE users SET spare1 = $2 WHERE email = $1;',
      [email, spare1]
    );
    const updateUser2 = await pool.query (
      'SELECT spare1, id FROM users WHERE email = $1;',
      [email]
    );
    res.json (updateUser2.rows[0]);
  } catch (error) {
    console.log (error);
  }
});
// get user's spare1 by email
app.get ('/spare1email/:email', async (req, res) => {
  try {
    const {email} = req.params;
    const updateUser = await pool.query (
      'SELECT spare1, id FROM users WHERE email = $1;',
      [email]
    );
    res.json (updateUser.rows[0]);
  } catch (error) {
    console.log (error);
  }
});
// update user's spare2
app.put ('/user_spare2/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {spare2} = req.body;
    const updateUser = await pool.query (
      'UPDATE users SET spare2 = $2 WHERE id = $1;',
      [id, spare2]
    );
    res.json ('User spare2 updated');
  } catch (error) {
    console.log (error);
  }
});

// update user's spare3
app.put ('/user_spare3/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {spare3} = req.body;
    const updateUser = await pool.query (
      'UPDATE users SET spare3 = $2 WHERE id = $1;',
      [id, spare3]
    );
    res.json ('User spare3 updated');
  } catch (error) {
    console.log (error);
  }
});

// update user's spare4
app.put ('/user_spare4/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {spare4} = req.body;
    const updateUser = await pool.query (
      'UPDATE users SET spare4 = $2 WHERE id = $1;',
      [id, spare4]
    );
    res.json ('User spare4 updated');
  } catch (error) {
    console.log (error);
  }
});

// delete user
app.delete ('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const deleteUser = await pool.query ('DELETE FROM users WHERE id = $1;', [
      id,
    ]);
    res.json ('User deleted');
  } catch (error) {
    console.log (error);
  }
});

// create a promoCode
app.post ('/promo', async (req, res) => {
  try {
    console.log (req.body);
    const {id, promo_code, description} = req.body;

    const promoCode = await pool.query (
      'INSERT INTO promocode (id, promo_code, description) VALUES($1, $2, $3) RETURNING *',
      [id, promo_code, description]
    );
    //user_id | user_name
    res.json (promoCode.rows[0]);
  } catch (error) {
    console.log (error);
  }
});

// get all promocodes
app.get ('/promo', async (req, res) => {
  try {
    const getAllPromocodes = await pool.query ('SELECT * FROM promocode;');
    res.json (getAllPromocodes.rows);
  } catch (error) {
    console.log (error);
  }
});

// get promocode by id
app.get ('/promo/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const getPromocode = await pool.query (
      'SELECT * FROM promocode WHERE id = $1;',
      [id]
    );
    res.json (getPromocode.rows);
  } catch (error) {
    console.log (error);
  }
});

// delete user
app.delete ('/promo/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const deleteUser = await pool.query (
      'DELETE FROM promocode WHERE id = $1;',
      [id]
    );
    res.json ('promocode deleted');
  } catch (error) {
    console.log (error);
  }
});

app.listen (5000, () => {
  console.log ('Server has started on port 5000');
});
