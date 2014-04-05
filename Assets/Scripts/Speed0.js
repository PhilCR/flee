#pragma strict
@script ExecuteInEditMode()

var audioSrc : AudioSource;

//speedometer
var texSpeedo : Texture2D ;
var texArrow : Texture2D ;

//score
static var score : float = 0;
var scoreGUI : GUIText;
var multi : float = 1;

//speed vars
var accel : float = 0.04;
static var fowardSpeed : float = 10;
var maxSpeed : float = 60;

//multiplier textures
var multiTex : Texture2D [];
var multiRect : Rect = new Rect(30, 30, Screen.width/10, Screen.width/10);

//speedometer
var angle : float = 0;
var size : Vector2 = new Vector2(2000, 2000);
var pos : Vector2 = new Vector2(0,0);
var rect : Rect;
var pivot : Vector2;


function Start () {
	UpdateSettings();
	
}

function Update () {
		//score add
		if (audioSrc.isPlaying && Time.timeScale == 1)
			score += parseInt((Time.deltaTime*multi*20))*10;

		//Print Score
		scoreGUI.text = "Score: " + (score).ToString("0000000");

		//Speed & multi
		if (fowardSpeed >= 18.3f)
			multi = parseInt((fowardSpeed-10) / 8.3f)*0.5f+1;
		else
			multi = 1;

		//max speed
		if( Time.timeScale == 1 )
			if (fowardSpeed< maxSpeed)
				fowardSpeed += accel;
				
		//go foward
		transform.Translate (Vector3.forward * fowardSpeed * Time.deltaTime);
}

function UpdateSettings(){
		pos = new Vector2 (Screen.width-100, 85 );/*(transform.localPosition.x, transform.localPosition.y);*/
		rect = new Rect(pos.x - size.x * 0.5f, pos.y - size.y * 0.5f, size.x, size.y);
		pivot = new Vector2(rect.xMin + rect.width * 0.5f, rect.yMin + rect.height * 0.5f);

}

function OnGUI(){

		//"ifs" draw multis
		if (multi == 4)
						GUI.DrawTexture(multiRect, multiTex[6]);
				else if (multi >= 3.5)
						GUI.DrawTexture(multiRect, multiTex[5]);
				else if (multi >= 3.0)
						GUI.DrawTexture(multiRect, multiTex[4]);
				else if (multi >= 2.5)
						GUI.DrawTexture(multiRect, multiTex[3]);
				else if (multi >= 2.0)
						GUI.DrawTexture(multiRect, multiTex[2]);
				else if (multi >= 1.5)
						GUI.DrawTexture(multiRect, multiTex[1]);
				else
						GUI.DrawTexture(multiRect, multiTex[0]);
		
		GUI.DrawTexture(rect, texSpeedo);
		
		if (Application.isEditor) { UpdateSettings(); }
		var matrixBackup : Matrix4x4 = GUI.matrix;
		GUIUtility.RotateAroundPivot((fowardSpeed-10)*(270/(maxSpeed-10))/*angle*/, pivot);
		GUI.DrawTexture(rect, texArrow);
		
		GUI.matrix = matrixBackup;

}
