#pragma strict

var audioFX : AudioSource;
var hitSFX : AudioClip;
var safeSFX : AudioClip;
var isHit : boolean = false; 

function Start () {
	
}

function Update () {

}

function OnTriggerEnter(col:Collider){
	if (col.tag == "Player"){
		isHit = true;
	}
}