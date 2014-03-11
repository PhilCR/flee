import System.IO;
/*
	MusicalEffect Script

With this script is possible to load AudioClips from a external folder mFolder
and play the AudioClip given by the index idx as the audio core and create a
level with such lenght as it has.
*/



/* AudioClip control */
var idx = 0;
var musicName : String;
var mFolder = "/Music/";
var filePaths : String[];

//
var player : GameObject;

/* Platform Control */
var platform : GameObject; //Level to be replicated
var goal : GameObject;

var audioSrc : AudioSource;

var audioFX : AudioSource;
var fxSounds : AudioClip[];

function Start(){

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
    yield 2;
    
    //Creates level according with AudioClip length
    GenerateLevel();
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
    
    audioSrc.Stop();
    audioSrc.clip = clip;
    audioSrc.Play();
   	
   	audioFX.clip = fxSounds[0];
   	audioFX.PlayDelayed(clip.length);   
}

function GenerateLevel(){
    var i;
    var nPlatforms = audioSrc.clip.length / 2;
    	
	    for (i = 1; i < nPlatforms+4; i++){
	        Instantiate (platform, Vector3(-1.2, 0, i * 50), Quaternion.identity);
	    }
    
    //goal.transform.Translate(Vector3(0,-3,i*50));
}
