import axios from "axios"
import express from "express"
import { engine } from "express-handlebars"
import { exchangeRate } from "./consts.js"
import { formatPhoneNumber, formatPrice } from "./helpers.js"
const app = express()
const PORT = 3000

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('static'))

app.get('/', (req, res) => {
  (async () => {

    try {
      let data = (await axios.get(`http://127.0.0.1:1337/api/articles?pagination[page]=1&pagination[pageSize]=1`)).data.data
      console.log(data)
      const article = data.map(el => {
        return {
          ...el.attributes,
          id: el.id
        }
      })
      // console.log(article);
      // data = (await axios.get(`http://127.0.0.1:1337/api/specialists?pagination[page]=1&pagination[pageSize]=4&populate=photo`)).data.data
      // console.log(data);
      // const specialists = data.map(el => {
      //   return {
      //     ...el.attributes,
      //     photo: 'http://127.0.0.1:1337' + el.attributes.photo.data.attributes.url
      //   }
      // })
      // console.log(specialists);
      res.render('index', {layout: false, article: article})
    } catch (error) {
      console.log(error);
      res.json(error)
    }
    
  })()
})

app.get('/catalog', (req, res) => {
  (async () => {
    try {
      let data = (await axios.get(`http://127.0.0.1:1337/api/specialists?pagination[page]=1&pagination[pageSize]=16&populate=photo`)).data.data
      // console.log(data);
      const specialists = data.map(el => {
        return {
          ...el.attributes,
          photo: 'http://127.0.0.1:1337' + el.attributes.photo.data.attributes.url
        }
      })
      console.log(specialists);
      res.render('catalog', {layout: false, specialists: specialists})
      
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  })()
})

app.get('/address', (req, res) => {
  (async () => {
    try {
      let data = (await axios.get(`http://127.0.0.1:1337/api/offices?pagination[page]=1&pagination[pageSize]=10`)).data.data
      // console.log(data)
      const offices = data.map(el => {
        return {
          ...el.attributes,
          id: el.id
        }
      })
      console.log(offices);
      res.render('address', {layout: false, offices: offices})
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  })()
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
})