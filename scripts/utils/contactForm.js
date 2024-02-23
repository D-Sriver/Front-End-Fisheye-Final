/* eslint-disable no-unused-vars */

const prenom = document.getElementById('prenom')
const nom = document.getElementById('nom')
const email = document.getElementById('email')
const message = document.getElementById('message')
const contactButton = document.querySelectorAll('.contact-button')
const errors = document.querySelectorAll('.error_message')
const closeBtn = document.getElementById('close-modal-btn')

// ajoute un écouteur sur le bouton depuis le DOM
document.body.addEventListener('click', function (e) {
  if (e.target.matches('.contact-button.open-modal')) {
    e.preventDefault()
    displayModal()
  }
})
// Récupère les éléments de la modal
function getModalElements () {
  const modal = document.getElementById('contact_modal')
  const overlay = document.querySelector('.overlay')
  const error = document.querySelector('.error_message')
  return { modal, overlay, error }
}
/// ----------------- Ouvre la modal ----------------- ///
function displayModal () {
  const { modal, overlay } = getModalElements()
  overlay.style.display = 'block'
  modal.style.display = 'block'
  modal.setAttribute('aria-hidden', 'true')
}
/// ----------------- Ferme la modal ----------------- ///
const closeModal = () => {
  const { modal, overlay } = getModalElements()
  modal.style.display = 'none'
  overlay.style.display = 'none'
  modal.setAttribute('aria-hidden', 'false')
  resetForm()
}

closeBtn.addEventListener('click', closeModal)

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target === closeBtn) {
    closeModal()
  } else if (e.key === 'Escape') {
    closeModal()
  }
})

/// ----------------- Le formulaire ----------------- ///
function displayUserInfo () {
  const prenomValue = prenom.value
  const nomValue = nom.value
  const emailValue = email.value
  const messageValue = message.value

  const userInfo = {
    Prénom: prenomValue,
    Nom: nomValue,
    'E-mail': emailValue,
    Message: messageValue
  }
  // Vérifie si les champs sont vides
  if (!prenomValue || !nomValue || !emailValue || !messageValue) {
    errors.forEach(errorElement => {
      errorElement.style.display = 'block'
    })
  } else {
    errors.forEach(errorElement => {
      errorElement.style.display = 'none'
    })
    closeModal()
  }
}
function submitForm (event) {
  event.preventDefault()
  if (contactButton.value === 'Fermer') {
    closeModal()
  }
}
// Affiche les informations de l'utilisateur au clic
contactButton.forEach(e => {
  e.addEventListener('click', (e) => {
    e.preventDefault()
    displayUserInfo()
  })
})
// Réinitialise le formulaire
function resetForm () {
  nom.value = ''
  prenom.value = ''
  email.value = ''
  message.value = ''
}
