#pragma strict

var audioFX : AudioSource;
var hitSFX : AudioClip;
var safeSFX : AudioClip;
var isHit : boolean = false; 
var scoreGUI : GUIText;
var hitValue: int = 10;

function Start () {
	
}

function Update () {

}

function OnTriggerEnter(col:Collider){
	
	if (col.tag == "Player"){
		isHit = true;
		audioFX.PlayOneShot(hitSFX,	200);
		var curScore = scoreGUI.text;
		curScore = curScore.Replace("Score:","");
		var score : int = parseInt(curScore);
		score -= hitValue;
		scoreGUI.text = "Score: " + score;
	}
}