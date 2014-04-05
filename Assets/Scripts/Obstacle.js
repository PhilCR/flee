#pragma strict

var audioFX : AudioSource;
var hitSFX : AudioClip;
var hitValue: int;

var animos : Animator;

var playerObject : GameObject;

function OnTriggerEnter(col:Collider){
	
	if (col.tag == "Player"){
		audioFX.PlayOneShot(hitSFX,0.2);
		transform.Rotate(90,0,0);
		animos.Play("Recover");
		
		var playerScript : Speed = playerObject.GetComponent("Speed");
		
		if (playerScript.score - hitValue < 0)
			playerScript.score = 0;
		else
			playerScript.score -= hitValue;
		
		if (playerScript.fowardSpeed - 10 < 10)
			playerScript.fowardSpeed = 10;
		else
			playerScript.fowardSpeed -= 10;
			
		yield WaitForSeconds(0.5);
		
		Destroy(gameObject);
	}
}