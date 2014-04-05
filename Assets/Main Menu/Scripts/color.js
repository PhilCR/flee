#pragma strict
var num = 0;
var act = 0;
var buttonPress= false;

function Update () {

if (Input.GetAxis("Vertical")==0)
	buttonPress = false;

if (Input.GetAxis("Vertical")<= -0.4 && buttonPress == false){
	if (act==3)
		act=1;
	else
		act++;
	buttonPress = true;
}
	 
if (Input.GetAxis("Vertical")>= 0.4 && buttonPress == false){
	if (act==1)
		act=3;
	else
		act--;
	buttonPress = true;
}

if (Input.GetButtonDown("RightMac")){
	if (act==3)
		act=1;
	else
		act++;
	buttonPress = true;
}
			
if (Input.GetButtonDown("LeftMac")){
	if (act==1)
		act=3;
	else
		act--;
	buttonPress = true;
}

if(Input.GetButtonDown("AMac") || Input.GetButtonDown("APC"))
{
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