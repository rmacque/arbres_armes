"use strict";

const CHEMIN_IMAGES_ARMES = "../images/armes/";
const CHEMIN_ICONES = "../images/icones/";
const ATTRIBUTS = ["aucun", "feu", "eau", "glace", "foudre", "dragon", "paralysie", "poison", "poisse", "sommeil"];
const NOTES_1 = ["white", "purple"];
const NOTES_2_3 = ["blue", "lightblue", "red", "green", "yellow", "orange"];
const LANCECANONS = ["normal", "large", "long"];
const FIOLES_MORPHO =["force", "fatigue", "dragon", "poison", "paralysie", "elementaire"];
const FIOLES_VOLTO =["antiblindage", "elementaire"];

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

/**
 * @param {objet qui contient toutes les caractéristiques de l'arme}arme
 * @param {marteau, katana, lance, ...}type_arme
 * construit une ligne de tableau avec ttes les infos de l'arme
 */
function row_build(arme, type_arme){
  let row = "<tr class=\"armes\">";

  //Arborescence
  row += "<td class=\"col_arborescence\"><div class=\"arbre\"><span hidden class=\"generation\">"+ arme["generation"] +"</span>";

  //On contruit l'arbre de l'enfant potentiel
  let new_arbre = []

  //Construction de l'arbre
  //console.log(arme["arbre"])
  if(typeof arme["arbre"] !== 'undefined'){
    arme["arbre"].forEach(branche => {
      row += "<span class=\"branche";
      //console.log(Boolean(branche))
      //La conversion en json est foireuse, donc on fait double condition
      //row += branche ? "" : " invisible";
      
      if(branche == "false" || !branche){
        row += " invisible";
      }
      
      row += "\"></span>"
      
      //recopie de l'arborescence du parent
      new_arbre.push(branche)
    });
  }

  if(arme["generation"] > 0){
    row += "<span class=\"feuille\"></span>";

    //Par défaut, l'enfant n'a pas de frere
    new_arbre.push(false);
  }

  row +="</div><img class=\"icone\" alt=\"icône introuvable\" src=\"" + CHEMIN_IMAGES_ARMES + arme["image"] + ".png\"><button class=\"btn_leger amelioration\">amélioration</button></td>";
  row += "<td class=\"col_specificite\"></td>";

  //nom, degats et tranchant
  row += "<td class=\"col_nom\"><input class=\"nom\" placeholder=\"Grande &Eacute;pée\" value=\""+ arme["nom"] +"\"/></td>";
  row += "<td class=\"col_degats\"><input class=\"degats\" placeholder=\"100\" value=\""+ arme["degats"] +"\"/></td>";
  row += "<td class=\"col_tranchant\">tranchant</td>";

  //Attribut
  row += "<td class=\"col_attribut\">";

  row += "<input class=\"attribut\" value=\""+ arme["attribut"] +"\"";
  row += (arme["type_attribut"] == ATTRIBUTS[0]) ? " disabled" : "";
  row += " />"

  row += "<img src=\"" + CHEMIN_ICONES + arme["type_attribut"] +".webp\"><select class=\"type_attribut\">";
  ATTRIBUTS.forEach(attribut =>{
    row += "<option value=\""+ attribut + "\"";
    row += (attribut == arme["type_attribut"]) ? "selected" : "";
    row += ">"+ attribut +"</option>";
  });
  row += "</select></td>";

  row += "<td class=\"col_affinite\"><input class=\"affinite\" placeholder=\"0\" value=\""+ arme["affinite"] +"\"> %</input></td>";
  row += "<td class=\"col_fentes\"></td>";
  row += "<td class=\"col_bonus\"><input class=\"bonus\" placeholder=\"ex:15 def\" value=\""+ arme["bonus"] +"\"/></td>";
  //<input class=\"fentes\" placeholder=\"---\" value=\""+ arme["fentes"] +"\"/>
  row += "</tr>";
  row = $.parseHTML(row);

  //Dynamisme des fentes
  let fentes = "<div class=\"fentes\">" + arme["fentes"] + "</div>";
  fentes = $.parseHTML(fentes);
  $(fentes).click(function(){
    if($(this).text() == "---"){
      $(this).text("O--");
    } else if($(this).text() == "O--"){
      $(this).text("OO-");
    } else if($(this).text() == "OO-"){
      $(this).text("OOO");
    } else {
      $(this).text("---");
    }
  })
  $(row).find(".col_fentes").append(fentes);

  //Specificites
  let spe = "";
  let var2 = -1;
  let var3 = -1;
  switch(type_arme){
    case 'corne':
      spe += "<div class=\"notes\">";
      arme["specificite"].forEach(note => {
        spe += "<span class=\"" + note + "\">♪</span>" //couleurs des notes
      });
      spe += "</div>";
      spe = $.parseHTML(spe);
      //Changement des notes a la volée
      let notes = $(spe).find("span")
      $(notes[0]).click(function(){
        $(this).toggleClass("white").toggleClass("purple");
      })
      
      $(notes[1]).click(function(){
        let i=0;
        while(i < NOTES_2_3.length && NOTES_2_3[i] != $(this).attr("class")){
          i++;
        }
        if(var2 + 1 < NOTES_2_3.length){
          $(notes[1]).removeClass(NOTES_2_3[var2]).addClass(NOTES_2_3[var2+1])
        }else{
          $(notes[1]).removeClass(NOTES_2_3[var2]).addClass(NOTES_2_3[0])
        }
      })
      $(notes[2]).click(function(){
        let i=0;
        while(i < NOTES_2_3.length && NOTES_2_3[i] != $(this).attr("class")){
          i++;
        }
        if(var3 + 1 < NOTES_2_3.length){
          $(notes[2]).removeClass(NOTES_2_3[var3]).addClass(NOTES_2_3[var3+1])
        }else{
          $(notes[2]).removeClass(NOTES_2_3[var3]).addClass(NOTES_2_3[0])
        }
      })
      break;

    case 'lancecanon':
      spe += "<div><span>" + arme["specificite"][0] + "</span> <span>" + arme["specificite"][1] + "</span></div>"  //details du canon
      spe = $.parseHTML(spe);
      $(spe).find("span").first().click(function(){
        //type du canon
        //On trouve la valeur selectionnee dans le tableau
        let i=0;
        while(i < LANCECANONS.length && LANCECANONS[i] != $(this).text()){
          i++;
        }
        if(i < LANCECANONS.length - 1){
          $(this).text(LANCECANONS[i+1]);
        }else{
          $(this).text(LANCECANONS[0]);
        }
      })
      //nb de tirs
      $(spe).find("span").last().click(function(){
        if($(this).text() != "4"){
          $(this).text(parseInt($(this).text()) + 1)
        }else{
          $(this).text(1)
        }
      })
      break;

    case 'morpho-hache':
      spe += "<div>" + arme["specificite"] + "</div>"; //type de fioles
      spe = $.parseHTML(spe);
      $(spe[0]).click(function(){
        //On trouve la valeur selectionnee dans le tableau
        let i = 0;
        while(i < FIOLES_MORPHO.length && FIOLES_MORPHO[i] != $(this).text()){
          i++;
        }
        if(i < FIOLES_MORPHO.length - 1){
          $(this).text(FIOLES_MORPHO[i+1])
        }else{
          $(this).text(FIOLES_MORPHO[0])
        }
      })
      break;

    case 'volto-hache':
      spe += "<div>" + arme["specificite"] + "</div>"; //type de fioles
      spe = $.parseHTML(spe);
      $(spe).click(function(){
        $(spe).text(($(spe).text() == "antiblindage") ? "elementaire" : "antiblindage")
      })
      break;

    case 'insectoglaive':
      spe += "<div>" + arme["specificite"] + "</div>";  //type d'insecte
      spe = $.parseHTML(spe);
      $(spe).click(function(){
        $(spe).text(($(spe).text() == "lame") ? "masse" : "lame")
      })
      break;

    default : 
      spe += "<div></div>";
      spe = $.parseHTML(spe);
      break;
  }

  $(row).find(".col_specificite").append(spe);

  //lien entre les selects et l'image de l'attribut choisit
  $(row).find(".type_attribut").change(function(){
    $(this).prev().attr("src", function(){ 
      return CHEMIN_ICONES + $(row).find(".col_attribut .type_attribut").val() + ".webp"
    })
    if($(this).val() == ATTRIBUTS[0]){
      $(row).find(".attribut").prop("disabled", true).prop("value", "");
    } else {
      $(row).find(".attribut").prop("disabled", false);
    }
  });

  //Activation des boutons amelioration
  $(row).find(".amelioration").click(function() {
    row_append(row, {
      "generation": parseInt(arme["generation"]) + 1,
      "arbre": new_arbre,
      "specificite": arme["specificite"],
      "image": arme["image"],
      "nom": "",
      "degats": "", 
      "attribut": "", 
      "type_attribut": ATTRIBUTS[0], 
      "affinite": "0", 
      "fentes": "---", 
      "bonus": ""
    }, type_arme);
  });
  return row;
}

/**
 * @param {L'element qui appelle} ligne_appelante 
 * @param {les donnees de l'arme} arme 
 */
function row_append(ligne_appelante, arme, type_arme) {

  if($(ligne_appelante).next() != null){

    let tmp = parseInt($(ligne_appelante).find(".generation").html());
    
    //On verifie si l'enfant a déja un frere, si c'est le cas, on change son arbre    
    if(parseInt($(ligne_appelante).find(".generation").html()) 
    == parseInt($(ligne_appelante).next().find(".generation").html())){
      arme["arbre"][tmp - 1] = true;
    }
  }

  let new_row = row_build(arme, type_arme);
  $(ligne_appelante).after(new_row);
}

/**
 * @param {nom de la section} titre 
 * @param {type de l'arme} type_arme 
 */
function section_create(titre, type_arme) {
  //Le titre de la section
  section = "<table><thead><tr class=\"titre\"><th colspan=\"9\" class=\"nom_arbre\">"+ titre +"</th></tr>";
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
  section = $.parseHTML(section);

  let specificite;
  switch (type_arme){
    case "corne":
      specificite = ["white","blue","red"];
    break;
    case "lancecanon":
      specificite = ["normal","1"];
    break;
    case "morpho-hache":
      specificite = "force";
    break;
    case "volto-hache":
      specificite = "antiblindage";
    break;
    case "insectoglaive":
      specificite = "lame";
    break;
    default:
    break;
  }
  $(section).find("tbody").append(row_build(
    {"generation" : 0, "arbre" : [], "image": type_arme, "specificite" : specificite, "nom" : "arme" + titre, "degats": 100, "attribut": "", "type_attribut": "aucun", "affinite" : 0, "fentes" : "---", "bonus" : ""}
    , type_arme));

  $("#content").append(section);
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
  section = $.parseHTML(section);

  $("#content").append(section);
  //Activation du bouton amelioration
  section.querySelector(".amelioration").onclick = function() {
    row_append(parentNodeNiv(this, 3), 0, img);
  };
}
