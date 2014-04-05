#pragma strict

var jumpForce : float = 250f;
var sideSpeed : float = 7f;
var player : GameObject;
//var Horizontal : float;

function Update () {

	if (Input.GetKey (KeyCode.LeftArrow) || Input.GetAxis("Horizontal") < -0.2){
		if (player.transform.localPosition.x < -4f){
			player.transform.localPosition.Set (-4f, player.transform.localPosition.y, player.transform.localPosition.z);
		}else{
			player.transform.Translate (-Vector3.right * sideSpeed * Time.deltaTime);
		}
	}
	
	if (Input.GetKey (KeyCode.RightArrow) || Input.GetAxis("Horizontal") > 0.2 ){
		if (player.transform.localPosition.x > 4f){
			player.transform.localPosition.Set (4f, player.transform.localPosition.y, player.transform.localPosition.z);
		}else{
			player.transform.Translate (Vector3.right * sideSpeed * Time.deltaTime);
		}	
	}

	if (player.transform.localPosition.x < -4f){
		player.transform.localPosition.Set (-4f, player.transform.localPosition.y, player.transform.localPosition.z);
	}
	
	if (player.transform.localPosition.x > 4f){
		player.transform.localPosition.Set (4f, player.transform.localPosition.y, player.transform.localPosition.z);
	}
	
}