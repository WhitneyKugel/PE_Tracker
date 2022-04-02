const express = require('express');
const path = require('path');
const PORT process.env.PORT || 5000;
const { Pool } = require ('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, ssl: {
    rejectUnauthorized: false
  }
});

express() 
  .use(experss.static(path.join(_dirname, 'public')))
  .use(express.json())
  .use(experss.urlencoded({ exteneded: true}))
  .set('views', path.join(_dirname, "views"))
  .set('view engine', 'ejs')
  .get('/', async(req, res) => {
    try {
      const client = await pool.connect();
      client.release();
      res.send("Works");
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));