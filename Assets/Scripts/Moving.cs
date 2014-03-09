using UnityEngine;
using System.Collections;

public class Moving : MonoBehaviour
{
	public float moveSpeed = 15f;
	public float jumpForce = 200f;
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
			if (objectPlayer.transform.localPosition.x < -4.5f)
				objectPlayer.transform.localPosition.Set(-4.5f, objectPlayer.transform.localPosition.y, objectPlayer.transform.localPosition.z);
			else
				objectPlayer.transform.Translate(-Vector3.right * 3.5f * Time.deltaTime);
		
		if(Input.GetKey(KeyCode.RightArrow))
			if (objectPlayer.transform.localPosition.x > 4.5f)
				objectPlayer.transform.localPosition.Set(4.5f, objectPlayer.transform.localPosition.y, objectPlayer.transform.localPosition.z);
			else
				objectPlayer.transform.Translate(Vector3.right * 3.5f * Time.deltaTime);

		if (Input.GetKeyDown (KeyCode.Space) ) {
			objectPlayer.rigidbody.AddForce (Vector3.up * jumpForce);
		}
			
		if (objectPlayer.transform.localPosition.x < -4.5f)
			objectPlayer.transform.localPosition.Set(-4.5f, objectPlayer.transform.localPosition.y, objectPlayer.transform.localPosition.z);

		if (objectPlayer.transform.localPosition.x > 4.5f)
			objectPlayer.transform.localPosition.Set(4.5f, objectPlayer.transform.localPosition.y, objectPlayer.transform.localPosition.z);


	}
}