#pragma strict

var audioSrc : AudioSource;
var color : int;

function Start () {
	color = Random.Range(0,3);
	switch (color){
		case 0: //Red
			light.color = Color.red;
			break;
			
		case 1: //Green
			light.color = Color.green;
			break;
			
		case 2: //Blue
			light.color = Color.blue;
			break;
			
		case 3: //Yellow
			light.color = Color.yellow;
			break;
	}
}

function Update () {
	var sample : float[];
	sample = audioSrc.GetSpectrumData(64, 0, FFTWindow.BlackmanHarris);
	light.intensity = sample[color*2] * 500;
}