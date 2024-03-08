document.getElementById("mainTitle").innerText = "ESCAPE!";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Game state
gameState = {
    "door2locked": true,
    "door3locked": true,
    "door4locked": true,

    "inventory": [
    ]
}



const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("mainCharacter");
const offsetCharacter = 16;

//speech bubbles
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const counterSpeech = document.getElementById("counterSpeech");
const counterAvatarImg = document.getElementById("counterAvatarImg");
const mcAudio = document.getElementById("mcAudio");
const cAudio = document.getElementById("cAudio");
//Inventory
const inventoryBox = document.getElementById("inventoryBox"); //div
const inventoryList = document.getElementById("inventoryList"); //ul

//Foreground Items
const door1 = document.getElementById("door1");


const sign = document.getElementById("sign");


gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if (e.target.id !== "mcImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    console.log(e.target.id);

    function changeBackgroundImage(imagePath) {
        const backgroundImage = document.getElementById("backgroundImage");
        const mainCharacter = document.getElementById("mainCharacter");
        if (backgroundImage) {
            backgroundImage.style.opacity = 0;
            backgroundImage.src = imagePath;
            setTimeout(function () {
                backgroundImage.style.opacity = 1;
            }, 1000);
            
            
        }
    }
    switch (e.target.id) {

        case "door1":
            sign.style.opacity = 1;
            if (document.getElementById("key1") !== null) {
                console.log('Found key!');
                document.getElementById("key1").remove();
                changeInventory('key', 'add');
            }

            break;

            case "bone":
                sign.style.opacity = 1;
                if (document.getElementById("bone") !== null) {
                    console.log('Found bone!');
                    document.getElementById("bone").remove();
                    changeInventory('bone', 'add');
                }
                break;
               
                case "door2":
                    if (gameState.door2locked == true) {
                        // check if we have key
                        if (document.getElementById("inv-key") !== null) {
                            // yes -> unlock door?
                            gameState.door2locked = false;
                            changeInventory('key', 'delete');
                            console.log('Door unlocked!');
                            
                            // Changes the background when the door unlocks
                            changeBackgroundImage("assets/img/project2.png");
                                
                        } else {
                            // no -> alert 'door locked'
                            alert("Door is locked!");
                        }
                    } else {
                        console.log('enter building');
                    }
                    break;

                    case "chest2":
                        sign.style.opacity = 1;
                        if (document.getElementById("key2") !== null) {
                            console.log('Found key!');
                            document.getElementById("key2").remove();
                            changeInventory('rusty key', 'add');
                        }
                        break;
                        
                        

                    case "door3":
                    if (gameState.door3locked == true) {
                        // check if we have key
                        if (document.getElementById("inv-rusty key") !== null) {
                            // yes -> unlock door?
                            gameState.door3locked = false;
                            changeInventory('rusty key', 'delete');
                            console.log('Door unlocked!');
                            
                        
                        } else {
                            // no -> alert 'door locked'
                            alert("Door is locked!");
                        }
                    } else {
                        console.log('enter building');
                    }
                    break;
                    case "chest3":
                        sign.style.opacity = 1;
                        if (document.getElementById("key3") !== null) {
                            console.log('Found key!');
                            document.getElementById("key3").remove();
                            changeInventory('Golden key', 'add');
                        }
            
                        break;
                    case "door4":
                    if (gameState.door4locked == true) {
                        // check if we have key
                        if (document.getElementById("inv-Golden key") !== null) {
                            // yes -> unlock door?
                            gameState.door4locked = false;
                            changeInventory('Golden key', 'delete');
                            console.log('Door unlocked!');
                            
                        
                        } else {
                            // no -> alert 'door locked'
                            alert("Door is locked!");
                        }
                    } else {
                        console.log('enter building');
                    }
                    break;

                    case "start":
                        showMessage(mainCharacterSpeech, mcAudio, "Where the hell am I?! i need to get out as fast as possible");
                        
                        break;

        case "statue":
            showMessage(mainCharacterSpeech, mcAudio, "Wow another skull i wonder who it was..");
            setTimeout(function () { counterAvatarImg.style.opacity = 1; }, 4 * sec);
            setTimeout(showMessage, 4 * sec, counterSpeech, cAudio, "I'm alive ya know!");
            setTimeout(showMessage, 8 * sec, mainCharacterSpeech, mcAudio, "WHAT?! how am I supposed to know, a skull usually means your dead.");
            setTimeout(showMessage, 12 * sec, counterSpeech, cAudio, "What ever. if you want to escape check the chest in the other room..");
            setTimeout(function () { counterAvatarImg.style.opacity = 0; }, 16 * sec);
            break;
            case "statue2":
            showMessage(mainCharacterSpeech, mcAudio, "Damn how many people died here..");
            
            break;
            case "staircase1":
                showMessage(mainCharacterSpeech, mcAudio, "I should probably try to find my way out not go deeper..");
                
                break;
            
    


          
        default:
            //explode


            sign.style.opacity = 1;
            break;

    }

}

/**
 * function to change inventory
 * @param {string} itemName 
 * @param {string} action "add", "delete"
 * @returns 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.log('wrong parameters given to changeInventory()');
        return
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break
        case 'delete':
            gameState.inventory.find(function (item, index) {
                if (item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1) {
                        gameState.inventory.splice(index, 1);
                    }
                }
            })
            break

        default:
            break;
    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * update inventoryList
 * @param {Array} inventory array of items 
 * @param {HTMLElement} inventoryList html <ul> element 
 */
function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = "inv-" + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * Shows a message in a speech bubble
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 * @param {string} message 
 */
function showMessage(targetBalloon, targetSound, message) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerText = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

/**
 * Set the opacity to 0
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
}