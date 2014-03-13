#pragma strict

var audioSrc : AudioSource;
var idx : int;
var isRight : boolean;

function Start () {
	
	idx = 2 * Random.Range(0,512);	
}

function Update () {
	
	var spectrum : float[];
	spectrum = audioSrc.GetSpectrumData(1024,1, FFTWindow.BlackmanHarris);
	
	var newScale = Vector3(transform.localScale.x, transform.localScale.y, Mathf.Clamp(spectrum[idx],2,6));
	
	transform.localScale = Vector3.Lerp (transform.localScale, newScale, 10 * Time.deltaTime);
}