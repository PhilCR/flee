var scoreGUI : GUIText;
var scoreIni : int = 0;
var scoreLim : int = 500;
 
function Update(){
	scoreGUI.text = "Score: " + scoreIni;
	
	if (scoreIni < scoreLim){
		scoreIni += 10;	
	}
}