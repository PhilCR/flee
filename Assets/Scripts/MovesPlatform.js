#pragma strict

var fowardSpeed : float = 25f;
	
function Update (){
	transform.Translate (Vector3.forward * fowardSpeed * Time.deltaTime);
}