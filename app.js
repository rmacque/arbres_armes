function draw_ligne_verticale(element){
    let ctx = element.getContext('2d');
    ctx.fillRect(0, 0, 5, 30);
    ctx.fillStyle = 'black';
}

function draw_angledroit(element){
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

ArrayAmelioration = document.getElementsByClassName("amelioration")

for (let i = 0; i < ArrayAmelioration.length; i++) {
    ArrayAmelioration[i].onclick = function(){
        console.log(parentNodeNiv(this, 3))
        parentNodeNiv(this, 5).insertRow(parentNodeNiv(this, 3).rowIndex + 1).insertCell(0).innerHTML = "blala"
    };
}

ArraySuppr = document.getElementsByClassName("supprimer")

for (let i = 0; i < ArraySuppr.length; i++){
    ArraySuppr[i].onclick = function(){
        parentNodeNiv(this, 3).remove()
    }
}

function row_build(index){
    let tr = document.createElement("tr");
    let tabTD = []
    for(let i = 0; i<8; i++){
        tabTD[i] = document.createElement("td");
    }

    console.log(tabTD[0]);
    return tr;
}

function row_append(){

}


row_build();
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