/* eslint-disable no-undef */
// ouvrir la lightbox
let currentIndex
// eslint-disable-next-line no-unused-vars
function displayLightbox (index) {
  const lightboxModal = document.getElementById('lightbox-modal')
  const priceDiv = document.querySelector('.price')
  // cache le prix lors de l'ouverture de la lightbox
  priceDiv.style.opacity = '0'
  lightboxModal.style.display = 'block'

  document.addEventListener('keydown', navigationLightbox)
  currentIndex = index
  lightboxModal.focus()

  // Accessibilité
  lightboxModal.setAttribute('aria-label', 'image closeup view')
  lightboxModal.setAttribute('aria-hidden', 'false')
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
nextSlide = () => changeSlide('next')
previousSlide = () => changeSlide('previous')

// Afficher slide
function displayMediaLightbox (index) {
  const medias = document.querySelectorAll('.img-gallery')
  const sliderImage = document.querySelector('.image-contain')
  const titreCard = document.querySelectorAll('.title-card')
  const lightboxModal = document.getElementById('lightbox-modal')

  sliderImage.setAttribute('aria-label', 'image closeup view')

  medias[index].src.slice(-('mp4').length).match('mp4')
    ? sliderImage.innerHTML = `
        <video controls src='${medias[index].src}' class='img-lightbox' tabindex="0">Video</video>
        <span tabindex='1'>${titreCard[index].innerText}</span>            `
    : sliderImage.innerHTML = `
        <img src='${medias[index].src}'  alt='image du photographe ' class='img-lightbox' data='${medias[index].data}'>
        <span tabindex='1'>${titreCard[index].innerText}</span> 
        `
}
// crée une function simple d'utilisation du clavier pour avancer reculer et fermer la lightbox
function navigationLightbox (e) {
  if (e.key === 'ArrowRight') {
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    previousSlide()
  } else if (e.key === 'Escape') {
    closeLightbox()
  } else if (e.key === 'Enter') {
    const activeElement = document.activeElement

    if (activeElement.classList.contains('chevron-right')) {
      nextSlide()
    } else if (activeElement.classList.contains('chevron-left')) {
      previousSlide()
    } else if (activeElement.classList.contains('cross')) {
      closeLightbox()
    }
  }
}
