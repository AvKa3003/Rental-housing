import express from "express"
import { engine } from "express-handlebars"
const app = express()
const PORT = 3000

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('static'))

app.get('/', (req, res) => {
  console.log(req.url);
  res.render('index', {layout: false, name: '123'})
})

app.get('/catalog', (req, res) => {
  console.log(req.url);
  res.render('catalog', {layout: false, name: '123'})
})

app.get('/product', (req, res) => {
  console.log(req.url);
  res.render('product', {layout: false, name: '123'})
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
})