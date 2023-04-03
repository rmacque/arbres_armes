"use strict";

const CHEMIN_ICONES_ARMES = "../images/armes/"
const ARMES = ["grandeepee", "katana", "epee-bouclier", "dagues", "marteau", "corne", "lance", "lancecanon", "morpho-hache", "volto-hache", "insectoglaive"/*, "fusab_leger", "fusab_lourd", "arc"*/];

function navbar_create(){
  let html = ""
  ARMES.forEach(e =>{
    html += "<img src=\"" + CHEMIN_ICONES_ARMES + e + ".png\" value=\"" + e + "\"/>"
  });
  html += "<div id=\"arme\" hidden></div>"
  $("nav").append(html).after("<div class=\"nav_section\"></div>");
}

function selec_arme(){
  
  $("nav img").each(function(index, element){
    $(element).click(function(){
      $("table, #section_create, .section_create, button.sauvegarder").remove(); 
      $("#arme").text($(element).attr("value"))
      charger($(element).attr("value"));
      let btn_section = "<div class=\"section_create\"><button id=\"section_create\" class=\"btn_leger\">Nouvelle section</button></div>";
      btn_section = $.parseHTML(btn_section);
      $("#content").after(btn_section);
      
      $(".section_create .btn_leger").click(function(){
        let input = $.parseHTML("<input placeholder=\"Titre\">")
        $(btn_section).append(" : ").append(input);
        $(input).change(function(){
          section_create($(input).val())
          $(btn_section).remove()
        })
      })
      $("footer").prepend($.parseHTML("<button class=\"sauvegarder btn_lourd\">Sauvegarder</button>"));
      $(".sauvegarder").click(function() {
        sauvegarder($("#arme").text());
      })
    });
  });
};

