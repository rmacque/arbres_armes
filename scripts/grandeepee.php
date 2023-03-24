<?php
  $tab = $_GET["tableaux"];
  $data = [];
  $armes_section = [];
  foreach($tab as $section){
    foreach($section[1] as $arme){
      $armes_section[] = [
        "generation" => $arme[0],
        "nom" => $arme[1], 
        "degats" => $arme[2] , 
        "attribut" => $arme[3], 
        "type_attribut" => $arme[4],
        "affinite" => $arme[5], 
        "fentes" => $arme[6], 
        "bonus" => $arme[7]
      ];
    }
    $data[] = ["nom_section" => $section[0], $armes_section];
    $armes_section = [];
  }

  $jsonstring = json_encode($data, JSON_PRETTY_PRINT);
  file_put_contents("donnees/grandeepee.json", $jsonstring);

  echo true;