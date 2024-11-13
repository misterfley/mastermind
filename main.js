const plateau = document.getElementById("plateau");
const buttons = document.querySelectorAll(".select");
let z = "";
const playerCode = [];
let blanc = 0;
let rouge = 0;
function newCode() {
  //ici c'est notre tableau de base
  const code = ["w", "b", "r", "j", "v", "n"];
  //on le mélange
  const shuffled = code.sort((a, b) => 0.5 - Math.random());

  //Pour avoir uniquement 4 valeurs ,on coupe les 2 premiers éléments.
  return shuffled.slice(2);
}
const code = newCode();
for (let i = 0; i < 12; i++) {
  z += `<div class="col-3 mt-2"></div>
          <div class="col-1 mt-3 trou"></div>
          <div class="col-1 mt-3 trou"></div>
          <div class="col-1 mt-3 trou"></div>
          <div class="col-1 mt-3 trou"></div>
          <div class="col-3 mt-2 mx-2 verif"></div>`;
}
plateau.innerHTML = z;
const trous = document.querySelectorAll(".trou");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    //on récupère la valeur écrite sur le bouton
    //et on la met en minuscule.)
    let v = button.innerHTML.toLowerCase();
    //tant qu'il y a moins de 4 pions dans le tableau on peut en rajouter un:
    if (playerCode.length < 4) {
      playerCode.push(v);
      //fonction qui change la couleur des trous
      coloringHole(playerCode.length, v);
      if (playerCode.length == 4) {
        //ici on compare notre code à celui du jeu
        console.log(playerCode);
        for (let i = 0; i < playerCode.length; i++) {
          for (let j = 0; j < code.length; j++) {
            if (i === j && playerCode[i] === code[j]) {
              rouge++;
              //ici , on teste la bonne couleur au bon endroit
              //on rajoute un petit pion rouge
            } else if (i !== j && playerCode[i] === code[j]) {
              blanc++;
              //ici uniquement la bonne couleur
              //on rajoute un petit pion blanc
            }
          }
        }
        console.log(`Rouge: ${rouge} et Blanc: ${blanc}`);
      }
    }
  });
});
function coloringHole(index, color) {
  let trou = trous[index - 1];
  switch (color) {
    case "j":
      trou.style.backgroundColor = "yellow";
      break;
    case "b":
      trou.style.backgroundColor = "blue";

      break;
    case "r":
      trou.style.backgroundColor = "red";

      break;
    case "w":
      trou.style.backgroundColor = "white";

      break;
    case "n":
      trou.style.backgroundColor = "black";

      break;
    case "v":
      trou.style.backgroundColor = "green";

      break;
  }
  //trou.style.backgroundColor="pink";
}
//Ici on veut que la hauteur des trous soit la même que leur largeur
trous.forEach((trou) => {
  let w = trou.offsetWidth;
  trou.style.height = `${w}px`;
});

//Avec cet événement, même quand vous changez la taille de l'écran,
//les trous restent carrés
window.addEventListener("resize", function () {
  let w = trou.offsetWidth;
  trou.style.height = `${w}px`;
});
