#pragma strict

var jumpForce : float = 250f;
var sideSpeed : float = 7f;
var player : GameObject;

function Update () {

	if (Input.GetKeyDown (KeyCode.C)){
		player.transform.localScale = new Vector3 (1f, 0.5f, 1f);
	}
	
	if (Input.GetKeyUp (KeyCode.C)){
		player.transform.localScale = new Vector3 (1f, 1f, 1f);
	}
	
	if (Input.GetKey (KeyCode.LeftArrow)){
		if (player.transform.localPosition.x < -4f){
			player.transform.localPosition.Set (-4f, player.transform.localPosition.y, player.transform.localPosition.z);
		}else{
			player.transform.Translate (-Vector3.right * sideSpeed * Time.deltaTime);
		}
	}
	
	if (Input.GetKey (KeyCode.RightArrow)){
		if (player.transform.localPosition.x > 4f){
			player.transform.localPosition.Set (4f, player.transform.localPosition.y, player.transform.localPosition.z);
		}else{
			player.transform.Translate (Vector3.right * sideSpeed * Time.deltaTime);
		}	
	}
	
	if (Input.GetKeyDown (KeyCode.Space)) {
		if (player.transform.localPosition.y < 0){
			player.rigidbody.AddForce (Vector3.up * jumpForce);
		}
	}

	if (player.transform.localPosition.x < -4f){
		player.transform.localPosition.Set (-4f, player.transform.localPosition.y, player.transform.localPosition.z);
	}
	
	if (player.transform.localPosition.x > 4f){
		player.transform.localPosition.Set (4f, player.transform.localPosition.y, player.transform.localPosition.z);
	}
	
}