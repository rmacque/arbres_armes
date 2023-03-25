"use strict";

const CHEMIN_IMAGES_ARMES = "../images/armes/";
const CHEMIN_ICONES = "../images/icones/";
const ATTRIBUTS = ["--aucun--", "feu", "eau", "glace", "foudre", "dragon", "paralysie", "poison", "poisse", "sommeil"];

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
 * @param {contient toutes les caractéristiques de l'arme}arme
 * construit une ligne de tableau avec ttes les infos de l'arme
 */
function row_build(arme){
  let row = "<tr class=\"armes\">";
  row += "<td class=\"arborescence\"><div class=\"esthetique\"><span hidden class=\"generation\">"+ arme["generation"] +"</span>";
  if(arme["generation"] == 0){
    row += "";
  } else {
    for(let i = 1; i < arme["generation"]; i++){
      row += "<span class=\"branche\"></span>"
    }
    row += "<span class=\"feuille\"></span>";
  }
  row +="</div><img alt=\"icône introuvable\" src=\"" + CHEMIN_IMAGES_ARMES + arme["image"] + ".png\" class=\"icone\"></td>";
  row += "<td><div><button class=\"btn_leger amelioration\">amélioration</button></div></td>";

  row += "<td><input class=\"nom\" placeholder=\"&Eacute;pée " + arme["nom_section"] + "\" value=\""+ arme["nom"] +"\"/></td>";
  row += "<td><input class=\"degats\" placeholder=\"100\" value=\""+ arme["degats"] +"\"/></td>";
  row += "<td>tranchant</td>";

  row += "<td><input class=\"attribut\" placeholder=\"10\" value=\""+ arme["attribut"] +"\"/><img src=\"" + CHEMIN_ICONES + arme["type_attribut"] +".webp\"><select class=\"type_attribut\">";
  ATTRIBUTS.forEach(attribut =>{
    row += "<option "+ (attribut == arme["type_attribut"]) ? "selected" : "" +" value=\""+ attribut +"\">"+ attribut +"</option>";
  });
  row += "</select></td>";

  row += "<td><input class=\"affinite\" placeholder=\"0\" value=\""+ arme["affinite"] +"\"> %</input></td>";
  row += "<td><input class=\"fentes\" placeholder=\"OOO\" value=\""+ arme["fentes"] +"\"/></td>";
  row += "<td><input class=\"bonus\" placeholder=\"ex:15 def\" value=\""+ arme["bonus"] +"\"/></td>";

  row += "</tr>";

  row = stringToNode(row);

  //lien entre les selects et l'image de l'attribut choisit
  row.querySelector(".type_attribut").onchange = function(){
    this.previousSibling.src = CHEMIN_ICONES + this.value +".webp";
  };
  
  //Activation des boutons amelioration
  row.querySelector(".amelioration").onclick = function() {
    row_append(row, arme["generation"] + 1, arme["image"]);
  };

  return row;
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
  let data = [];
  let data_armes = [];
  $("table").each(function(i){
    $(this)[0].querySelectorAll(".armes").forEach(arme => {
      //Recuperation des données du tableau
      data_armes.push([
        //arme.querySelector(".icone").src,
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
  
  data = {"a":1,"b":2,"c":3};
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

function charger(img){
  $.ajax({
    method: "GET",
    dataType: "json",
    url: "../scripts/load.php",
    data: {"arme": "grandeepee"}
  }).done(function (obj) {
    let section;
    obj.forEach( e => {
      //Le titre de la section
      section = "<table><thead><tr class=\"titre\"><th colspan=\"9\" class=\"nom_arbre\">"+ e["nom_section"] +"</th></tr>";
      //2eme ligne:Les noms des categories
      section += "<tr class=\"caracteristiques\"><th>Arborescence</th><th>Rareté</th><th>Nom</th><th>Dégâts</th><th>Tranchant</th><th>Attribut</th><th>Affinité</th><th>Fentes</th><th>Bonus</th></tr></thead><tbody>";
      
      //Les armes
      e[0].forEach(arme => {
        section += "<tr class=\"armes\"><td class=\"arborescence\"><div class=\"esthetique\"><span hidden class=\"generation\">"+ arme["generation"] +"</span>";
        if(arme["generation"] == 0){
          section += "";
        } else {
          for(let i = 1; i < arme["generation"]; i++){
            section += "<span class=\"branche\"></span>"
          }
          section += "<span class=\"feuille\"></span>";
        }
        section +="</div><img alt=\"ne marche pas\" src=\"" + CHEMIN_IMAGES_ARMES + img + ".png\" class=\"icone\"></td>";
        section += "<td><div></div><div><button class=\"btn_leger amelioration\">amélioration</button></div></td>";

        section += "<td><input class=\"nom\" placeholder=\"&Eacute;pée " + arme["nom_section"] + "\" value=\""+ arme["nom"] +"\"/></td>";
        section += "<td><input class=\"degats\" placeholder=\"100\" value=\""+ arme["degats"] +"\"/></td>";
        section += "<td>tranchant</td>";

        section += "<td><input class=\"attribut\" placeholder=\"10\" value=\""+ arme["attribut"] +"\"/><img src=\"" + CHEMIN_ICONES + arme["type_attribut"] +".webp\"><select class=\"type_attribut\">";
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

      //lien entre les selects et l'image de l'attribut choisit
      section.querySelectorAll("select").forEach(select => {
        select.onchange = function(){
          this.previousSibling.src = CHEMIN_ICONES + this.value +".webp";
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
