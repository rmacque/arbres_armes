"use strict";

const CHEMIN_IMAGES_ARMES = "../images/armes/";
const CHEMIN_ICONES = "../images/icones/";
const ATTRIBUTS = ["aucun", "feu", "eau", "glace", "foudre", "dragon", "paralysie", "poison", "poisse", "sommeil"];

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
 * @param {objet qui contient toutes les caractéristiques de l'arme}arme
 * construit une ligne de tableau avec ttes les infos de l'arme
 */
function row_build(arme){
  let row = "<tr class=\"armes\">";

  //Arborescence
  row += "<td class=\"col_arborescence\"><div class=\"esthetique\"><span hidden class=\"generation\">"+ arme["generation"] +"</span>";
  if(arme["generation"] == 0){
    row += "";
  } else {
    for(let i = 1; i < arme["generation"]; i++){
      row += "<span class=\"branche\"></span>"
    }
    row += "<span class=\"feuille\"></span>";
  }
  row +="</div><img class=\"icone\" alt=\"icône introuvable\" src=\"" + CHEMIN_IMAGES_ARMES + arme["image"] + ".png\"><button class=\"btn_leger amelioration\">amélioration</button></td>";

  row += "<td class=\"col_specificite\"></td>";
  row += "<td class=\"col_nom\"><input class=\"nom\" placeholder=\"Grande &Eacute;pée\" value=\""+ arme["nom"] +"\"/></td>";
  row += "<td class=\"col_degats\"><input class=\"degats\" placeholder=\"100\" value=\""+ arme["degats"] +"\"/></td>";
  row += "<td class=\"col_tranchant\">tranchant</td>";

  //Attribut
  row += "<td class=\"col_attribut\"><input class=\"attribut\" placeholder=\"-\" value=\""+ arme["attribut"] +"\"/><img src=\"" + CHEMIN_ICONES + arme["type_attribut"] +".webp\"><select class=\"type_attribut\">";
  ATTRIBUTS.forEach(attribut =>{
    row += "<option value=\""+ attribut + "\"";
    row += (attribut == arme["type_attribut"]) ? "selected" : "";
    row += ">"+ attribut +"</option>";
    // 
  });
  row += "</select></td>";

  row += "<td class=\"col_affinite\"><input class=\"affinite\" placeholder=\"0\" value=\""+ arme["affinite"] +"\"> %</input></td>";
  row += "<td class=\"col_fentes\"><input class=\"fentes\" placeholder=\"---\" value=\""+ arme["fentes"] +"\"/></td>";
  row += "<td class=\"col_bonus\"><input class=\"bonus\" placeholder=\"ex:15 def\" value=\""+ arme["bonus"] +"\"/></td>";

  row += "</tr>";

  row = stringToNode(row);

  //lien entre les selects et l'image de l'attribut choisit
  row.querySelector(".type_attribut").onchange = function(){
    this.previousSibling.src = CHEMIN_ICONES + this.value +".webp";
  };
  
  //Activation des boutons amelioration
  row.querySelector(".amelioration").onclick = function() {
    row_append(row, {
      "generation": Number(arme["generation"]) + 1,
      "image": "grandeepee",
      "nom_section": arme["nom_section"],
      "nom": "",
      "degats": "", 
      "attribut": "", 
      "type_attribut": "", 
      "affinite": "0", 
      "fentes": "---", 
      "bonus": ""
    });
  };
  return row;
}

/**
 * @param {L'element qui appelle} ligne_appelante 
 * @param {les donnees de l'arme} arme 
 */
function row_append(ligne_appelante, arme) {
  let new_row = row_build(arme);
  ligne_appelante.after(new_row);
}

function sauvegarder(img){
  let data = [];
  let data_armes = [];
  $("table").each(function(i){
    $(this)[0].querySelectorAll(".armes").forEach(arme => {
      //Recuperation des données du tableau
      data_armes.push({
        //arme.querySelector(".icone").src,
        "generation" : arme.querySelector(".generation").innerText,
        "image" : img,
        "nom" : arme.querySelector(".nom").value,
        "degats" : arme.querySelector(".degats").value,
        "attribut" : arme.querySelector(".attribut").value,
        "type_attribut" : arme.querySelector(".type_attribut").value,
        "affinite" : arme.querySelector(".affinite").value,
        "fentes" : arme.querySelector(".fentes").value,
        "bonus" : arme.querySelector(".bonus").value
      });
    });
    //data_armes contient les données de toutes les armes d'une section desormais
    data.push({"nom_section" : $(this)[0].querySelector(".nom_arbre").innerText, "armes" : data_armes});
    data_armes = [];
  });
  
  //console.log(data);

  $.ajax({
    method: "GET",
    dataType: "json",
    url: "../scripts/grandeepee.php",
    data: { "tableaux": data}
  }).done(function (obj) {
    $(".ajax").removeClass("error").addClass("success").html("Sauvegarde réussie");
  }).fail(function (e) {
    console.log(e);
    $(".ajax").removeClass("success").addClass("error").html("Erreur dans sauvegarder");
  });
  
}

function charger(type_arme){
  $.ajax({
    method: "GET",
    dataType: "json",
    url: "../scripts/load.php",
    data: {"arme": type_arme}
  }).done(function (obj) {
    let section;
    obj.forEach(e => {
      //Le titre de la section
      section = "<table><thead><tr class=\"titre\"><th colspan=\"9\" class=\"nom_arbre\">"+ e["nom_section"] +"</th></tr>";
      //2eme ligne:Les noms des categories
      section += "<tr class=\"caracteristiques\">";

      section += "<th class=\"col_arborescence\">Arborescence</th>";
      section += "<th class=\"col_specificite\">Specificite</th>";
      section += "<th class=\"col_nom\">Nom</th>";
      section += "<th class=\"col_degats\">Dégâts</th>";
      section += "<th class=\"col_tranchant\">Tranchant</th>";
      section += "<th class=\"col_attribut\">Attribut</th>";
      section += "<th class=\"col_affinite\">Affinité</th>";
      section += "<th class=\"col_fentes\">Fentes</th>";
      section += "<th class=\"col_bonus\">Bonus</th>";

      section += "</tr></thead><tbody></tbody></table>";
      section = stringToNode(section);

      //Les armes
      e["armes"].forEach(arme => {
        section.querySelector("tbody").append(row_build(arme));
      })      
      
      $("#content").append(section);
    })
    
  }).fail(function (e) {
    console.log(e);
    $(".ajax").removeClass("success").addClass("error").html("Erreur dans charger");
  });
}





/************************************
 * 
 * 
 *  CORBEILLE
 * 
 * 
 ***********************************/


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
