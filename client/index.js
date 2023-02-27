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
      const data = (await axios.get(`http://127.0.0.1:1337/api/houses/??pagination[page]=1&pagination[pageSize]=8&populate[city][fields][0]=City&populate[Gallery][populate][formats][fields][0]=formats&fields[0]=Title&fields[1]=Address&fields[2]=GeneralFlattening&fields[3]=Floor&fields[4]=TotalFloors&fields[5]=PriceBYN&field[6]=id`)).data.data;
      const houses = []
      data.forEach((el) => {
        houses.push({...el.attributes, city: el.attributes.city.data.attributes.City,
        Gallery: 'http://127.0.0.1:1337' + el.attributes.Gallery.data[0].attributes.formats.medium.url,
        PriceBYN: formatPrice(data.PriceBYN)})
      });      
      console.log(data)
      res.render('index', {layout: false, cards: houses})
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  })()
})

app.get('/catalog', (req, res) => {
  res.render('catalog', {layout: false, name: '123'})
})

app.get('/product/:id', (req, res) => {
  (async () => {
    try {
      const data = await (await axios.get(`http://127.0.0.1:1337/api/houses/${req.params.id}?populate=Gallery&populate=city`)).data.data.attributes;
      data.PriceBYN = +data.PriceBYN
      // const data = cmsData.data.attributes;
      const city = data.city.data.attributes.City
      // console.log(formatPrice(data.PriceBYN));
      const productInfo = {
        title: data.Title,
        address: data.Address,
        parameters: data.Parameters,
        features: data.Features,
        generalFlattening: data.GeneralFlattening,
        livingArea: data.LivingArea,
        description: data.Description,
        mapLink: data.MapLink,
        floor: data.Floor,
        totalFloors: data.TotalFloors,
        priceBYN: formatPrice(data.PriceBYN),
        pricePerMetreBYN: formatPrice((data.PriceBYN / +data.GeneralFlattening).toFixed(0)),
        priceUSD: formatPrice((data.PriceBYN / exchangeRate).toFixed(0)),
        pricePerMetreUSD: formatPrice((data.PriceBYN / exchangeRate / +data.GeneralFlattening).toFixed(0)),
        phoneNumber: formatPhoneNumber(data.PhoneNumber),
        gallery: [],
        city: city
      }
      // console.log(data.Gallery.data);
      data.Gallery.data.forEach(el => { productInfo.gallery.push({ 
        src: 'http://127.0.0.1:1337' + el.attributes.url,
        thumb: 'http://127.0.0.1:1337' + el.attributes.formats.thumbnail.url
    })});
      
      res.render('product', {layout: false, ...productInfo})
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  })()
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
})