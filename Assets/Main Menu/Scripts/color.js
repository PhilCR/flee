#pragma strict
var num = 0;
var act = 0;
var axisPress= false;

function Update () {

if (Input.GetAxis("Vertical")==0)
	axisPress = false;

if ((Input.GetAxis("Vertical")<= -0.4 && axisPress == false) || Input.GetKeyDown(KeyCode.DownArrow)
	|| Input.GetButtonDown("RightMac") || Input.GetKeyDown(KeyCode.RightArrow)){
	if (act==3)
		act=1;
	else
		act++;
	axisPress = true;
}
	 
if ((Input.GetAxis("Vertical")>= 0.4 && axisPress == false) || Input.GetKeyDown(KeyCode.UpArrow) 
	|| Input.GetButtonDown("LeftMac")  || Input.GetKeyDown(KeyCode.LeftArrow)){
	if (act==1)
		act=3;
	else
		act--;
	axisPress = true;
}

if(Input.GetButtonDown("AMac") || Input.GetButtonDown("APC") 
	|| Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.KeypadEnter) 
	|| Input.GetKeyDown(KeyCode.Space)){
	if(act==1)
		Application.LoadLevel("RiotMenu");
	else if(act==2)
		Application.LoadLevel("Credits");
	else
		Application.Quit();
}


if(num == act)
	renderer.material.color=Color.red;
else
	renderer.material.color=Color.white;

}