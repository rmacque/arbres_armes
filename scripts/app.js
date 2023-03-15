"use strict";

const CHEMIN_IMAGES = "../images/";

function draw_ligne_verticale_canva(element) {
  let ctx = element.getContext('2d');
  ctx.fillRect(0, 0, 5, 30);
  ctx.fillStyle = 'black';
}

function draw_angledroit_canva(element) {
  console.log(element);
  let ctx = element.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(5, 0);
  ctx.lineTo(5, 25);
  ctx.lineTo(15, 25);
  ctx.lineTo(15, 30);
  ctx.lineTo(0, 30);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function parentNodeNiv(node, niveau) {

  let res = node;

  for (let i = 0; i < niveau; i++) {
    res = res.parentNode
  }

  return res;
}
/**
 * 
 * @param {nom de la section} titre 
 * @param {le chemin de la miniature de l'arme} img 
 */
function section_create(titre, img) {
  let tableau = $("table");
  //1ere et 2eme ligne
  let chaine = "<tr class=\"titre\"><td colspan=\"8\" class=\"nom_arbre\">Arbre "+titre+"</td></tr>";
  chaine += "<tr class=\"caracteristiques\"><td>Rareté et arborescence</td><td>Nom</td><td>Dégâts</td><td>Tranchant</td><td>Attribut</td><td>Affinité</td><td>Fentes</td><td>Bonus</td></tr>";
  //3eme ligne, esthetique
  chaine += "<tr class=\"armes\"><td><div class=\"esthetique\"><span class=\"origine\"></span><img alt=\"ne marche pas\" src=\"" + CHEMIN_IMAGES + img + ".png\" class=\"grandeepee\"></div>";

  //3eme ligne, boutons et reste
  chaine += "<div><button class=\"btn_leger amelioration\">amélioration</button></div></td>";
  chaine += "<td>&Eacute;pée " + titre + "</td>";
  chaine += "<td>Nan</td>";
  chaine += "<td>une images du tranchant des armes ?</td>";
  chaine += "<td>---</td>";
  chaine += "<td>0%</td>";
  chaine += "<td>---</td>";
  chaine += "<td>---</td></tr>";

  chaine = $(chaine);
  tableau.append(chaine);

  //Activation du bouton amelioration
  chaine[2].querySelectorAll(".amelioration")[0].onclick = function(){
    row_append(this, 0, img);
  };
}

function row_append(element, descendant, img) {
  let ligne_appelante = parentNodeNiv(element, 3);
  
  let row = "<tr class=\"armes\"><td><div class=\"esthetique\">";

  if(ligne_appelante.nextSibling.className === "armes"){
    console.log(ligne_appelante.nextSibling.querySelectorAll(".descendant, .enfant"));
    row += "<span class=\"cousin\"></span>";
  }

  for(let i = 0; i < descendant ; i++){
    row += "<span class=\"descendant\"></span>";
  }
  
  row += "<span class=\"enfant\"></span><img alt=\"ne marche pas\" src=\""+ CHEMIN_IMAGES + img + ".png\" class=\"grandeepee\"></div>";
  row += "<div><button class=\"btn_leger amelioration\">amélioration</button><button class=\"btn_leger supprimer\" onclick=row_delete()>supprimer</button></div></td>";
  row += "<td><input placeholder=\"&Eacute;Name\"/></td>";
  row += "<td><input placeholder=\"100\"/></td>";
  row += "<td>tranchant</td>";
  row += "<td><input placeholder=\"10\"/></td>";
  row += "<td><input placeholder=\"0\">%</input></td>";
  row += "<td><input placeholder=\"OOO\"/></td>";
  row += "<td><input placeholder=\"15 def\"/></td>";
  row += "</tr>";
  
  //cast de string en node
  row = $(row)[0];

  //ajout  
  ligne_appelante.after(row);

  //Desactivation du bouton supprimer
  row.querySelector(".supprimer").onclick = function () {
    let e = parentNodeNiv(this, 3).previousSibling.querySelector(".supprimer");
    if(e){
      e.disabled = false;
      e.addClass("desactive") //Pour le CSS
    }
    parentNodeNiv(this, 3).remove();
  };
  
  //Activation des boutons
  row.querySelector(".amelioration").onclick = function () {
    parentNodeNiv(this, 3).querySelector(".supprimer").disabled = true;
    //parentNodeNiv(this, 3).previousSibling.querySelector(".supprimer").disabled = true
    row_append(this, descendant + 1, img);
  };
}

function sauvegarder(){
  let tableau = $("table")[0];
  let tableau_armes = tableau.querySelectorAll(".armes");
  //console.log(tableau_armes);
  let tableau_data = [];
  tableau_armes.forEach(arme => {
    console.log(arme.childNodes[1].innerHTML);
    tableau_data.push(arme.childNodes[1].innerHTML);
  });
  console.log(tableau_data);
  $.ajax({
    method: "GET",
    dataType: "json",
    url: "scripts/grandeepee.php",
    //data: {"tableau": tableau_data}
  }).done(function (obj) {
    console.log(obj);
    //console.log(tableau_data);
  }).fail(function (e) {
    console.log(e);
    $("body").append("<div class=\"ajax error\">Erreur Ajax dans : sauvegarder<div>");
  });
}

/**
 * Faire un script pour réaffecter la classe impair à chaque ligne concernée lors des suppressions 
    if(!(row.rowIndex % 2)){
        row.classList += "impair" ;
    }
*/
