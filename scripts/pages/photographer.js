/* eslint-disable no-undef */
class Profil {
  constructor () {
    // Initialisation de l'objet qui interagit avec l'API des photographes
    this.photographersApi = new PhotographerApi('../../data/photographers.json')
    // Récupération de l'identifiant du photographe depuis l'URL
    this.photographeId = new URL(location.href).searchParams.get('id')
  }

  // Récupère les informations du photographe
  async getProfil () {
    const photographeData = await this.photographersApi.getPhotographers()
    // eslint-disable-next-line eqeqeq
    const photographe = photographeData.find(e => e.id == this.photographeId)
    console.table(photographe)
    return photographe
  }

  // Affiche le header du profil du photographe
  async displayProfilHeader () {
    const photographe = await this.getProfil()
    const Template = new PhotographerFactory()
    const photographerModel = Template.photographerFactory(photographe)
    photographerModel.getProfilUserDOM()
  }

  // Récupère tous les médias du photographe
  async getAllMediaPhotographer () {
    const mediaData = await this.photographersApi.getMedias()
    const medias = []
    // eslint-disable-next-line array-callback-return
    mediaData.find(e => {
      // eslint-disable-next-line eqeqeq
      if (e.photographerId == this.photographeId) {
        medias.push(e)
      }
    })
    return medias
  }
}

// Fonction principale pour exécuter l'application
async function main () {
  const run = new Profil()
  run.displayProfilHeader()
}

main()
