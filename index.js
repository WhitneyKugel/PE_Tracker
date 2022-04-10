const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, ssl: {
    rejectUnauthorized: false
  }
});

express() 
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, "views"))
  .set('view engine', 'ejs')
  .get('/', async(req, res) => {
    try {
      const client = await pool.connect();

      const obs = await client.query(
`SELECT * 
FROM observations
ORDER BY id;`);
      
      const locals = {
        'obs': (obs) ? obs.rows : null
      };

      res.render('pages/index', locals);
      client.release();
      
    } catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }
  })
  .get('/db-info', async(req, res) => {
    try {
      const client = await pool.connect();
      const tables = await client.query(
`SELECT c.relname AS table, a.attname AS column, t.typname AS type
FROM pg_catalog.pg_class AS c
LEFT JOIN pg_catalog.pg_attribute AS a
ON c.oid = a.attrelid AND a.attnum > 0 
LEFT JOIN pg_catalog.pg_type AS t
ON a.atttypid = t.oid
WHERE c.relname IN ('observations')
ORDER BY c.relname, a.attnum;
`);

      const obs = await client.query(
`SELECT * FROM observations`);

      const locals = {
        'tables': (tables) ? tables.rows : null,
        'obs': (obs) ? obs.rows : null
      };
      
      res.render('pages/db-info', locals);
      client.release();
      
    } catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }  
  })
  .post('/log', async (req, res) => {
    try {
      const client = await pool.connect();
      const id = req.body.id;
      const duration = req.body.duration;
      const ranking = req.body.ranking;
      
      const sqlUpdate = await client.query(
`UPDATE observations 
SET duration = ${duration}, ranking = ${ranking}
WHERE id = ${id};`);
      
      const result = {
        'response': (sqlUpdate) ? (sqlUpdate.rows[id]) : null
      };
      res.set({ 
        'Content-Type': 'application/json'
      });
      res.json({ requestBody: result });
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error: " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));