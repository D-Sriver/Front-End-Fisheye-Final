// Classe pour la création d'objets média en fonction du type (photo ou vidéo)
// eslint-disable-next-line no-unused-vars
class MediaFactory {
  constructor (data, type) {
    // Si le type est 'mediaApi', renvoie une instance de la classe Media
    if (type === 'mediaApi') {
      // eslint-disable-next-line no-undef
      return new Media(data)
    }
  }

  // Méthode de création d'objets média
  mediaFactory (data) {
    const {
      title,
      image,
      video,
      likes,
      date,
      price,
      photographerId,
      id
    } = data
    // Chemins des fichiers image et vidéo en fonction de l'id du photographe
    const picture = `assets/photographers/${photographerId}/${image}`
    const videoMp4 = `assets/photographers/${photographerId}/${video}`

    // Fonction pour générer le DOM des médias dans la galerie
    function getMediaUserDOM () {
      const gallery = document.querySelector('.gallery')

      // Vérifie s'il s'agit d'une vidéo
      if (picture.slice(-('undefined').length).match('undefined')) {
        // Template vidéo
        if (data.video) {
          gallery.innerHTML +=
                        `
                <div class="photo-card">
                <i class="fas fa-video"></i>
                <video controls src="${videoMp4}" class="img-gallery" name="${video}" tabindex="7" aria-description="video ${title}"></video>
                <h2> <span class="title-card">${title}</span>
                <span class="like-card"> 
                <span class="nbre-like">${likes} </span>
                   <span class="liker like-vide">   
                       <i class="far fa-heart" tabindex="7" aria-label="likes" role="bouton"></i>
                   </span>
                   <span class="liker like-plein"> 
                       <i class="fas fa-heart" tabindex="7" aria-label="likes" role="bouton"></i>
                   </span>
                   </span>

               </h2>
                </div>
                `
        }
      // eslint-disable-next-line brace-style
      }

      // Template photo
      else {
        // si pas de video on affiche une photo
        gallery.innerHTML +=
                    `
                <div class="photo-card">
                <img src="${picture}" name="${image}" alt="image ${image} ouvre photo dans lighting-box" class="img-gallery" tabindex="7"></img>
                <h2> <span class="title-card">${title}</span>
                <span class="like-card"> 
                <span class="nbre-like">${likes} </span>
                   <span class="liker like-vide">   
                       <i class="far fa-heart" tabindex="7" aria-label="ajouter j'aime en cliquant" role="bouton"></i>
                   </span>
                   <span class="liker like-plein"> 
                       <i class="fas fa-heart" tabindex="7" aria-label="retirer j'aime en cliquant" role="bouton"></i>
                   </span>
                   </span>

               </h2>
                </div>
                `
      }
    }

    // Fonction pour générer le DOM de la lightbox pour les vidéos
    function getLightboxPhotoDOM () {
      // Template lightbox photo

      const lightbox = document.querySelector('.lightbox')
      lightbox.innerHTML =
    `
<header>
    <img src="assets/icons/close-lightbox.svg" class="cross" alt="Croix ferme modal" tabindex="1"/>
    <img src="assets/icons/chevron-left.svg" class="chevron-left" alt="chevron photo précédente" tabindex="1"/>
    <img src="assets/icons/chevron-right.svg" class="chevron-right" alt="Chevron Slide suivante" tabindex="1"/>
</header>
<div class="image-contain">
    <img src="${picture}" alt="image du photographe ${image}" class="img-lightbox" data="${data.title}"></img>
    <span tabindex="1" title="titre image">${data.title}</span>
</div>
`
      lightbox.querySelector('.cross').addEventListener('click', closeLightbox)
      lightbox.querySelector('.chevron-left').addEventListener('click', previousSlide)
      lightbox.querySelector('.chevron-right').addEventListener('click', nextSlide)
    }

    function getLightboxVideoDOM () {
      // Template lightbox video

      const lightbox = document.querySelector('.lightbox')
      lightbox.innerHTML =
        `
        <header>
          <img src="assets/icons/close-lightbox.svg" class="cross" alt="Close dialog" tabindex="1"/>
          <img src="assets/icons/chevron-left.svg" class="chevron-left" alt="Previous image" tabindex="1"/>
          <img src="assets/icons/chevron-right.svg" class="chevron-right" alt="Next image" tabindex="1"/>
        </header>
        <div class="image-contain">
          <video controls src="${videoMp4}" class="img-lightbox" name="${video}" tabindex="1">Vidéo ${video}</video>
          <span tabindex="1">${data.title}</span>
        </div>
        `

      const closeButton = lightbox.querySelector('.cross')
      const prevButton = lightbox.querySelector('.chevron-left')
      const nextButton = lightbox.querySelector('.chevron-right')

      closeButton.addEventListener('click', closeLightbox)
      prevButton.addEventListener('click', previousSlide)
      nextButton.addEventListener('click', nextSlide)
    }

    // Retourne les données associées à l'objet média
    return {
      title,
      picture,
      video,
      date,
      price,
      likes,
      photographerId,
      id,
      getMediaUserDOM,
      getLightboxPhotoDOM,
      getLightboxVideoDOM
    }
  }
}
