/* eslint-disable no-undef */
class App {
  constructor () {
    // Initialise l'objet qui interagit avec l'API des photographes
    this.photographersApi = new PhotographerApi('https://d-sriver.github.io/Front-End-Fisheye-Final/data/photographers.json')
  }

  async getPhotographer () {
    // Récupération des données de l'API
    const photographersData = await this.photographersApi.getPhotographers()

    // Instanciation des données de l'API en utilisant PhotographerFactory
    // Pourquoi ça ne marche pas p****.
    const Photographers = await photographersData.map(photographers => new PhotographerFactory(photographers, 'photoApi'))

    // Récupération de la section où afficher les photographes dans l'interface utilisateur
    const photographersSection = document.querySelector('.photographer-section')

    // Itération sur les photographes pour créer des éléments HTML et les ajouter à la section
    Photographers.forEach(photographe => {
      // Création d'une instance de PhotographerFactory pour chaque photographe
      const Template = new PhotographerFactory()
      const photographerModel = Template.photographerFactory(photographe)

      // Récupération de la carte utilisateur HTML générée par PhotographerFactory
      const userCardDOM = photographerModel.getUserCardDOM()

      // Ajout de la carte utilisateur à la section des photographes dans l'interface utilisateur
      photographersSection.appendChild(userCardDOM)
    })
  }
}

// Création d'une instance de la classe App et appel de la méthode getPhotographer
const app = new App()
app.getPhotographer()
