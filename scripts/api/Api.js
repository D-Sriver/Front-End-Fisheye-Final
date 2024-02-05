// Classe de base pour effectuer des requêtes API
class Api {
  constructor (url) {
    this._url = url
  }

  // Requête GET générique à l'API
  async get () {
    const response = await fetch(this._url)
    return await response.json()
  }
}

// Classe spécialisée pour interagir avec une API de photographes
// eslint-disable-next-line no-unused-vars
class PhotographerApi extends Api {
  // Récupère la liste des photographes depuis l'API
  async getPhotographers () {
    // Appel à la méthode get() de la classe parente pour obtenir les données
    const data = await this.get()
    return data.photographers
    // console log pour vérifier que la requête fonctionne
  }

  // Récupère la liste des médias depuis l'API
  async getMedias () {
    // Appel à la méthode get() de la classe parente pour obtenir les données
    const data = await this.get()
    return data.media
  }
}
