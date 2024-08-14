const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./routes'));


app.listen(port, () => {
    console.log(`on port ${port}`)
})