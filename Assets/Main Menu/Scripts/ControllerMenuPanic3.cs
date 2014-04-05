using UnityEngine;
using System.Collections;

public class ControllerMenuPanic3 : MonoBehaviour {
	
	public int prev = 1;
	public int next = 2;
	bool button = false;
	
	// Use this for initialization
	
	// Update is called once per frame
	void Update () {
		
		if (Input.GetAxis ("Horizontal") == 0)
			button = true;
		
		if (Input.GetButtonDown("Fire1"))
			Application.LoadLevel("Riot");
		
		if (Input.GetButtonDown ("Fire2")) {
			Application.LoadLevel ("Main Menu");
			Debug.Log("lol");
		}
		
		if (Input.GetAxis("Horizontal")> 0.6 && button)
			Application.LoadLevel("LetItGo");
		
		if (Input.GetAxis("Horizontal")< -0.6 && button)
			Application.LoadLevel("Zombi");
	}
}
