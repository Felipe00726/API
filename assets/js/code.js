let grillaPokemon = document.querySelector("#g-pokemon")
let moviPoke = ""



/*Paginación*/
let btn_prev = document.querySelector("#prev")
let btn_next = document.querySelector("#next")


btn_prev.setAttribute("data-url-pokemones", "")
btn_next.setAttribute("data-url-pokemones", "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20")


btn_next.addEventListener("click", function (e) {
   let url = e.target.getAttribute("data-url-pokemones")
   if (url != "null") {
      lista_pokemones(e.target.dataset.urlPokemones)
   }
})

btn_prev.addEventListener("click", function (e) {
   if (e.target.dataset.urlPokemones != "null") {
      lista_pokemones(e.target.dataset.urlPokemones)
   }
})



lista_pokemones()






function lista_pokemones(urlPokeApi = "https://pokeapi.co/api/v2/pokemon/") {
   
grillaPokemon.innerHTML = ""

   let dataPokeApi = fetch(urlPokeApi)
   dataPokeApi.then(respuestaProm => respuestaProm.json())
   .then(jsonInfo => {
         jsonInfo.results.forEach(infoPokemon => {
            let pokemon = infoPokemon.url
            let pokemonAll = fetch(pokemon)
            pokemonAll.then(promPokemon => promPokemon.json())
               .then(detallePokemon => {
   
                  let habilidades = detallePokemon.abilities[0].ability.name
   
                  grillaPokemon.innerHTML += `<div class="col  ">
                  <div class="card h-100 color-card">
                  <h5 class="card-title text-center pt-3 text-uppercase">  ${detallePokemon.name}</h5>
                  
                  <img src="${detallePokemon.sprites.front_shiny}" class="card-img-top" alt="...">
                  <div class="card-body">
                  <p class="card-text"> Id: ${detallePokemon.id}</p>
                  
                  <p class="card-text"> Altura: ${detallePokemon.height} cm</p>
                  <p class="card-text"> Habilidad: ${habilidades}</p>
                  
                  </div>
                  </div>
                  </div>`
   
   
   
               })
   
         });
   
         btn_prev.setAttribute("data-url-pokemones", jsonInfo.previous)
         btn_next.setAttribute("data-url-pokemones", jsonInfo.next)
   
      })
}










