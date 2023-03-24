<?php
  $arme = htmlspecialchars($_GET["arme"]);
  $json = file_get_contents("donnees/$arme.json");
  echo $json;
?>