const express = require('express');
const pg = require('pg');

// connection details
const pool = new pg.Pool({
  host:'localhost',
  port: 5432,
  database: 'socialnetwork',
  
  // same details as on migrate command
  user: 'postgres',        //windows is probably 'postgres'
  password: 'Helloworld' 
});

//running a query
//pool.query('SELECT 1+1;').then((res)=> console.log("test here: ", res));

const app = express();


//allow us to received foreign submissions from a browser
app.use(express.urlencoded({extended:true})); 

//route handlers
//show posts
app.get('/posts', async (req, res)=>{
  const {rows} = await pool.query(`
    SELECT * FROM posts;
  `);

  res.send(`
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>lat</th>
          <th>lng</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(row=>{
          return `
            <tr>
              <td>${row.id}</td>
              <td>${row.lat}</td>
              <td>${row.lng}</td>
            </tr>
          `
        }).join('')}
      </tbody>
    </table>
    <form method="POST">
      <h3>create post</h3>
      <div>
        <label>Lng</label>
        <input name="lng"/>
      </div>
      <div>
        <label>Lng</label>
        <input name="lat"/>
      </div>
      <button type="submit">create</button>
    </form>
  `);
});

app.post('/posts', async (req, res)=>{
  const {lng, lat} = req.body;
  await pool.query('INSERT INTO posts (lat, lng) VALUES ($1, $2);', [lat, lng]);
  res.redirect('posts');
});

app.listen(3005, ()=>{
  console.log('listening on port 3005');
});