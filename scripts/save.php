<?php
  $tab = $_POST["tableaux"];
  $arme = $_POST["arme"];
  
  
  $jsonstring = json_encode($tab, JSON_PRETTY_PRINT);
  echo file_put_contents("donnees/$arme.json", $jsonstring);
  //var_dump($tab);
  //var_dump($tab[0]["armes"][0]["arbre"]);
  
  /*
  $data = [];
  $armes_section = [];
  foreach($tab as $section){
    foreach($section["armes"] as $arme){
      $tmp = [];
      if(isset($arme["arbre"])){
        //echo "a";
        foreach($arme["arbre"] as $val){
          //echo $val === "true";
          $tmp[] = ($val === "true");
        }
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
  echo file_put_contents("donnees/grandeepee2.json", $jsonstring);
  */