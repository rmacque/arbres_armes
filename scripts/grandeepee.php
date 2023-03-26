<?php
  $tab = $_GET["tableaux"];
  //echo $tab["a"], $tab["b"], $tab["c"];
  /*
  $data = [];
  $armes_section = [];
  foreach($tab as $section){
    foreach($section["armes"] as $arme){
      $armes_section[] = [
        "image" => $arme["image"],
        "generation" => $arme["generation"],
        "nom" => $arme["nom"], 
        "degats" => $arme["degats"] , 
        "attribut" => $arme["attribut"], 
        "type_attribut" => $arme["type_attribut"],
        "affinite" => $arme["affinite"], 
        "fentes" => $arme["fentes"], 
        "bonus" => $arme["bonus"]
      ];
    }
    $data[] = ["nom_section" => $section["nom_section"], "armes" => $armes_section];
    $armes_section = [];
  }
  
  $jsonstring = json_encode($data, JSON_PRETTY_PRINT);
  */
  $jsonstring = json_encode($tab, JSON_PRETTY_PRINT);
  file_put_contents("donnees/grandeepee.json", $jsonstring);
  
  echo true;