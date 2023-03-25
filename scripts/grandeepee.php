<?php
  $tab = $_GET["tableaux"];
  //echo $tab["a"], $tab["b"], $tab["c"];
  
  $data = [];
  $armes_section = [];
  foreach($tab as $section){
    foreach($section[1] as $arme){
      $armes_section[] = [
        "image" => $arme[0],
        "generation" => $arme[1],
        "nom" => $arme[2], 
        "degats" => $arme[3] , 
        "attribut" => $arme[4], 
        "type_attribut" => $arme[5],
        "affinite" => $arme[6], 
        "fentes" => $arme[7], 
        "bonus" => $arme[8]
      ];
    }
    $data[] = ["nom_section" => $section[0], $armes_section];
    $armes_section = [];
  }

  $jsonstring = json_encode($data, JSON_PRETTY_PRINT);
  file_put_contents("donnees/grandeepee.json", $jsonstring);
  
  echo true;