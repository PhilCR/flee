function Start(){
	guiText.pixelOffset.x = Screen.width*0.9;
	guiText.pixelOffset.x = Screen.height*0.09;
	InvokeRepeating("EachSecond",1.0,1.0);
}
 
var score: int = 0;
var addscore = 7;
 
function EachSecond(){
	score = score + addscore;
}
 
function OnGUI(){
	guiText.text = "Score: " + score.ToString();
}