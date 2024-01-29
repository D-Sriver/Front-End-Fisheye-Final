function photographerTemplate (data) {
  const { name, portrait } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM () {
    const article = document.createElement('article')
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    const h2 = document.createElement('h2')
    h2.textContent = name
    article.appendChild(img)
    article.appendChild(h2)
    return (article)
  }
  return { name, picture, getUserCardDOM }
}// Classe pour représenter un photographe
class Photographer {
  // Le constructeur initialise les propriétés de l'instance avec les données du photographe
  constructor (photographers) {
    this._name = photographers.name
    this._id = photographers.id
    this._city = photographers.city
    this._country = photographers.country
    this._tagline = photographers.tagline
    this._price = photographers.price
    this._portrait = photographers.portrait
  }
  // Getters pour accéder aux propriétés privées de l'instance

  get name () {
    return this._name
  }

  get portrait () {
    return this._portrait
  }

  get id () {
    return this._id
  }

  get city () {
    return this._city
  }

  get country () {
    return this._country
  }

  get tagline () {
    return this._tagline
  }

  get price () {
    return this._price
  }
}
