/* eslint-disable no-undef */
class Profil {
  constructor () {
    // Initialisation de l'objet qui interagit avec l'API des photographes
    this.photographersApi = new PhotographerApi('https://d-sriver.github.io/Front-End-Fisheye-Final/data/photographers.json')
    // Récupération de l'identifiant du photographe depuis l'URL
    this.photographeId = new URL(location.href).searchParams.get('id')
  }

  // Récupère les informations du photographe
  async getProfil () {
    const photographeData = await this.photographersApi.getPhotographers()
    const photographe = photographeData.find(e => e.id === parseInt(this.photographeId)) // Use strict equality (===) and parse the ID to ensure type match
    return photographe
  }

  // Affiche le header du profil du photographe
  async displayProfilHeader () {
    const photographe = await this.getProfil()
    const template = new PhotographerFactory()
    const photographerModel = template.photographerFactory(photographe)
    photographerModel.getProfilUserDOM()
  }

  // Récupère tous les médias du photographe
  async getAllMediaPhotographer () {
    const mediaData = await this.photographersApi.getMedias()
    const medias = []
    // eslint-disable-next-line array-callback-return
    mediaData.find(e => {
      if (e.photographerId === parseInt(this.photographeId)) {
        medias.push(e)
      }
    })
    return medias
  }

  // Afficher mes medias
  async displayMedias (medias) {
    const template = new MediaFactory()
    // boucle pour afficher les médias
    for (let i = 0; i < medias.length; i++) {
      const gallerieMedia = template.mediaFactory(medias[i])
      gallerieMedia.getMediaUserDOM()
    }
  }

  // Fonction pour gérer le clic et la touche Entrée/Espace
  async handleMediaClick (dataAttribute, medias, Template, index) {
    const photoMedia = []
    const videoMedia = []

    for (let i = 0; i < medias.length; i++) {
      if (dataAttribute === medias[i].image) {
        photoMedia.push(medias[i])
        const gallerieMedia = Template.mediaFactory(photoMedia[0])
        gallerieMedia.getLightboxPhotoDOM()
      } else if (dataAttribute === medias[i].video) {
        videoMedia.push(medias[i])
        const gallerieMedia = Template.mediaFactory(videoMedia[0])
        gallerieMedia.getLightboxVideoDOM()
      }
    }

    displayLightbox(index)
  }

  // Crée le DOM pour les médias du photographe
  async createMediaDOM () {
    // récupération des médias
    const template = new MediaFactory()
    const medias = await this.getAllMediaPhotographer()
    // sélectionner les médias
    const photos = document.querySelectorAll('.img-gallery')
    // forEach en parcourant les médias
    photos.forEach((e, index) => {
      e.addEventListener('click', async (e) => {
        const dataAttribute = e.target.getAttribute('name')
        await this.handleMediaClick(dataAttribute, medias, template, index)
      })

      e.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const dataAttribute = e.target.getAttribute('name')
          await this.handleMediaClick(dataAttribute, medias, template, index)
        }
      })
    })
  }
}

// Fonction principale pour exécuter l'application
async function main () {
  const run = new Profil()
  run.displayProfilHeader()
  const allMedias = await run.getAllMediaPhotographer()
  run.displayMedias(allMedias)
  run.createMediaDOM()
  selectFiltre(allMedias, run)
  likePlus()
  likeMoins()
  displayTotalLike()
}

main()
