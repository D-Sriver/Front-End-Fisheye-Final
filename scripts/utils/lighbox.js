// ouvrir la lightbox
let currentIndex = 0

// eslint-disable-next-line no-unused-vars
function displayLightbox () {
  navigationLightbox()
  const lightboxModal = document.getElementById('lightbox-modal')
  const closeLightboxBtn = document.querySelector('.cross')
  lightboxModal.style.display = 'block'
  const priceDiv = document.querySelector('.price')
  priceDiv.style.opacity = '0'

  // Accessibilité
  lightboxModal.setAttribute('aria-label', 'image closeup view')
  lightboxModal.setAttribute('aria-hidden', 'false')
  closeLightboxBtn.focus()
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
}
// Passer à la slide suivante
function nextSlide () {
  const medias = document.querySelectorAll('.img-gallery')
  currentIndex = (currentIndex + 1) % medias.length
  displayMediaLightbox(currentIndex)
}

// Retourner à la slide précédente
function previousSlide () {
  const medias = document.querySelectorAll('.img-gallery')
  currentIndex = (currentIndex - 1 + medias.length) % medias.length
  displayMediaLightbox(currentIndex)
}

// Afficher slide
function displayMediaLightbox (index) {
  const medias = document.querySelectorAll('.img-gallery')
  const sliderImage = document.querySelector('.image-contain')
  const titreCard = document.querySelectorAll('.title-card')

  sliderImage.setAttribute('aria-label', 'image closeup view')

  medias[index].src.slice(-('mp4').length).match('mp4')
    ? sliderImage.innerHTML = `
        <video controls src='${medias[index].src}' class='img-lightbox' tabindex="1">Video</video>
        <span tabindex='1'>${titreCard[index].innerText}</span>            `
    : sliderImage.innerHTML = `
        <img src='${medias[index].src}'  alt='image du photographe ' class='img-lightbox' data='${medias[index].data}'>
        <span tabindex='1'>${titreCard[index].innerText}</span> 
        `
}
// Fermer avec esc lightbox
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // eslint-disable-next-line no-undef
    filterListClose()
    closeLightbox()
  }
  if (e.key === 'Enter') {
    e.target.click()
  }
})

// Navigation avec les flèches
function navigationLightbox () {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      nextSlide()
    }
    if (e.key === 'ArrowLeft') {
      previousSlide()
    }
  })
}
