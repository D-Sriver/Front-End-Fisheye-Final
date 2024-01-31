// Classe pour représenter un média
// eslint-disable-next-line no-unused-vars
class Media {
  // Le constructeur initialise les propriétés de l'instance avec les données du média
  constructor (media) {
    this._title = media.title
    this._id = media.id
    this._photographerId = media.photographerId
    this._likes = media.likes
    this._date = media.date
    this._price = media.price
    this._image = media.image
    this._video = media.video
  }

  // Getters pour accéder aux propriétés privées de l'instance

  get title () {
    return this._title
  }

  get image () {
    return this._image
  }

  get video () {
    return this._video
  }

  get id () {
    return this._id
  }

  get photographerId () {
    return this._photographerId
  }

  get likes () {
    return this._likes
  }

  get date () {
    return this._date
  }

  get price () {
    return this._price
  }
}
