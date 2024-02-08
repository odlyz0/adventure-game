document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//game window reference 
const gameWindow = document.getElementById("gameWindow");

//Main character 
const mainCharacter = document.getElementById("maincharacter");
const offsetCharacter = 16
const door1 = document.getElementById("door1")
const sign = document.getElementById("sign")

gameWindow.onclick= function(e){
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y= e.clientY - rect.top;
 
    switch(e.target.id){
        case "door1":
           mainCharacter.style.backgroundColor ="#FFF00"
        e.target.style.opacity= 0.4;
        break;

        default:
        //explode
        mainCharacter.style.backgroundColor ="#rgb(162, 207, 0);"
        door1.style.opacity= 0.8;
        break;

    }
    switch(e.target.id){
        case "sign":
        mainCharacter.style.backgroundColor ="#FFF00"
        e.target.style.opacity= 0.4;
        break;

        default:
        //explode
        mainCharacter.style.backgroundColor ="#rgb(162, 207, 0);"
        sign.style.opacity= 0.8;
        break;

    }
    console.log(e.clientX - rect.left);
    console.log(e.target.id);
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top= y - offsetCharacter +"px";
   
}