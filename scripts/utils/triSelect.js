const buttonSelect = document.querySelector('#buttonFilter')
const filterSelectedElement = document.querySelector('.gallerie-media-filters-menu--selected')
const filterListElement = document.querySelector('.gallerie-media-filters-menu--list')
const filterItemsElement = document.querySelectorAll('.gallerie-media-filters-menu--list > li')
const filterPopularElement = document.querySelector('#filter-popular')

filterListElement.classList.add('display-none')

function filterListClose () {
  const boxArrow = document.querySelector('.box-arrow')
  buttonSelect.style.borderRadius = '5px'

  boxArrow.style.transform = 'rotate(0deg) translateY(0)'
  filterSelectedElement.classList.add('display-none')
  filterListElement.classList.add('display-none')
  filterSelectedElement.removeAttribute('aria-expanded',
    filterSelectedElement.getAttribute('aria-expanded') === 'true')
  filterSelectedElement.setAttribute('aria-expanded', 'false')
  filterListElement.setAttribute('aria-hidden', 'true')
}

const arrowToggle = (() => {
  let open = false
  return function ({ target: el }) {
    if (el === buttonSelect) open = !open
    else open = false
    const boxArrow = document.querySelector('.box-arrow')

    if (open) {
      boxArrow.style.transformOrigin = '80% 50%'
      boxArrow.style.transform = 'rotate(-180deg)'
      filterSelectedElement.classList.remove('display-none')
      filterListElement.classList.remove('display-none')
      filterSelectedElement.setAttribute(
        'aria-expanded',
        filterSelectedElement.getAttribute('aria-expanded') === 'false')
    } else {
      filterListClose()
    }
  }
})()

document.addEventListener('click', arrowToggle)

buttonSelect.addEventListener('click', () => {
  buttonSelect.style.borderRadius = '5px 5px 0px 0px'
  filterItemsElement.forEach(element => {
    element.addEventListener('click', () => {
    })
    element.addEventListener('focus', (e) => {
      filterListElement.setAttribute('aria-activedescendant', e.target.id)
    })
  })
  document.addEventListener('keydown', (e) => {
    if (filterSelectedElement.getAttribute('aria-expanded') === 'true') {
      if (e.key === 'Enter') {
        e.target.click()
      }
    }
  })
})

function cacheFiltre (target) {
  for (const element of filterItemsElement) {
    if (element.classList.contains('valeur-cache')) {
      element.classList.remove('valeur-cache')
    }
  }
  target.classList.add('valeur-cache')
}
// eslint-disable-next-line no-unused-vars
async function selectFiltre (allMedias, run) {
  function sortAndDisplay (sortedMedias, displayPopularElement) {
    displaySelect(sortedMedias, run)
    filterPopularElement.style.display = displayPopularElement
  }

  filterItemsElement.forEach(element => {
    element.addEventListener('click', function () {
      let sortedMedias
      let displayPopularElement = 'block'

      if (element.id === 'filter-title') {
        sortedMedias = allMedias.sort((a, b) => (a.title > b.title ? 1 : -1))
      } else if (element.id === 'filter-popular') {
        sortedMedias = allMedias.sort((a, b) => (a.likes > b.likes ? 1 : -1))
        displayPopularElement = 'none'
      } else if (element.id === 'filter-date') {
        sortedMedias = allMedias.sort((a, b) => (a.date > b.date ? 1 : -1))
      }

      sortAndDisplay(sortedMedias, displayPopularElement)

      buttonSelect.innerHTML = `${element.innerText}<span class="box-arrow"><i class="fas fa-chevron-down" aria-hidden="false"></i></span>`
      cacheFiltre(element)
    })
  })
}

function displaySelect (type, run) {
  const gallery = document.querySelector('.gallery')
  gallery.innerHTML = ''
  run.displayMedias(type)
  run.createMediaDOM()
  // eslint-disable-next-line no-undef
  likePlus()
  // eslint-disable-next-line no-undef
  likeMoins()
  // eslint-disable-next-line no-undef
  displayTotalLike()
}
