/* eslint-disable eqeqeq */
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
    const photographe = photographeData.find(e => e.id == this.photographeId)
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
      if (e.photographerId == this.photographeId) {
        medias.push(e)
      }
    })
    return medias
  }

  // Afficher mes medias
  async displayMedias (medias) {
    const Template = new MediaFactory()
    // boucle pour afficher les médias
    for (let i = 0; i < medias.length; i++) {
      const gallerieMedia = Template.mediaFactory(medias[i])
      gallerieMedia.getMediaUserDOM()
    }
  }

  // Crée le DOM pour les médias du photographe
  async createMediaDOM () {
    // récupération des médias
    const Template = new MediaFactory()
    const medias = await this.getAllMediaPhotographer()
    // sélectionner les médias
    const photos = document.querySelectorAll('.img-gallery')
    // forEach en parcourant les médias
    photos.forEach(e => {
      e.addEventListener('click', (e) => {
        // récupérer le nom du media cliqué
        const dataAttribute = e.target.getAttribute('name')
        // crée un tableau vide pour les photos et pour les vidéos
        const photoMedia = []
        const videoMedia = []

        // boucle sur les medias
        for (let i = 0; i < medias.length; i++) {
          // comparaison du nom du media cliqué avec image
          if (dataAttribute === medias[i].image) {
            // récupération du media cliqué
            photoMedia.push(medias[i])
            const gallerieMedia = Template.mediaFactory(photoMedia[0])
            gallerieMedia.getLightboxPhotoDOM()
            // comparaison du nom du media cliqué avec video
          } else if (dataAttribute == medias[i].video) {
            videoMedia.push(medias[i])
            const gallerieMedia = Template.mediaFactory(videoMedia[0])
            gallerieMedia.getLightboxVideoDOM()
          }
        }
        // Ouverture lightbox
        displayLightbox()
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
