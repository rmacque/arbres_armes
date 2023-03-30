<?php
  $arme = $_GET["arme"];
  $json = file_get_contents("donnees/$arme.json");
  //$json = file_get_contents("donnees/grandeepee.json");
  echo $json;
?>