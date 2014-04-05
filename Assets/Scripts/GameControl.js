#pragma strict

var isPause = false;
var audioSrc : AudioSource;
var systemPause : String;

var optionMenu : int = 0;
var bgPause : GUITexture;
var resumePause : GUITexture;
var restartPause : GUITexture;
var quitPause : GUITexture;

var horizontal : boolean = false;
var horizontalPC : boolean = false;
var horizontalMac : boolean = false;
var systemMac : boolean = false;

function Start(){
	if (Application.platform == RuntimePlatform.WindowsPlayer || Application.platform == RuntimePlatform.WindowsWebPlayer || Application.platform == RuntimePlatform.WindowsEditor){
		systemMac = false;
		systemPause = "PausePC";
	}else{
		systemMac = true;
		systemPause = "PauseMac";
	}

}

function Update(){
	if (Input.GetButtonDown("Pause") || Input.GetButtonDown(systemPause) ){
		isPause = !isPause;
	
		if(isPause){
			audioSrc.Pause();
			Time.timeScale = 0;
		}else{
			Time.timeScale = 1;
			audioSrc.Play();
	    }
	}
	if(isPause){
		TheMenu();
		if (Input.GetAxisRaw("Horizontal") == 0)
			horizontal = false;
			
		if (Input.GetAxisRaw("HorizontalRMac") == 0)
			horizontalMac = false;
			
		if (Input.GetAxisRaw("HorizontalPC") == 0 && Input.GetAxisRaw("HorizontalRPC") == 0)
			horizontalPC = false;
			
		//For Keyboard
		if (Input.GetKeyDown (KeyCode.RightArrow) || (Input.GetAxisRaw("Horizontal") > 0.5) && horizontal == false){
			goRight();
			horizontal = true;
		}
		
		if (Input.GetKeyDown (KeyCode.LeftArrow) || Input.GetAxis("Horizontal") < -0.5 && horizontal == false){
			goLeft();
			horizontal = true;
		}
		
		
		if ( systemMac == true ){
			//For Mac XBox Controller
			if (Input.GetButtonDown("RightMac")){
				goRight();
			}
			
			if (Input.GetButtonDown("LeftMac")){
				goLeft();
			}
			
			if (Input.GetAxis("HorizontalRMac") > 0.5 && horizontalMac == false){
				goRight();
				horizontalMac = true;
			}
			
			if (Input.GetAxis("HorizontalRMac") < -0.5 && horizontalMac == false){
				goLeft();
				horizontalMac = true;
			}
			
			if( Input.GetButtonDown("AMac") ){
				switch (optionMenu){
					case 0 :
						Time.timeScale = 1;
						isPause = false;
						audioSrc.Play();
						break;
					
					case 1 :
						Application.LoadLevel(Application.loadedLevelName);
						break;
						
					case 2 :
						Application.LoadLevel("Main Menu");
						break;
				
				}
			}
		
		}else{
			//For PC XBox Controller
			if (Input.GetAxis("HorizontalPC") > 0.5 && horizontalPC == false){
				goRight();
				horizontalPC = true;
			}
			
			if (Input.GetAxis("HorizontalPC") < -0.5 && horizontalPC == false){
				goLeft();
				horizontalPC = true;
			}
			
			if (Input.GetAxis("HorizontalRPC") > 0.5 && horizontalPC == false){
				goRight();
				horizontalPC = true;
			}
			
			if (Input.GetAxis("HorizontalRPC") < -0.5 && horizontalPC == false){
				goLeft();
				horizontalPC = true;
			}
			
			if( Input.GetButtonDown("APC") ){
				switch (optionMenu){
					case 0 :
						isPause = !isPause;
						break;
					
					case 1 :
						Time.timeScale = 1;
						Application.LoadLevel(Application.loadedLevel);
						break;
						
					case 2 :
						Time.timeScale = 1;
						Application.LoadLevel("Main Menu");
						break;
				
				}
			}
		}
			
	}else{
		NotTheMenu();
	}
}
 
function TheMenu() {
	bgPause.enabled = true;
	if (optionMenu == 0){
		resumePause.enabled = true;
		restartPause.enabled = false;
		quitPause.enabled = false;
	}
	if (optionMenu == 1){
		resumePause.enabled = false;
		restartPause.enabled = true;
		quitPause.enabled = false;
	}
	if (optionMenu == 2){
		resumePause.enabled = false;
		restartPause.enabled = false;
		quitPause.enabled = true;
	}
}

function NotTheMenu() {
	bgPause.enabled = false;
	resumePause.enabled = false;
	restartPause.enabled = false;
	quitPause.enabled = false;
}

function goRight(){
	if (optionMenu < 2){
		optionMenu++;
	}
}

function goLeft(){
	if (optionMenu > 0){
		optionMenu--;
	}
}