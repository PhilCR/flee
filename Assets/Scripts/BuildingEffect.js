#pragma strict

var audioSrc : AudioSource;
var cube : GameObject;

function Start () {
	renderer.material.color = new Color(Random.value, Random.value, Random.value);
}

function Update () {
	var spectrum = audioSrc.GetSpectrumData(64,0, FFTWindow.BlackmanHarris);
	var idx = Random.Range(0,64);
	
	transform.localScale.y = Mathf.Clamp(spectrum[idx]*800,3,10);
}