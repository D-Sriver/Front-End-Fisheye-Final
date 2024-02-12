// ouvrir la lightbox
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
  // Je sélectionne tous mes medias
  const medias = document.querySelectorAll('.img-gallery')
  const imageActuelle = document.querySelector('.img-lightbox')
  let index = 0
  // Je fais une boucle sur tous les medias
  for (const media of medias) {
    if (media.src === imageActuelle.src && index < medias.length - 1) {
      index++
      return displayMediaLightbox(index)
    } else if (media.src === imageActuelle.src && index === medias.length - 1) {
      return boucleFinMediaLightBox(index)
    }
    index++
  }
}

// Retourner à la slide précédente
function previousSlide () {
  // Je sélectionne tous les médias
  const medias = document.querySelectorAll('.img-gallery')
  const imageActuelle = document.querySelector('.img-lightbox')
  let index = 0
  // Je fais une boucle sur tous les medias
  for (const media of medias) {
    if (imageActuelle.src !== media && index === 0) {
      boucleDebutMediaLightBox(index)
    } else if (media.src === imageActuelle.src && index > -1) {
      index--
      displayMediaLightbox(index)
    }
    index++
  }
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

// Retourner à la première slide
function boucleFinMediaLightBox (index) {
  const medias = document.querySelectorAll('.img-gallery')
  const sliderImage = document.querySelector('.image-contain')
  const titreCard = document.querySelectorAll('.title-card')

  medias[0].src.slice(-('mp4').length).match('mp4')
    ? sliderImage.innerHTML = `
        <video controls src='${medias[0].src}' class='img-lightbox' tabindex="1">Video</video>
        <span>${titreCard[0].innerText}</span>            `
    : sliderImage.innerHTML = `
        <img src='${medias[0].src}'  alt='image du photographe ' class='img-lightbox' data='${medias[index].data}'>
        <span tabindex='1'>${titreCard[0].innerText}</span> 
        `
}

// Passer a la dernière slide
function boucleDebutMediaLightBox (index) {
  const medias = document.querySelectorAll('.img-gallery')
  const sliderImage = document.querySelector('.image-contain')
  const titreCard = document.querySelectorAll('.title-card')

  medias[medias.length - 1].src.slice(-('mp4').length).match('mp4')
    ? sliderImage.innerHTML = `
        <video controls src='${medias[medias.length - 1].src}' class="img-lightbox" tabindex="1">Video</video>
        <span>${titreCard[medias.length - 1].innerText}</span>            `
    : sliderImage.innerHTML = `
        <img src="${medias[medias.length - 1].src}"  alt="image du photographe " class="img-lightbox" data="${medias[index].data}">
        <span tabindex="1">${titreCard[medias.length - 1].innerText}</span> 
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
