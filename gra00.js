const board = document.querySelector(".game00");
board_width = board.offsetWidth;;
board_height = board.offsetHeight;
div_size_width = board_width/3; 	
div_size_height = board_height/3;
const menuBtn = document.querySelector(".button_game00");
menuBtn.addEventListener("click", () => Game.gameMenu());


const Game = {	
	div_tile : [],
	on_tile : null,
	win : false,
	ai : false,
	aiLevel : 0,
	turn : "o",
	
	
	gameMenu()
	{
		board.innerHTML = "";
		board.style.border = "solid";
		const goodAiBtn = document.createElement("button");
		goodAiBtn.classList.add("button_game00");
		goodAiBtn.textContent = "Dla singla";
			goodAiBtn.addEventListener("click", () => {
			Game.gameStart(true, 1)
			});
		board.appendChild(goodAiBtn);
		
		const hotseatBtn = document.createElement("button");
		hotseatBtn.classList.add("button_game00");
		hotseatBtn.textContent = "Dla dwójki";
			hotseatBtn.addEventListener("click", () => {
			Game.gameStart(false, 0)
			});
		board.appendChild(hotseatBtn);
		
	},
	
	
	gameStart(ai, aiLevel)
	{
		Game.ai = ai;
		Game.aiLevel = aiLevel;
		board.innerHTML = "";
		board.style.border = "none";
		div_tile = [];
		win = false;
		Game.turn = "o";
		
		for(let i=0;i<=2;i++)
		{
			for(let j=0;j<=2;j++)
			{
			const temp_tile =  document.createElement("div");
			temp_tile.classList.add("div_tile");
			board.appendChild(temp_tile);	
			temp_tile.div_id = j+(i*3);
			temp_tile.grantedElement = "";
			div_tile.push(temp_tile);
			temp_tile.addEventListener("click", function(e) {
			if(this.grantedElement == "" && win == false)
			{
			Game.SetDivElement(this, Game.turn);
			Game.Update();
				if(Game.ai==false)
				{
					if(Game.turn == "x")
					{
						Game.turn = "o";
					}
					else
					{
						Game.turn = "x";
					}
				}
			}
			});
		
			
			}		
		}
},

SetDivElement(_obj, _text)
{
	const til = document.createElement("p");
	til.textContent = _text;
	_obj.appendChild(til);
	_obj.grantedElement = _text;
},

Update()
{
	Game.CheckWin();
	if(Game.ai== true)
	{
		if(Game.aiLevel == 0)
		{
			Game.BadMove();
		}
		else if(Game.aiLevel == 1)
		{
			Game.GoodMove();
		}
	}
	
},

BadMove()
{
	if(win==false)
	{
	var t = 5;
	test = false;
	while(t>0)
	{
		var temp = Math.floor(Math.random() * 8); 
		if(div_tile[temp].grantedElement == "") 
		{
			Game.SetDivElement(div_tile[temp], "x");
			test = true;
			break;
		}
		t--;
	}
	if(test == false) 
	{
		for(let i=0;i<9;i++)
		{
			if(div_tile[i].grantedElement == "") 
			{
				Game.SetDivElement(div_tile[i], "x");
				break;
			}
		}
	}
	Game.CheckWin();
	}
},

GoodMove()
{
			let test = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]];
			let getCheck = false;
			//priorytet srodek
			if(win==false)
			{
			if(div_tile[4].grantedElement == "") 
			{
				Game.SetDivElement(div_tile[4], "x");
			}
			else
			{
				//priorytet atak
				for(let i=0;i<8;i++)
						{
						counter =0;
						free = -1;
						for(let j=0;j<=2;j++)
						{
							if(div_tile[test[i][j]].grantedElement == "x")
							{
								counter++;	
								
							}
							else if(div_tile[test[i][j]].grantedElement == "")
							{
								free = test[i][j];
							}
						}
						if(counter == 2)
						{
							if(free != -1)
							{
								Game.SetDivElement(div_tile[free], "x");
								getCheck = true;
								break;
							}						
						}
				
				}
				//koniec ataku
				if(!getCheck)
				{
					//obrona
				for(let i=0;i<8;i++)
				{
						counter =0;
						free = -1;
						for(let j=0;j<=2;j++)
						{
							if(div_tile[test[i][j]].grantedElement == "o")
							{
								counter++;	
								
							}
							else if(div_tile[test[i][j]].grantedElement == "")
							{
								free = test[i][j];
							}
						}
						if(counter == 2)
						{
							if(free != -1)
							{
								Game.SetDivElement(div_tile[free], "x");
								getCheck = true;
								break;
							}
						}
				}
				}
				// nic
				if(!getCheck)
				{
					Game.BadMove();
				}
				
			}
			
			if(getCheck)
			{
			Game.CheckWin();
			}
			}
},

CheckWin()
{
	//8 testow
	let test = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]];
	for(let i = 0;i<8;i++)
	{
		if(div_tile[test[i][0]].grantedElement == "o" && div_tile[test[i][1]].grantedElement == "o" && div_tile[test[i][2]].grantedElement == "o") 
		{
			div_tile[test[i][0]].style.background = "red";
			div_tile[test[i][1]].style.background = "red";
			div_tile[test[i][2]].style.background = "red";
			console.log("wygrywa gracz 1");	
			alert("wygrywa gracz 1");
			win=true;
		}
		
		if(div_tile[test[i][0]].grantedElement == "x" && div_tile[test[i][1]].grantedElement == "x" && div_tile[test[i][2]].grantedElement == "x") 
		{  
			div_tile[test[i][0]].style.background = "red";
			div_tile[test[i][1]].style.background = "red";
			div_tile[test[i][2]].style.background = "red";
			if(Game.ai == true)
			{
			console.log("wygrywa przeciwnik");
			alert("wygrywa przeciwnik");
			}
			else
			{
			console.log("wygrywa gracz 2");	
			alert("wygrywa gracz 2");
			}
			win=true;
		}
		
	}	
}


}

Game.gameMenu();


