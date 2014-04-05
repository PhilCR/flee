#pragma strict

var curLane : int;
var positionLane : float;
var horizontal : boolean = false;
var horizontalPC : boolean = false;
var horizontalMac : boolean = false;
var systemMac : boolean = false;

function Start () {
	
	if (Application.platform == RuntimePlatform.WindowsPlayer || Application.platform == RuntimePlatform.WindowsWebPlayer || Application.platform == RuntimePlatform.WindowsEditor){
		systemMac = false;
	}else{
		systemMac = true;

	}

	curLane = 3;
	
	switch (curLane){
		case 1:
			positionLane = -3.7;
			break;
		case 2:
			positionLane = -1.2;
			break;
		case 3:
			positionLane = 1.2;
			break;
		case 4:
			positionLane = 3.7;
			break;
	}
	
	var endPos : Vector3 = Vector3(positionLane, transform.localPosition.y, transform.localPosition.z);
	for( var i : int = 0; i < 100; i++){
		transform.localPosition = Vector3.Lerp(transform.localPosition, endPos , 0.35);	
	}
}

function Update () {

	if( Time.timeScale == 1 ){

		if (Input.GetAxisRaw("Horizontal") <= 0.4 && Input.GetAxisRaw("Horizontal")>= -0.4)
			horizontal = false;
			
		if (Input.GetAxisRaw("HorizontalRMac") <= 0.4 && Input.GetAxisRaw("HorizontalRMac")>=-0.4)
			horizontalMac = false;
			
		if (Input.GetAxisRaw("HorizontalPC") <= 0.4 && Input.GetAxisRaw("HorizontalPC") >= -0.4 && Input.GetAxisRaw("HorizontalRPC") == 0)
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
		}
			switch (curLane){
			case 1:
				positionLane = -3.7;
				break;
			case 2:
				positionLane = -1.2;
				break;
			case 3:
				positionLane = 1.2;
				break;
			case 4:
				positionLane = 3.7;
				break;
		}
			
		var endPos : Vector3 = Vector3(positionLane, transform.localPosition.y, transform.localPosition.z);
		transform.localPosition = Vector3.Lerp(transform.localPosition, endPos , 0.35);	
	}

}

function goRight(){
	if (curLane < 4){
		curLane++;
	}
}

function goLeft(){
	if (curLane > 1){
		curLane--;
	}
}