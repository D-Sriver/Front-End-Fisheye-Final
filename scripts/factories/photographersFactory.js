// Classe pour créer des objets Photographe en fonction du type (pour l'API de photos)
// eslint-disable-next-line no-unused-vars
class PhotographerFactory {
  constructor (data, type) {
    // Si le type est 'photoApi', renvoie une instance de la classe Photographer
    if (type === 'photoApi') {
      // eslint-disable-next-line no-undef
      return new Photographer(data)
    }
  }

  // Méthode de création d'objets Photographe
  photographerFactory (data) {
    const { name, portrait, country, city, tagline, price } = data
    // Chemin du fichier de portrait du photographe
    const picture = `assets/photographers/photo-id/${portrait}`

    // Fonction pour générer le DOM de la carte utilisateur sur la page principale
    function getUserCardDOM () {
      const article = document.createElement('article')
      article.innerHTML =
        `
          <a class="lien-profile" href="photographer.html?id=${data.id}" alt="Liens vers le profil de ${name} par clic sur image ou nom">
              <div class="article-index">
              <img src="${picture}" alt="" ${name}"></img>
              <h2> ${name} </h2>
              </div>
          </a>
          <div class="article-index">
              <div class="country">${city}, ${country}</div>
              <div class="tagline">${tagline}</div>
              <div class="price-main">${price}€/jour</div>
          </div>
      `

      return (article)
    }

    // Template Profil
    // Fonction pour générer le DOM du profil utilisateur
    function getProfilUserDOM () {
      const headerPhotographer = document.querySelector('.photograph-header')
      headerPhotographer.innerHTML +=
      // Template header photographer.html
        `   <div class="header-infos"> 
                <div class="name" aria-label="nom du photographe" ><h1>${name}</h1></div>
                
                <div class="meta-infos-header">
                <p class="country">${city}, ${country}</p>
                <p class="tagline">${tagline}</p>
                </div>
            </div>
        
            <div class="header-image">
                <img src="${picture}" alt="${name}"></img>  
            </div>

            <div class="price"><p>${price}€/jour</p><span class="total-like"></span></div>
        `
      // Affichage du nom du photographe dans la modale.
      document.querySelector('#name-photograph-modal').innerText += name

      return (headerPhotographer)
    }
    // Retourne les données associées à l'objet Photographe
    return { name, picture, tagline, price, country, getProfilUserDOM, getUserCardDOM }
  }
}
