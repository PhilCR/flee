#pragma strict

var fowardSpeed : float = 25f;
	
function Update (){
	if (Time.timeScale == 1){
		if (fowardSpeed< 40f)
			fowardSpeed += 0.01f;
			transform.Translate (Vector3.forward * fowardSpeed * Time.deltaTime);
		}
}