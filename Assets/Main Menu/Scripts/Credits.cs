using UnityEngine;
using System.Collections;

public class Credits : MonoBehaviour {
	
	public int prev = 1;
	public int next = 2;
	bool button = false;
	
	// Use this for initialization
	
	// Update is called once per frame
	void Update () {
		

		if (Input.GetButtonDown ("BMac") || Input.GetButtonDown ("BPC")) {
			Application.LoadLevel ("Main Menu");
		}
	
	}
}