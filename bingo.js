let images = [];
const container = document.getElementById("container");
const setup = document.getElementById("setup");
const reset = document.getElementById("reset");
const share = document.getElementById("share");
const gridView = document.getElementById("gridView");
const codeBox = document.getElementById("codeBox");

function generateGrid() 
{
  setup.style = "display:none";
  gridView.style = "visibility:visible;";
  container.innerHTML="";	
  if(oneRow.checked)
  {
  	//Grab 1 image
    getImages(1);
    makeRows(1,1);
	container.style.setProperty('max-width', "66px");
  }
  
	else if(threeRow.checked)
  {
  	//Grab 9 images
	getImages(9);
  	makeRows(3,3);
	container.style.setProperty('max-width', "196px");
  }
  else
  {
  	//Grab 25 images
    getImages(25);
  	makeRows(5,5);
	container.style.setProperty('max-width', "326px");
  }
}

function makeRows(rows, cols) 
{
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) 
  {
    let cell = document.createElement("img");
    //Set center cell to FREE
    if(c == 12)
    {
    	cell.src = "./img/free.png";
		cell.id = "cell" + c;
		cell.addEventListener("click", cellClick);
    }
    else
    {
		cell.src = "./img/" + images[c] + ".png";
		cell.id = "cell" + c;
		cell.addEventListener("click", cellClick);
    }
    container.appendChild(cell).className = "grid-item";
  }
}

document.getElementById("banner").onclick = function() 
{
	if(document.getElementById("banner1").style.display == "block")
  {
    document.getElementById("banner1").style.display = "none";
    document.getElementById("banner2").style.display = "block";
  }
  else
  {
  	document.getElementById("banner1").style.display = "block";
    document.getElementById("banner2").style.display = "none";
  }
}

function cellClick()
{
	let fileNameArray = this.src.split("/");
	let imgName = fileNameArray.pop();
	let containingDirectory = fileNameArray.pop();
	
	//Once this is being hosted somewhere, the index chosen will need to be adapted
	if(containingDirectory == "img")
	{
		this.src = "./imgX/" + imgName;
	}
	else
	{
		this.src = "./img/" + imgName;
	}
}

function getImages(numImages)
{
  let randNum;
  let newImage;
  let notUsed = Array.from({length: 24}, (x, i) => i);
  let notUsedLength = notUsed.length;
  images.length = 0;
  
	for(let i = 0; i < numImages; i++)
  {
    newImage = notUsed[getRandomInt(notUsedLength)];
    images.push(newImage);
    notUsed.splice(notUsed.indexOf(newImage),1);
    notUsedLength--;
  }
  
  //Take FREE space entry, place at end.
  if(numImages == 25)
  {
  	console.log("entered");
  	images[24] = images[12];
  }
}

function resetSetup()
{
  container.innerHTML="";
  setup.style.display="block";
  gridView.style.display="none";
}

function shareCard()
{
	codeBox.value= "";
	codeBox.value= images.toString();
}

function useCode()
{
	images.length = 0;
	if(codeBox.value != "")
	{
		if(codeBox.value.includes(","))
		{
			images = codeBox.value.split(",");
		}
		else if(!codeBox.value.includes(" "))
		{
			images.push(codeBox.value);
		}
		if(images.length == 1 || images.length == 9 || images.length == 25)
		{
		  setup.style = "display:none";
		  gridView.style = "visibility:visible;";
		  container.innerHTML="";
			if(images.length == 1)
			{
					makeRows(1,1);
					container.style.setProperty('max-width', "66px");
			}
			else if(images.length == 9)
			{
				makeRows(3,3);
				container.style.setProperty('max-width', "196px");
			}
			else if(images.length == 25)
			{
				makeRows(5,5);
				container.style.setProperty('max-width', "326px");
			}
		}
	}
}

function getRandomInt(max) 
{
  return Math.floor(Math.random() * max);
}