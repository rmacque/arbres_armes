class Row {
  #parent;
  #generation;
  #enfants = [];
  #html;

  constructor(parent, html) {
    this.#parent = parent;
    this.#html = html;
  }

  create_child() {
    //créer une ligne
    let row = "<tr class=\"armes\"><td><div class=\"esthetique\">";
    row += "<span class=\"enfant\"></span><img alt=\"ne marche pas\" src=\""+ CHEMIN_IMAGES + img + ".png\" class=\"grandeepee\"></div>";
    
    //3eme ligne, boutons et reste
    row += "<div><button class=\"btn_leger amelioration\">amélioration</button></div></td>";
    
    row += "<td><input placeholder=\"&Eacute;Name\"/></td>";
    row += "<td><input placeholder=\"100\"/></td>";
    row += "<td>tranchant</td>";
    row += "<td><input placeholder=\"10\"/></td>";
    row += "<td><input placeholder=\"0\">%</input></td>";
    row += "<td><input placeholder=\"OOO\"/></td>";
    row += "<td><input placeholder=\"15 def\"/></td>";
    row += "</tr>";
    //ajout aux enfants
    this.#enfants.push(new Row(this, row));
  }

  delete(){
    if(this.#enfants.length ===0){
      delete this;
    }else{
      console.log("la ligne a encore des enfants");
    }
  }

  stringToNode() {
    return $(this.#html)[0];
  }

  getParents() {
    return this.#parent;
  }

  getGeneration(){
    return this.#generation;
  }

  getEnfants() {
    return this.#enfants;
  }

  getHtml() {
    return this.#html;
  }
}