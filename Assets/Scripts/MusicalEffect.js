import System.IO;

//Just to control the music
var idx = 0;
var mName : String;
var mFolder = "/Music/";
var filePaths : String[];

var platform : GameObject;
var goal : GameObject;
var speed = 2;
var audioSrc : AudioSource;

function Start() {
    
    var localPath : String;
    localPath = Application.dataPath;
    localPath =	localPath.Replace("/Alpha.app/Contents","");
    localPath =	localPath.Replace("/Assets","");
    
    if (Application.platform == RuntimePlatform.WindowsPlayer)

		
    if (Application.platform == RuntimePlatform.OSXEditor)
    	localPath =	localPath.Replace("/Assets","");
    
    if (Application.platform == RuntimePlatform.WindowsEditor)
    	localPath =	localPath.Replace("/Assets","");
    
    filePaths = Directory.GetFiles(localPath + mFolder,"*.ogg");
    
    if (filePaths == null){
    	Debug.LogError("Null filePath on getting musics from fodler");
    	return;
    }
    
    PlayMusic(idx);
     
}

function PlayMusic (idx){
	var www = new WWW( "file://" + filePaths[idx]);
    var clip : AudioClip = www.audioClip;
    
    mName = clip.name;
    while(!clip.isReadyToPlay){
    	yield 2;
    }
    
    audioSrc.Stop();
    audioSrc.clip = clip;
    audioSrc.Play(); 
    
    var i;
	var nPlatforms = audioSrc.clip.length / speed;
	
	for (i = 1; i < nPlatforms-1; i++){
		Instantiate (platform, Vector3(-1.2, 0, i * 50), Quaternion.identity);
	}
	
	//goal.transform.Translate(Vector3(0,-3,i*50));
}
