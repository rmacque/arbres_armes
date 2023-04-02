"use strict";

const CHEMIN_ICONES_ARMES = "../images/armes/"
const ARMES = ["grandeepee", "katana", "epee-bouclier", "dagues", "marteau", "corne", "lance", "lancecanon", "morpho-hache", "volto-hache", "insectoglaive"/*, "fusab_leger", "fusab_lourd", "arc"*/];

function navbar_create(){
  let html = ""
  ARMES.forEach(e =>{
    html += "<img src=\"" + CHEMIN_ICONES_ARMES + e + ".png\" value=\"" + e + "\"/>"
  });
  html += "<div id=\"arme\" hidden></div>"
  $("nav").append(html);
}

function selec_arme(){
  $("nav img").each(function(index, element){
    $(element).click(function(){
      $("table").remove();  
      $("#arme").html($(this).attr("value"))
      charger($(this).attr("value"));
    });
  });
};