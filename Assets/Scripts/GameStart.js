#pragma strict
/* AudioClip control */
var musicName : GUIText;

var audioSrc : AudioSource;

var audioFX : AudioSource;
var fxSounds : AudioClip[];

var startGUI : GUITexture[];

var animCon : Animator;
var playerObject : GameObject;

function Start(){
	audioSrc.Pause();
	var playerScript : Speed = playerObject.GetComponent("Speed");
	playerScript.score = 0;
	playerScript.fowardSpeed = 10;
	
	Time.timeScale = 1;
	
	if (Time.timeScale == 1){
		audioSrc.Play();
		
		animCon.SetBool('Running',false);
		
		
	    //Get music from chosen filePath[idx]
	//    ChooseMusic(PlayerPrefs.GetString("chosenMusic"));
	    
	    animCon.SetBool('Running',true);
	    
	    audioFX.clip = fxSounds[0];
		audioFX.pitch = 1;
		audioFX.PlayDelayed(1);
	     
	    startGUI[0].enabled = true;
	    musicName.enabled = true;
	    musicName.text = audioSrc.clip.name;
	    yield WaitForSeconds(2);
		startGUI[0].enabled = false;
		
		
		audioFX.clip = fxSounds[1];
		audioFX.pitch = 0.5;
		audioFX.Play();
		
		startGUI[1].enabled = true;
		yield WaitForSeconds(2);
		startGUI[1].enabled = false;
		
		startGUI[2].enabled = true;
		yield WaitForSeconds(2);
		startGUI[2].enabled = false;
		
		startGUI[3].enabled = true;
		yield WaitForSeconds(2);
		startGUI[3].enabled = false;
		
		startGUI[4].enabled = true;

		musicName.enabled = false;
		yield WaitForSeconds(3);
		startGUI[4].enabled = false;
		audioFX.pitch = 1;
	}

}

function Update(){

}