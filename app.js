function draw_ligne_verticale_canva(element){
    let ctx = element.getContext('2d');
    ctx.fillRect(0, 0, 5, 30);
    ctx.fillStyle = 'black';
}

function draw_ligne_verticale_span(element){
    // à faire
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

function row_build(){
    let row = document.createElement("tr");
    let tmp = document.createElement("td");
    for (let index = 0; index < 8; index++) {
        row.insertCell(tmp); 
    }
    row.childNodes[7].innerHTML = "---";
    row.childNodes[6].innerHTML = "---";
    row.childNodes[5].innerHTML = "0%";
    row.childNodes[4].innerHTML = "---";
    row.childNodes[3].innerHTML = "tranchant"
    row.childNodes[2].innerHTML = "70"
    row.childNodes[1].innerHTML = "Epee de fer"
    row.childNodes[0].innerHTML = "<div><img alt=\"ne marche pas\" src=\"images/grandeepee.png\" class=\"grandeepee\"></div><div><button class=\"btn_leger amelioration\">amélioration</button><button class=\"btn_leger supprimer\">supprimer</button></div>";
    //row.appendChild(document.createElement("td").innerHTML = "aaaa");
    let rowstr = "<td><div><img alt=\"ne marche pas\" src=\"images/grandeepee.png\" class=\"grandeepee\"></div><div><button class=\"btn_leger amelioration\">amélioration</button><button class=\"btn_leger supprimer\">supprimer</button></div></td><td>---</td><td>---</td><td>tranchant</td><td>---</td><td>0%</td><td>---</td><td>---</td>";
    return row;
}

function row_append(index){
    let row = row_build();
    row.getElementsByClassName("supprimer")[0].addEventListener(onclick, function(){
        parentNodeNiv(this,3).remove();
    });
    row.getElementsByClassName("amelioration")[0].addEventListener(onclick, function(){
        parentNodeNiv(this,5).insertRow(parentNodeNiv(this, 3).index + 1).innerHTML = row_append(index+1);
    })
    //console.log(row);
    return row;
}

ArrayAmelioration = document.getElementsByClassName("amelioration")

for (let i = 0; i < ArrayAmelioration.length; i++) {
    ArrayAmelioration[i].onclick = function(){
        let index = parentNodeNiv(this, 3).rowIndex;
        //console.log(parentNodeNiv(this, 3))
        console.log(parentNodeNiv(this, 3));
        //parentNodeNiv(this, 3).
        parentNodeNiv(this, 5).insertRow(index + 1).innerHTML = row_append(index + 1);
    };
}

ArraySuppr = document.getElementsByClassName("supprimer")

for (let i = 0; i < ArraySuppr.length; i++){
    ArraySuppr[i].onclick = function(){
        parentNodeNiv(this, 3).remove()
    }
}

/*
let btnA = document.createElement("button");
btnA.value = "amelioration";
btnA.classList = "btn_leger amelioration";
btnA.addEventListener(onclick, function(){

});
console.log(btnA);
*/

/*
function tableaux_armes(nom){
    <tr class="titre"><td colspan="8">
        <td><h1>nom</h1></td>
    </tr>
    <tr class="caracteristiques">
        <td>Rareté et arborescence</td>
        <td>Nom</td>
        <td>Dégâts</td>
        <td>Tranchant</td>
        <td>Attribut</td>
        <td>Affinité</td>
        <td>Fentes</td>
        <td>Bonus</td>
    </tr>
}
*/
