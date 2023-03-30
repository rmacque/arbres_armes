<?php
  $tab = $_GET["tableaux"];
  $arme = $_GET["arme"];
  //var_dump($tab);
  
  $jsonstring = json_encode($tab, JSON_PRETTY_PRINT);
  file_put_contents("donnees/$arme.json", $jsonstring);
  
  echo true;
  
  /*
  $data = [];
  $armes_section = [];
  foreach($tab as $section){
    foreach($section["armes"] as $arme){
      $tmp = [];
      if(isset($arme["arbre"])){
        $tmp = $arme["arbre"];
      }
      $armes_section[] = [
        "generation" => $arme["generation"],
        "arbre" => $tmp,
        "image" => $arme["image"],
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
  file_put_contents("donnees/grandeepee2.json", $jsonstring);
  
  echo true;
  */