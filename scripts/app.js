"use strict";

const CHEMIN_IMAGES_ARMES = "../images/armes/";
const CHEMIN_IMAGES_ATTRIBUTS = "../images/attributs/";
const ATTRIBUTS = ["--aucun--","feu","eau", "glace", "foudre", "dragon", "paralysie", "poison", "poisse", "sommeil"];

function test(){
  console.log("bbb");
}

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

function stringToNode(string){
  return $(string)[0];
}
/**
 * @param {nom de la section} titre 
 * @param {le nom de la miniature de l'arme} img 
 */
function section_create(titre, img) {
  let content = $("#content");
  let section = "<table><thead><tr class=\"titre\"><th colspan=\"9\" class=\"nom_arbre\">"+titre+"</th></tr>";
  
  //2eme ligne
  section += "<tr class=\"caracteristiques\"><th>Arborescence</th><th>Rareté</th><th>Nom</th><th>Dégâts</th><th>Tranchant</th><th>Attribut</th><th>Affinité</th><th>Fentes</th><th>Bonus</th></tr></thead><tbody>";
  
  //3eme ligne
  section += "<tr class=\"armes\"><td><div class=\"esthetique\"><span class=\"generation\" hidden>0</span><span class=\"origine\"></span></div></td>";
  section += "<td><div><img alt=\"ne marche pas\" src=\"" + CHEMIN_IMAGES_ARMES + img + ".png\" class=\"grandeepee\"></div><div><button class=\"btn_leger amelioration\">amélioration</button></div></td>";

  section += "<td><input class=\"nom\" placeholder=\"&Eacute;pée " + titre + "e\"/></td>";
  section += "<td><input class=\"degats\" placeholder=\"100\"/></td>";
  section += "<td>tranchant</td>";
  section += "<td><input class=\"attribut\" placeholder=\"10\"/></td>";
  section += "<td><input class=\"affinite\" placeholder=\"0\"> %</input></td>";
  section += "<td><input class=\"fentes\" placeholder=\"OOO\"/></td>";
  section += "<td><input class=\"bonus\" placeholder=\"ex:15 def\"/></td>";
  section += "</tr>";
  section += "</tbody></table>";
  
  //cast du string en node
  section = stringToNode(section);

  content.append(section);
  //Activation du bouton amelioration
  section.querySelector(".amelioration").onclick = function() {
    row_append(parentNodeNiv(this, 3), 0, img);
  };
}

/**
 * @param {L'element qui appelle} element 
 * @param {Pour gerer l'esthetique de l'arbre} descendant 
 * @param {L'image de l'arme} img 
 */
function row_append(ligne_appelante, generation, img) {
  let new_row = "<tr class=\"armes\">";
  new_row += "<td><div class=\"esthetique\"><span class=\"enfant\"></span></div></td>";

  new_row += "<td><div><img alt=\"ne marche pas\" src=\""+ CHEMIN_IMAGES_ARMES + img + ".png\" class=\"grandeepee\"></div><div><button class=\"btn_leger amelioration\">amélioration</button></div></td>";
  new_row += "<td><input class=\"nom\" placeholder=\"&Eacute;Name\"/></td>";
  new_row += "<td><input class=\"degats\" placeholder=\"100\"/></td>";
  new_row += "<td>tranchant</td>";
  new_row += "<td><input class=\"attribut\" placeholder=\"10\"/></td>";
  new_row += "<td><input class=\"affinite\" placeholder=\"0\"> %</input></td>";
  new_row += "<td><input class=\"fentes\" placeholder=\"OOO\"/></td>";
  new_row += "<td><input class=\"bonus\" placeholder=\"ex:15 def\"/></td>";
  new_row += "</tr>";
  
  //cast de string en node
  new_row = stringToNode(new_row);
  //ajout  
  ligne_appelante.after(new_row);

  //Pour le style de l'arborescence
  let tmp = "<span class=\"generation\" hidden>"+ generation +"</span>";
  new_row.querySelector(".esthetique").prepend(stringToNode(tmp));
  
  //Activation des boutons
  new_row.querySelector(".amelioration").onclick = function () {
    row_append(new_row, generation + 1, img);
  };
}

function sauvegarder(){
  let tableaux = $("table");
  let data = [];
  let data_armes = [];
  tableaux.each(function(i){
    $(this)[0].querySelectorAll(".armes").forEach(arme => {
      //Recuperation des données
      data_armes.push([
        arme.querySelector(".generation").innerText,
        arme.querySelector(".nom").value,
        arme.querySelector(".degats").value,
        arme.querySelector(".attribut").value,
        arme.querySelector(".type_attribut").value,
        arme.querySelector(".affinite").value,
        arme.querySelector(".fentes").value,
        arme.querySelector(".bonus").value
      ]);
    });
    //data_armes contient les données de toutes les armes d'une section desormais
    data.push([$(this)[0].querySelector(".nom_arbre").innerText, data_armes]);
    data_armes = [];
  });
  console.log("data:",data);
  
  $.ajax({
    method: "GET",
    dataType: "json",
    url: "../scripts/grandeepee.php",
    data: { "tableaux": data}
  }).done(function () {
    $(".ajax").removeClass("error").addClass("success").html("Sauvegarde réussie");
  }).fail(function (e) {
    console.log(e);
    $(".ajax").removeClass("success").addClass("error").html("Erreur dans sauvegarder");
  });
}

function charger(img){
  $.ajax({
    method: "GET",
    dataType: "json",
    url: "../scripts/load.php",
    data: {"arme": "grandeepee"}
  }).done(function (obj) {
    let section;
    obj.forEach( e => {
      section = "<table><thead><tr class=\"titre\"><th colspan=\"9\" class=\"nom_arbre\">"+ e["nom_section"] +"</th></tr>";
      //2eme ligne
      section += "<tr class=\"caracteristiques\"><th>Arborescence</th><th>Rareté</th><th>Nom</th><th>Dégâts</th><th>Tranchant</th><th>Attribut</th><th>Affinité</th><th>Fentes</th><th>Bonus</th></tr></thead><tbody>";
      
      //3eme ligne
      e[0].forEach(arme => {
        section += "<tr class=\"armes\"><td><div class=\"esthetique\"><span class=\"generation\" hidden>" + arme["generation"] + "</span>";
        section += 
        arme["generation"] == 0 ? "<span class=\"origine\"></span>" : "<span class=\"enfant\"></span>";

        section +="</div></td>";
        section += "<td><div><img alt=\"ne marche pas\" src=\"" + CHEMIN_IMAGES_ARMES + img + ".png\" class=\"grandeepee\"></div><div><button class=\"btn_leger amelioration\">amélioration</button></div></td>";

        section += "<td><input class=\"nom\" placeholder=\"&Eacute;pée " + arme["nom_section"] + "\" value=\""+ arme["nom"] +"\"/></td>";
        section += "<td><input class=\"degats\" placeholder=\"100\" value=\""+ arme["degats"] +"\"/></td>";
        section += "<td>tranchant</td>";

        section += "<td><input class=\"attribut\" placeholder=\"10\" value=\""+ arme["attribut"] +"\"/><img src=\"\"><select class=\"type_attribut\">";
        ATTRIBUTS.forEach(attribut =>{
          section += "<option value=\""+ attribut +"\">"+ attribut +"</option>";
        })
        
        section += "</select></td>";
        section += "<td><input class=\"affinite\" placeholder=\"0\" value=\""+ arme["affinite"] +"\"> %</input></td>";
        section += "<td><input class=\"fentes\" placeholder=\"OOO\" value=\""+ arme["fentes"] +"\"/></td>";
        section += "<td><input class=\"bonus\" placeholder=\"ex:15 def\" value=\""+ arme["bonus"] +"\"/></td>";
        section += "</tr>";
      })
      
      section += "</tbody></table>";
      
      section = stringToNode(section);
      $("#content").append(section);

      section.querySelectorAll("select").forEach(e => {
        e.onchange = function(){
          //console.log(this.previousSibling)
          switch(this.value){
            case "--aucun--":
              this.previousSibling.src = "";
              break;
            case "feu":
              this.previousSibling.src = CHEMIN_IMAGES_ATTRIBUTS + "elements/feu_S.webp";
              break;
            case "eau":
              this.previousSibling.src = CHEMIN_IMAGES_ATTRIBUTS + "elements/eau_S.webp";
              break;
            case "glace":
              this.previousSibling.src = CHEMIN_IMAGES_ATTRIBUTS + "elements/glace_S.webp";
              break;
            case "foudre":
              this.previousSibling.src = CHEMIN_IMAGES_ATTRIBUTS + "elements/foudre_S.webp";
              break;
            case "dragon":
              this.previousSibling.src = CHEMIN_IMAGES_ATTRIBUTS + "elements/dragon_S.webp";
              break;
            case "poison":
              this.previousSibling.src = CHEMIN_IMAGES_ATTRIBUTS + "statuts/poison_L.webp";
              break;
            case "paralysie":
              this.previousSibling.src = CHEMIN_IMAGES_ATTRIBUTS + "statuts/paralysie.webp";
              break;
            case "sommeil":
              this.previousSibling.src = CHEMIN_IMAGES_ATTRIBUTS + "statuts/sommeil.webp";
              break;
            case "poisse":
              this.previousSibling.src = CHEMIN_IMAGES_ATTRIBUTS + "statuts/poisse.webp";
              break;
            default:
              this.previousSibling.src ="";
          }
        };
      })
      
      //Activation des boutons amelioration
      section.querySelectorAll(".amelioration").forEach(btn =>{
        btn.onclick = function() {
          row_append(parentNodeNiv(this, 3), 0, img);
        };
      })
    })
    
  }).fail(function (e) {
    console.log(e);
    $(".ajax").removeClass("success").addClass("error").html("Erreur dans charger");
  });
}
