#pragma strict

var obstacles : GameObject[];

var audioSrc : AudioSource;
var spectrumL : float[];
var spectrumR : float[];

var timeLimit : float = 10f;

static var timer : int = 20;
var timerCount : int;

var playerObject : GameObject;

function Start () {
	timerCount = timer;
}

function Update () {
	if( audioSrc.isPlaying ){
		if( audioSrc.time + timeLimit < audioSrc.clip.length ){
			if (timerCount-- == 0){
				CreateObstacle();
				timerCount = timer;
			}
		}
	}
}

function CreateObstacle(){

	spectrumL = audioSrc.GetSpectrumData(1024, 0, FFTWindow.BlackmanHarris);
	spectrumR = audioSrc.GetSpectrumData(1024, 1, FFTWindow.BlackmanHarris);

	var lane1L = spectrumL[5];
	var lane2L = spectrumL[11] + spectrumL[12] + spectrumL[13] + spectrumL[14];
	var lane3L = spectrumL[22] + spectrumL[23] + spectrumL[24] + spectrumL[25] + spectrumL[26];
	var lane4L = spectrumL[46] + spectrumL[47] + spectrumL[48] + spectrumL[49] + spectrumL[50]+ spectrumR[51];

	var lane1R = spectrumR[5];
	var lane2R = spectrumR[11] + spectrumR[12] + spectrumR[13] + spectrumR[14];
	var lane3R = spectrumR[22] + spectrumR[23] + spectrumR[24] + spectrumR[25] + spectrumR[26];
	var lane4R = spectrumR[46] + spectrumR[47] + spectrumR[48] + spectrumR[49] + spectrumR[50] + spectrumR[51];

	switch ( Mathf.Max( Mathf.Max(lane1L,lane2L), Mathf.Max(lane3L,lane4L) ) ){
		case lane1L:
				switch ( Mathf.Max( Mathf.Max(lane2R,lane2R), Mathf.Max(lane3R,lane4R) ) ){
					case lane2R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-3.7, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-1.2, 0, transform.position.z), Quaternion.identity);
						break;
					case lane3R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-3.7, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(1.2, 0, transform.position.z), Quaternion.identity);
						break;
					case lane4R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-3.7, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(3.7, 0, transform.position.z), Quaternion.identity);
						break;
				}	
			break;
			
		case lane2L:
				switch ( Mathf.Max( Mathf.Max(lane1R,lane1R), Mathf.Max(lane3R,lane4R) ) ){
					case lane1R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-1.2, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-3.7, 0, transform.position.z), Quaternion.identity);
						break;
					case lane3R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-1.2, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(1.2, 0, transform.position.z), Quaternion.identity);
						break;
					case lane4R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-1.2, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(3.7, 0, transform.position.z), Quaternion.identity);
						break;
				}	
			break;
				
		case lane3L:
				switch ( Mathf.Max( Mathf.Max(lane1R,lane2R), Mathf.Max(lane4R,lane4R) ) ){
					case lane1R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(1.2, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-3.7, 0, transform.position.z), Quaternion.identity);
						break;
					case lane2R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(1.2, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-1.2, 0, transform.position.z), Quaternion.identity);
						break;
					case lane4R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(1.2, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(3.7, 0, transform.position.z), Quaternion.identity);
						break;
				}	
			break;
			
		case lane4L:
				switch ( Mathf.Max( Mathf.Max(lane1R,lane2R), Mathf.Max(lane3R,lane3R) ) ){
					case lane1R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(3.7, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-3.7, 0, transform.position.z), Quaternion.identity);
						break;
					case lane2R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(3.7, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-1.2, 0, transform.position.z), Quaternion.identity);
						break;
					case lane3R:
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(3.7, 0, transform.position.z), Quaternion.identity);
						Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(1.2, 0, transform.position.z), Quaternion.identity);
						break;
				}	
			break;
	}
	
	var playerScript : Speed = playerObject.GetComponent("Speed");
	if ( playerScript.fowardSpeed > 45 ){
		switch ( Mathf.Min( Mathf.Min(lane1R,lane2R), Mathf.Min(lane3R,lane4R) ) ){
			case lane1R:
				Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-3.7, 0, transform.position.z), Quaternion.identity);
				break;
			case lane2R:
				Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(-1.2, 0, transform.position.z), Quaternion.identity);
				break;
			case lane3R:
				Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(1.2, 0, transform.position.z), Quaternion.identity);
				break;
			case lane4R:
				Instantiate (obstacles[(Random.Range(0,obstacles.Length-1))], Vector3(3.7, 0, transform.position.z), Quaternion.identity);
				break;
		}	
	}
}