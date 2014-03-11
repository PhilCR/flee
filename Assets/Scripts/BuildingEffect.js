#pragma strict

var audioSrc : AudioSource;
var idx : int;

function Start () {
	renderer.material.color = new Color(Random.value, Random.value, Random.value);
	
	idx = Random.Range(0,64);	
}

function Update () {
	var spectrum = audioSrc.GetSpectrumData(128,0, FFTWindow.BlackmanHarris);
	var newScale = Vector3(transform.localScale.x, Mathf.Clamp(spectrum[idx*2]*800,3,10), transform.localScale.z);
	
	transform.localScale = Vector3.Lerp (transform.localScale, newScale, 10 * Time.deltaTime);
}