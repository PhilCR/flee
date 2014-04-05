#pragma strict

var guiEnd : GUITexture;
var guiHigh : GUITexture;
var guiScore : GUIText;
var boolEnd : boolean = false;
var score : GUIText;

var audioSrc : AudioSource;
var audioFX : AudioSource;
var crowd : AudioClip;

var playerObject : GameObject;

function Update () {
		
	if ( audioSrc.time >= audioSrc.clip.length || boolEnd == true){
		boolEnd = true;
		audioSrc.Pause();
		
		audioFX.clip = crowd;
		audioFX.Play();
		guiEnd.enabled = true;
		guiScore.enabled = true;
		
		var playerScript : Speed = playerObject.GetComponent("Speed");
		var scoreF : float = playerScript.score;
		guiScore.text = scoreF.ToString("0000")+"0";
		
		if ( PlayerPrefs.HasKey(Application.loadedLevelName) ){
			if ( PlayerPrefs.GetInt(Application.loadedLevelName) < scoreF ){
				PlayerPrefs.SetInt(Application.loadedLevelName, scoreF);
				guiHigh.enabled = true;
			}
		}else{
			PlayerPrefs.SetInt(Application.loadedLevelName, scoreF);
			guiHigh.enabled = true;
		}
		
		PlayerPrefs.Save();
			
		if (Input.GetButtonDown("AMac") || Input.GetButtonDown("APC") || Input.GetKeyDown(KeyCode.A)){
			Application.LoadLevel("Main Menu");
			Time.timeScale = 1;
		}										
	}

}