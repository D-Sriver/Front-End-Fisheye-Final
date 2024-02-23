const likeUtilisateur = 0

function totalLike () {
  const likes = document.querySelectorAll('.like-card')
  let total = 0

  likes.forEach(element => {
    const nombreLike = Number(element.innerText)
    total += nombreLike
  })

  return total
}
// ce projet va ma rendre fou

function updateLike (buttonClicked, newValue, likeVide, likePlein) {
  buttonClicked.innerHTML = newValue

  if (newValue !== likeUtilisateur) {
    likeVide.style.display = 'none'
    likePlein.style.display = 'inline'
    displayTotalLike()
  }
}

function handleLikeClick (likeVide, likePlein, increment) {
  likeVide.addEventListener('click', function (e) {
    const buttonClicked = e.target.parentElement.parentElement.children[0]
    const nbreLike = Number(buttonClicked.innerText)
    const newValue = nbreLike + increment
    updateLike(buttonClicked, newValue, likeVide, likePlein)
  })

  likeVide.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      const buttonClicked = e.target.parentElement.parentElement.children[0]
      const nbreLike = Number(buttonClicked.innerText)
      const newValue = nbreLike + increment
      updateLike(buttonClicked, newValue, likeVide, likePlein)
    }
  })
}

// eslint-disable-next-line no-unused-vars
function likePlus () {
  const likerLikeVide = document.querySelectorAll('.like-vide')
  const likerLikePlein = document.querySelectorAll('.like-plein')

  for (let i = 0; i < likerLikeVide.length; i++) {
    handleLikeClick(likerLikeVide[i], likerLikePlein[i], 1)
  }
}

// eslint-disable-next-line no-unused-vars
function likeMoins () {
  const likerLikeVide = document.querySelectorAll('.like-vide')
  const likerLikePlein = document.querySelectorAll('.like-plein')

  for (let i = 0; i < likerLikePlein.length; i++) {
    handleLikeClick(likerLikePlein[i], likerLikeVide[i], -1)
  }
}

function displayTotalLike () {
  const total = totalLike()
  const totalDisplay = document.querySelector('.total-like')
  totalDisplay.innerHTML = ` ${total + likeUtilisateur} <i class="fas fa-heart"></i> `
}
