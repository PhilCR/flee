using UnityEngine;
using System.Collections;

public class Frozen5 : MonoBehaviour {
	
	public int prev = 1;
	public int next = 2;
	bool button = false;
	
	// Use this for initialization
	
	// Update is called once per frame
	void Update () {
		
		if (Input.GetAxis ("Horizontal") == 0)
			button = true;
		
		if (Input.GetButtonDown("AMac") || Input.GetButtonDown("APC"))
			Application.LoadLevel("Frozen");
		
		if (Input.GetButtonDown ("BMac") || Input.GetButtonDown("BPC")) {
			Application.LoadLevel ("Main Menu");
		}
		
		if (( Input.GetAxis("Horizontal")> 0.6 && button) || Input.GetButtonDown("RightMac"))
			Application.LoadLevel("KatyPerryMenu");
		
		if ((Input.GetAxis("Horizontal")< -0.6 && button) || Input.GetButtonDown("LeftMac"))
			Application.LoadLevel("QueenMenu");
	}
}
