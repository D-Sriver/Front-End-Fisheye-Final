/* eslint-disable no-unused-vars */
// crée des constante pour récupérer les element du DOM
const prenom = document.getElementById('prenom')
const nom = document.getElementById('nom')
const email = document.getElementById('email')
const message = document.getElementById('message')
const contactButton = document.querySelectorAll('.contact-button')
function displayModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'
}
function closeModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
  resetForm()
}
function SubmitForm (event) {
  event.preventDefault()
  if (contactButton.value === 'Fermer') {
    closeModal()
  }
}
contactButton.forEach(e => {
  e.addEventListener('click', (e) => {
    e.preventDefault()
  })
})
function resetForm () {
  nom.value = ''
  prenom.value = ''
  email.value = ''
}
