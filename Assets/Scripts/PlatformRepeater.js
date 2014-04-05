#pragma strict

var platforms : GameObject[];
var nextPlatform : int = 0;
var interaction : int = 8;

var audioSrc : AudioSource;

var playerPosition : Transform;

var timeLimit : int = 7;

function Start() {
	interaction = platforms.Length;
}

function Update () {

	if ( audioSrc.isPlaying ){
	
		if( audioSrc.time + timeLimit < audioSrc.clip.length ){
		
			if(playerPosition.position.z > platforms[nextPlatform].transform.position.z + 75){
				platforms[nextPlatform].transform.position.z = interaction * 50;
				interaction++;
				nextPlatform++;
				if (nextPlatform == platforms.Length) nextPlatform = 0;
			}
			
		}
	}
}