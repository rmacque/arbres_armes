function draw_ligne_verticale_canva(element){
    let ctx = element.getContext('2d');
    ctx.fillRect(0, 0, 5, 30);
    ctx.fillStyle = 'black';
}

function draw_angledroit_canva(element){
    console.log(element);
    let ctx = element.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(5, 0);
    ctx.lineTo(5, 25);    
    ctx.lineTo(15, 25);
    ctx.lineTo(15, 30);
    ctx.lineTo(0, 30);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function parentNodeNiv(node, niveau){

    let res = node;
    
    for(let i=0; i<niveau; i++){
        res = res.parentNode
    }
    
    return res;
}

function row_append(table, index, descendant = 1, img = "grandeepee"){
    let html = "<div class=\"esthetique\">";
    let row = table.insertRow(index);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);
    for(let i = 0; i< descendant - 1; i++){
        html += "<span class=\"descendant\"></span>";
    }
    html += "<span class=\"enfant\"></span><img alt=\"ne marche pas\" src=\"images/"+ img +".png\" class=\"grandeepee\"></div><div><button class=\"btn_leger amelioration\">amélioration</button><button class=\"btn_leger supprimer\">supprimer</button></div>";
    cell1.innerHTML = html;
    cell2.innerHTML = "&Eacute;Name";
    cell3.innerHTML = "Nan";
    cell4.innerHTML = "tranchant";
    cell5.innerHTML = "---";
    cell6.innerHTML = "0%";
    cell7.innerHTML = "---";
    cell8.innerHTML = "---";

    //on attache les fonctions aux boutons
    if(!(row.rowIndex % 2)){
        row.classList += "impair" ;
    }
    console.log(row);
    row.getElementsByClassName("supprimer")[0].onclick = function(){
        parentNodeNiv(this,3).remove();
    };
    row.getElementsByClassName("amelioration")[0].onclick = function(){
        row_append(parentNodeNiv(this, 5), parentNodeNiv(this, 3).rowIndex + 1, descendant + 1);
    };
}

function section_create(table, titre, img){
    //1ere et 2eme ligne
    let chaine = "<tr class=\"titre\"><td colspan=\"8\" class=\"nom_arbre\">Arbre "+titre+"</td></tr><tr class=\"caracteristiques\"><td>Rareté et arborescence</td><td>Nom</td><td>Dégâts</td><td>Tranchant</td><td>Attribut</td><td>Affinité</td><td>Fentes</td><td>Bonus</td></tr>";
    //3eme ligne
    chaine += "<tr><td><span class=\"origine\"></span><img alt=\"ne marche pas\" src=\"images/"+ img +".png\" class=\"grandeepee\"></div><div><button class=\"btn_leger amelioration\">amélioration</button></div></td><td>&Eacute;Name</td><td>Nan</td><td>Lorem</td><td>---</td><td>0%</td><td>---</td><td>---</td></tr>"
    table.innerHTML += chaine
}
