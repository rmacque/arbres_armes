class Row {
  #parent;
  #enfants = [];
  #html;

  constructor(parent, html){
    this.#parent = parent;
    this.#html = html;
  }

  append(){
    this.#enfants.push(new Row(this, row));
  }

  stringToNode(){
    return $(this.#html)[0];
  }
}