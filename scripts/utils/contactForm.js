/* eslint-disable no-unused-vars */
// Crée des constantes pour récupérer les éléments du DOM
const prenom = document.getElementById('prenom')
const nom = document.getElementById('nom')
const email = document.getElementById('email')
const message = document.getElementById('message')
const contactButton = document.querySelectorAll('.contact-button')
const errors = document.querySelectorAll('.error_message')

function getModalElements () {
  const modal = document.getElementById('contact_modal')
  return { modal }
}

function displayModal () {
  const { modal } = getModalElements()
  modal.style.display = 'block'
  modal.setAttribute('aria-hidden', 'false')
}

function closeModal () {
  const { modal } = getModalElements()
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
  resetForm()
}

document.addEventListener('keydown', function (event) {
  const modal = document.getElementById('contact_modal')
  if (event.key === 'Escape' && modal.style.display === 'block') {
    closeModal()
  }
})

function SubmitForm (event) {
  event.preventDefault()
  if (contactButton.value === 'Fermer') {
    closeModal()
  }
}

function displayUserInfo () {
  // Récupérer les valeurs des champs texte
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

  if (!prenomValue || !nomValue || !emailValue || !messageValue) {
    errors.forEach(errorElement => {
      errorElement.style.display = 'block'
    })
  } else {
    errors.forEach(errorElement => {
      errorElement.style.display = 'none'
    })
    closeModal()
    console.table(userInfo)
  }
}

contactButton.forEach(e => {
  e.addEventListener('click', (e) => {
    e.preventDefault()
    displayUserInfo()
  })
})

function resetForm () {
  nom.value = ''
  prenom.value = ''
  email.value = ''
  message.value = ''
}
