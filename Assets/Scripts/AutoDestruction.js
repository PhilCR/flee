#pragma strict
var player : GameObject;

function Update () {
	if (transform.position.z + 15 < player.transform.position.z){
		Destroy(gameObject);
	}
}