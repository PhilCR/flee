#pragma strict

var audioSrc : AudioSource;

function Start () {
	
	renderer.material.color = new Color(Random.value, Random.value, Random.value);

}

function Update () {
	
	var spectrum : float[] = audioSrc.GetSpectrumData(64, 0, FFTWindow.BlackmanHarris);
	var idx = Random.Range(0,64);
	
	
}