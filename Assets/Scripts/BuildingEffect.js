#pragma strict

var audioSrc : AudioSource;
var idx : int;
var isRight : boolean;

function Start () {
	renderer.material.color = new Color(Random.value, Random.value, Random.value);
	
	idx = Random.Range(0,64);	
}

function Update () {
	var spectrum : float[];
	
	if (isRight){
		spectrum = audioSrc.GetSpectrumData(128,1, FFTWindow.BlackmanHarris);
	}else{
		spectrum = audioSrc.GetSpectrumData(128,0, FFTWindow.BlackmanHarris);
	}
	
	var newScale = Vector3(transform.localScale.x, Mathf.Clamp(spectrum[idx*2]*800,3,10), transform.localScale.z);
	
	transform.localScale = Vector3.Lerp (transform.localScale, newScale, 10 * Time.deltaTime);
}