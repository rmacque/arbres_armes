"use strict";

function sauvegarder(weapon){
  let data = [];
  let data_armes = [];
  $.each($("table"), function(index, item){
    $.each($(item).find(".armes"), function(i, arme){
      //Recuperation des données du tableau
      //Construction de l'arbre
      let arbre = [];
      $.each($(arme).find(".branche"), function(j, e){
          arbre.push(!$(e).hasClass("invisible"))
      });

      //Recuperation des specificites
      let specificite;
      switch (weapon){
        case "corne":
          let notes = $(arme).find(".notes span");
          specificite = [$(notes.get(0)).attr("class"), $(notes.get(1)).attr("class"), $(notes.get(2)).attr("class")];
        break;

        case "lancecanon":
          let details = $(arme).find(".col_specificite span");
          specificite = [$(details.get(0)).text(), $(details.get(1)).text()];
        break;

        case "morpho-hache":
          specificite = $(arme).find(".col_specificite").text();
        break;

        case "volto-hache":
          specificite = $(arme).find(".col_specificite").text();
        break;

        case "insectoglaive":
          specificite = $(arme).find(".col_specificite").text();
        break;

        default:
        break;
      }

      data_armes.push({
        "generation" : parseInt($(arme).find(".generation").html()),
        "arbre": arbre,
        "image" : weapon,
        "specificite" : specificite,
        "nom" : $(arme).find(".nom").val(),
        "degats" : $(arme).find(".degats").val(),
        "attribut" : $(arme).find(".attribut").val(),
        "type_attribut" : $(arme).find(".type_attribut").val(),
        "affinite" : $(arme).find(".affinite").val(),
        "fentes" : $(arme).find(".fentes").val(),
        "bonus" : $(arme).find(".bonus").val()
      });
    });
    //data_armes contient les données de toutes les armes d'une section desormais
    data.push({"nom_section" : $(item).find(".nom_arbre").html(), "armes" : data_armes});
    data_armes = [];
  });
  
  //console.log(data);
  
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "../scripts/save.php",
    data: {"tableaux": data, "arme": weapon}
  }).done(function (obj) {
    //console.log(obj);
    $(".ajax").removeClass("error").addClass("success").html("Sauvegarde réussie");
  }).fail(function (e) {
    console.log(e);
    $(".ajax").removeClass("success").addClass("error").html("Erreur dans sauvegarder");
  });
  
}

function btn_sauvegarde(){
  if(typeof $("#arme").text() !== ''){
    $(".sauvegarder").click(function() {
      sauvegarder($("#arme").text());
    })
  }
  
}

function charger(type_arme){
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "../scripts/load.php",
    data: {"arme": type_arme}
  }).done(function (obj) {
    let section;
    $.each(obj, function(index, e){
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
      section = $.parseHTML(section);

      //Les armes
      $.each(e["armes"], function(j, arme){
        $(section).find("tbody").append(row_build(arme, type_arme));
      })      
      
      $("#content").append(section);
    })
    
  }).done(function(){
    let navsection = "<div>";
    $.each($(".nom_arbre"), function(i, val){
      navsection += "<a href=\"" + val + "\">" + $(val).text() + "</a>";
    })
    navsection += "</div>";
    console.log(navsection);
    $("#content").before($.parseHTML(navsection));

  }).fail(function (e) {
    console.log(e);
    $(".ajax").removeClass("success").addClass("error").html("Erreur dans charger");
  });
}