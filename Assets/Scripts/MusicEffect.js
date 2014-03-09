#pragma strict

var partGameObject : GameObject[];

/*function Update () {

	var spectrum : float[] = audioSrc.GetSpectrumData (audioSrc.clip.samples, 0, FFTWindow.BlackmanHarris);

	var idx = 0;

	for (var part : GameObject in partGameObject){

		if(spectrum[idx]*800 >= 50)
			part.GetComponent(ParticleSystem).emissionRate = spectrum[idx]*100;
		else
			part.GetComponent(ParticleSystem).emissionRate = 2;

		idx+=20;
	}

}*/