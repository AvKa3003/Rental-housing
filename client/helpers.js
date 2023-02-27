function formatPrice(price) {
  price = +price
  return price.toLocaleString()
  return Number(price.toFixed(0)).toLocaleString() + '.' + Number(price.toString().slice(price.toString().indexOf('.')+1)).toLocaleString()
}

function formatPhoneNumber(phone) {
  return  '+375 ' + phone.slice(0, 2) + ' ' + phone.slice(2, -3) + '-' + phone.slice(-4, -2) + '-' + phone.slice(-2)
}

export {formatPrice, formatPhoneNumber}