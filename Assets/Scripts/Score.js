var scoreGUI : GUIText;
var scoreIni : int = 0;
var scoreLim : int = 500;
var scoreInc : int = 1;

function Start(){
	scoreGUI.text = "Score: " +scoreIni;
}
 
function Update(){
	if (Time.timeScale == 1)
		if (scoreIni < scoreLim){
			var curScore = scoreGUI.text;
			curScore = curScore.Replace("Score:","");
			var score : int = parseInt(curScore);
			score += scoreInc;
			scoreGUI.text = "Score: " + score;
		}
}