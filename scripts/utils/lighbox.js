// ouvrir la lightbox
let currentIndex
// eslint-disable-next-line no-unused-vars
function displayLightbox (index) {
  navigationLightbox()
  const lightboxModal = document.getElementById('lightbox-modal')
  const closeLightboxBtn = document.querySelector('.cross')
  lightboxModal.style.display = 'block'
  const priceDiv = document.querySelector('.price')
  priceDiv.style.opacity = '0'
  currentIndex = index

  // Accessibilité
  lightboxModal.setAttribute('aria-label', 'image closeup view')
  lightboxModal.setAttribute('aria-hidden', 'false')
  closeLightboxBtn.focus()
  console.log('index au clic ', currentIndex)
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
  console.log('Index a la fermure', currentIndex)

  // Réinitialiser l'index à 0
  currentIndex = 0

  // Détacher l'écouteur d'événements pour les flèches lorsque la lightbox est fermée
  document.removeEventListener('keydown', navigationLightbox)
}
// Passer à la slide suivante
function nextSlide () {
  const medias = document.querySelectorAll('.img-gallery')
  if (currentIndex < medias.length - 1) {
    currentIndex++
  } else {
    currentIndex = 0
  }
  displayMediaLightbox(currentIndex)
}

// Passer à la slide précédente
function previousSlide () {
  const medias = document.querySelectorAll('.img-gallery')
  if (currentIndex > 0) {
    currentIndex--
  } else {
    currentIndex = medias.length - 1
  }
  displayMediaLightbox(currentIndex)
}
// Afficher slide
function displayMediaLightbox (index) {
  const medias = document.querySelectorAll('.img-gallery')
  const sliderImage = document.querySelector('.image-contain')
  const titreCard = document.querySelectorAll('.title-card')

  sliderImage.setAttribute('aria-label', 'image closeup view')
  console.log('Index dans displayMediaLightbox : ', currentIndex)

  medias[index].src.slice(-('mp4').length).match('mp4')
    ? sliderImage.innerHTML = `
        <video controls src='${medias[index].src}' class='img-lightbox' tabindex="1">Video</video>
        <span tabindex='1'>${titreCard[index].innerText}</span>            `
    : sliderImage.innerHTML = `
        <img src='${medias[index].src}'  alt='image du photographe ' class='img-lightbox' data='${medias[index].data}'>
        <span tabindex='1'>${titreCard[index].innerText}</span> 
        `
}
// Navigation avec les flèches et fermeture avec esc
function navigationLightbox () {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      nextSlide()
    } else if (e.key === 'ArrowLeft') {
      previousSlide()
    } else if (e.key === 'Escape') {
      closeLightbox()
    }
  })
}
