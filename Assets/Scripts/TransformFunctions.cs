using UnityEngine;
using System.Collections;

public class TransformFunctions : MonoBehaviour
{
	public float moveSpeed = 15f;
	public GameObject objectPlayer;
	
	void Update ()
	{
		transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);

//		moveSpeed += (0.2f* Time.deltaTime) ;

		if (Input.GetKeyDown (KeyCode.C))
			objectPlayer.transform.localScale = new Vector3 (1f,0.5f, 1f);

		if (Input.GetKeyUp (KeyCode.C))
			objectPlayer.transform.localScale = new Vector3 (1f, 1f, 1f);

		if(Input.GetKey(KeyCode.LeftArrow))
			objectPlayer.transform.Translate(-Vector3.right * 3.5f * Time.deltaTime);
		
		if(Input.GetKey(KeyCode.RightArrow))
			objectPlayer.transform.Translate(Vector3.right * 3.5f * Time.deltaTime);

		if(Input.GetKeyDown(KeyCode.Space))
			objectPlayer.rigidbody.AddForce (Vector3.up * 250 );

	}
}