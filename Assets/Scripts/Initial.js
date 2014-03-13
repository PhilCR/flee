import System.IO;
/*
	MusicalEffect Script

With this script is possible to load AudioClips from a external folder mFolder
and play the AudioClip given by the index idx as the audio core and create a
level with such lenght as it has and its obstacles.
*/



/* AudioClip control */
var idx = 0;
var musicName : String;
var mFolder = "/Music/";
var filePaths : String[];

/* Platform Control */
var platform : GameObject; //Level to be replicated
var goal : GameObject;

var audioSrc : AudioSource;

var audioFX : AudioSource;
var fxSounds : AudioClip[];

var isPause = false;

var startGUI : GUITexture[];

var obstacles : GameObject[];
var idxT = 0;
var startObstacles = 20;


function Start(){
	audioSrc.Pause();
	Time.timeScale = 0;
	
    //Gets localPath using a mask due its platform
    var localPath : String;
    localPath = Application.dataPath;
    localPath =	localPath.Replace("/Alpha.app/Contents","");
    
    if (Application.platform == RuntimePlatform.OSXPlayer){
    	Debug.Log("Application Platform: OSX Player");
    }
    
    if (Application.platform == RuntimePlatform.WindowsPlayer){
    	Debug.Log("Application Platform: Windows Player");
    }
		
    if (Application.platform == RuntimePlatform.OSXEditor){
    	Debug.Log("Application Platform: OSX Editor");
    	localPath =	localPath.Replace("/Assets","");
    }	
    
    if (Application.platform == RuntimePlatform.WindowsEditor){
    	Debug.Log("Application Platform: Windows Editor");
    	localPath =	localPath.Replace("/Assets","");
    }
    
    filePaths = Directory.GetFiles(localPath + mFolder,"*.ogg");
    
    if (filePaths == null){
    	Debug.LogError("Null filePath on getting musics from folder");
    	return;
    }
    
    Debug.Log("Local Music Folder Path: " + localPath + mFolder);
    
    //Get music from chosen filePath[idx]
    ChooseMusic(idx);
    
    //Gives enough time to load music
    yield 1;
    
    //Creates level according with AudioClip length
    GenerateLevel();
	
    Time.timeScale = 0;
    
    for (var textureGUI in startGUI){
    	textureGUI.enabled = true;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	yield 100;
    	textureGUI.enabled = false;
    }
    
    
    audioSrc.Play();
    Time.timeScale = 1;
    InvokeRepeating("GenerateObstacles", 0,0.6); 
    
}

function Update(){
	//GenerateObstacles();
}

function ChooseMusic(idx){
	
	var www = new WWW( "file://" + filePaths[idx]);
    var clip : AudioClip = www.audioClip;
    
    musicName = clip.name;
    
    Debug.Log("Gets AudioClip " + clip.name + " from file://" + filePaths[idx]);
    
    while(!clip.isReadyToPlay){
    	Debug.Log("Waiting AudioClip to load");
    	yield 2;
    }
    
    audioSrc.clip = clip;
   	
   	audioFX.clip = fxSounds[0];
   	audioFX.PlayDelayed(clip.length);  
}

function GenerateLevel(){
    var i;
	var nPlatforms = audioSrc.clip.length / 2;	
    
    for (i = 1; i < nPlatforms+4; i++){
        Instantiate (platform, Vector3(-1.2, 0, i * 50), Quaternion.identity);
    }
}

function GenerateObstacles(){
/*
Notes:
.Axis-X coordinates constraints :
	for Obstacle size 2 -> -3.7 to 3.7
						l1 -3.65
						l2 -1.26
						l3 1.1
						l4 3.56
	
	for Obstacle size 4 -> -2.7 to 2.7

.Frequencies:
spectrum 0 = 0 - 21
	lane1 -> 64Hz
	lane2 -> 256Hz
	lane3 -> 512Hz
	lane4 -> 1024Hz

*/
	idxT++;
	if (audioSrc.isPlaying){
		var spectrum : float[];
		spectrumL = audioSrc.GetSpectrumData(1024, 0, FFTWindow.BlackmanHarris);
		spectrumR = audioSrc.GetSpectrumData(1024, 1, FFTWindow.BlackmanHarris);
		
		var lane1L = spectrumL[4] + spectrumL[5];
		var lane2L = spectrumL[10] + spectrumL[11] + spectrumL[12] + spectrumL[13] + spectrumL[14];
		var lane3L = spectrumL[22] + spectrumL[23] + spectrumL[24] + spectrumL[25] + spectrumL[26];
		var lane4L = spectrumL[46] + spectrumL[47] + spectrumL[48] + spectrumL[49] + spectrumL[50];
		
		var lane1R = spectrumR[3] + spectrumR[4] + spectrumR[5];
		var lane2R = spectrumR[10] + spectrumR[11] + spectrumR[12] + spectrumR[13] + spectrumR[14];
		var lane3R = spectrumR[22] + spectrumR[23] + spectrumR[24] + spectrumR[25] + spectrumR[26];
		var lane4R = spectrumR[46] + spectrumR[47] + spectrumR[48] + spectrumR[49] + spectrumR[50];
		
		switch ( Mathf.Max( Mathf.Max(lane1L,lane2L), Mathf.Max(lane3L,lane4L) ) ){
			case lane1L:
				if (lane1L < lane1R){
					//Double Obstacle!!
					Instantiate (obstacles[1], Vector3(-3.65, 0, startObstacles + idxT*20), Quaternion.identity);
					Instantiate (obstacles[1], Vector3(Random.Range(-1.26, 3.7), 0, startObstacles + idxT*20), Quaternion.identity);
				}else{
					//Single Obstacle
					switch(Random.Range(0, obstacles.Length)){
						case 0:
							//Double-sized obstacle
							Instantiate (obstacles[0], Vector3(-3.65, 0, startObstacles + idxT*20), Quaternion.identity);
							break;
						
						default:
							Instantiate (obstacles[Random.Range(1, obstacles.Length)], Vector3(-3.65, 0, startObstacles + idxT*20), Quaternion.identity);
							break;
					}
				}
				break;
			
			case lane2L:
				if (lane2L < lane2R){
					//Double Obstacle!!
					Instantiate (obstacles[1], Vector3(-1.26, 0, startObstacles+ idxT*20), Quaternion.identity);
					Instantiate (obstacles[1], Vector3(Random.Range(1.1, 3.7), 0, startObstacles+ idxT*20), Quaternion.identity);
				}else{
					//Single Obstacle
					switch(Random.Range(0, obstacles.Length)){
						case 0:
							//Double-sized obstacle
							Instantiate (obstacles[0], Vector3(-1.26, 0, startObstacles+ idxT*20), Quaternion.identity);
							break;
						
						default:
							Instantiate (obstacles[Random.Range(1, obstacles.Length)], Vector3(-1.26, 0, startObstacles + idxT*20), Quaternion.identity);
							break;
					}
				}
				
				break;
				
			case lane3L:
				if (lane3L < lane3R){
					//Double Obstacle!!
					Instantiate (obstacles[1], Vector3(1.1, 0, startObstacles + idxT*20), Quaternion.identity);
					
					
					Instantiate (obstacles[1], Vector3(-1.26, 0, startObstacles + idxT*20), Quaternion.identity);
				}else{
					//Single Obstacle
					switch(Random.Range(0, obstacles.Length)){
						case 0:
							//Double-sized obstacle
							Instantiate (obstacles[0], Vector3(1.1, 0, startObstacles + idxT*20), Quaternion.identity);
							break;
						
						default:
							Instantiate (obstacles[Random.Range(1, obstacles.Length)], Vector3(1.1, 0, startObstacles + idxT*20), Quaternion.identity);
							break;
					}
				}
				
				break;
				
			case lane4L:
				if (lane4L < lane4R){
					//Double Obstacle!!
					Instantiate (obstacles[1], Vector3(3.56, 0, startObstacles + idxT*20), Quaternion.identity);
					Instantiate (obstacles[1], Vector3(Random.Range(-3.65,-1.26), 0, startObstacles + idxT*20), Quaternion.identity);
				}else{
					//Single Obstacle
					switch(Random.Range(0, obstacles.Length)){
						case 0:
							//Double-sized obstacle
							Instantiate (obstacles[0], Vector3(3.56, 0, startObstacles + idxT*20), Quaternion.identity);
							break;
						
						default:
							Instantiate (obstacles[Random.Range(1, obstacles.Length)], Vector3(3.56, 0, startObstacles + idxT*20), Quaternion.identity);
							break;
					}
				}
				
				break;
		
		}
	}
}