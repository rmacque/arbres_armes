<?php
  $tab = $_GET["tableaux"];
  $data = [];
  $armes_section = [];
  foreach($tab as $section){
    foreach($section[1] as $arme){
      $armes_section[] = [
        "nom" => $arme[0], 
        "degats" => $arme[1] , 
        "attribut" => $arme[2], 
        "affinite" => $arme[3], 
        "fentes" => $arme[4], 
        "bonus" => htmlspecialchars($arme[5])
      ];
    }
    $data[] = ["nom_section" => $section[0], $armes_section];
    $armes_section = [];
  }

  $jsonstring = json_encode($data, JSON_PRETTY_PRINT);
  file_put_contents("donnees/grandeepee.json", $jsonstring);

  echo true;