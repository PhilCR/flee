#pragma strict

var audioSrc : AudioSource;
var particleS : GameObject[];

function Update () {

	var spectrum : float[] = audioSrc.GetSpectrumData (audioSrc.clip.samples, 0, FFTWindow.BlackmanHarris);
	

	for (var part : GameObject in particleS){
		var idx = Random.Range(0, audioSrc.clip.samples/5);
	
		if(spectrum[idx*5]*200 >= 5)
			part.GetComponent(ParticleSystem).emissionRate = spectrum[idx*5]*200;
		else
			part.GetComponent(ParticleSystem).emissionRate = 5;
		
	}
}