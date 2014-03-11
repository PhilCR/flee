import System.IO;

var musicName : GUIText;
var mFolder = "/Music/";
var filePaths : String[];
var audioSrc : AudioSource;

function Start() {
    
    var localPath : String;
    localPath = Application.dataPath;
    localPath =	localPath.Replace("/Alpha.app/Contents","");
    localPath =	localPath.Replace("/Assets","");
    
    Debug.Log("Local App Path: " + localPath);
    
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
    	Debug.LogError("Null filePath on getting musics from fodler");
    	return;
    }
    
    if (!audioSrc.isPlaying)
    	ChooseMusic(Mathf.FloorToInt(Random.Range(0,filePaths.Length)));
}

function ChooseMusic (idx : int){
	var www = new WWW( "file://" + filePaths[idx]);
    var clip : AudioClip = www.audioClip;
    
    musicName.guiText.text = www.audioClip.name;
    while(!clip.isReadyToPlay){
    	yield 2;
    }
    
    audioSrc.clip = clip;
    audioSrc.Play(); 
}
