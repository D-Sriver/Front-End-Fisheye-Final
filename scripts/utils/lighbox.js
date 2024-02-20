// ouvrir la lightbox
let currentIndex
// eslint-disable-next-line no-unused-vars
function displayLightbox (index) {
  const lightboxModal = document.getElementById('lightbox-modal')
  const closeLightboxBtn = document.querySelector('.cross')
  lightboxModal.style.display = 'block'
  const priceDiv = document.querySelector('.price')
  priceDiv.style.opacity = '0'

  document.addEventListener('keydown', navigationLightbox)

  currentIndex = index

  // Accessibilité
  lightboxModal.setAttribute('aria-label', 'image closeup view')
  lightboxModal.setAttribute('aria-hidden', 'false')
  document.addEventListener('DOMContentLoaded', function () {
    closeLightboxBtn.focus()
  })
  console.log('index au clic ', ((currentIndex) + 1))
}

// Fermer lightbox
function closeLightbox () {
  const lightboxModal = document.getElementById('lightbox-modal')
  lightboxModal.style.display = 'none'
  const priceDiv = document.querySelector('.price')
  priceDiv.style.opacity = '1'

  // Accessibilité
  lightboxModal.setAttribute('aria-hidden', 'true')
  lightboxModal.setAttribute('aria-label', 'Close dialog')
  console.log('Index a la fermure', ((currentIndex) + 1))

  // Réinitialiser l'index à 0
  currentIndex = 0

  // Détacher l'écouteur d'événements pour les flèches lorsque la lightbox est fermée
  document.removeEventListener('keydown', navigationLightbox)
}
// Passer à la slide suivante
function changeSlide (direction) {
  const medias = document.querySelectorAll('.img-gallery')

  if (direction === 'next') {
    currentIndex = (currentIndex + 1) % medias.length
  } else if (direction === 'previous') {
    currentIndex = (currentIndex - 1 + medias.length) % medias.length
  }

  displayMediaLightbox(currentIndex)
}
// eslint-disable-next-line no-undef
nextSlide = () => changeSlide('next')
// eslint-disable-next-line no-undef
previousSlide = () => changeSlide('previous')

// Afficher slide
function displayMediaLightbox (index) {
  const medias = document.querySelectorAll('.img-gallery')
  const sliderImage = document.querySelector('.image-contain')
  const titreCard = document.querySelectorAll('.title-card')

  sliderImage.setAttribute('aria-label', 'image closeup view')
  console.log('Index image actuelle : ', ((currentIndex) + 1))

  medias[index].src.slice(-('mp4').length).match('mp4')
    ? sliderImage.innerHTML = `
        <video controls src='${medias[index].src}' class='img-lightbox' tabindex="1">Video</video>
        <span tabindex='1'>${titreCard[index].innerText}</span>            `
    : sliderImage.innerHTML = `
        <img src='${medias[index].src}'  alt='image du photographe ' class='img-lightbox' data='${medias[index].data}'>
        <span tabindex='1'>${titreCard[index].innerText}</span> 
        `
}
// crée une function simple d'utilisation du clavier pour avancer reculer et fermer la lightbox en ES6
function navigationLightbox (e) {
  if (e.key === 'ArrowRight') {
    // eslint-disable-next-line no-undef
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    // eslint-disable-next-line no-undef
    previousSlide()
  } else if (e.key === 'Escape') {
    closeLightbox()
  }
}
