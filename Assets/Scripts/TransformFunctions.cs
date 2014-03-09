using UnityEngine;
using System.Collections;

public class TransformFunctions : MonoBehaviour
{
	public float moveSpeed = 0f;
	public float turnSpeed = 50f;
	public GameObject objectPlayer;
	
	void Update ()
	{
		transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);

		moveSpeed += (0.2f* Time.deltaTime) ;

		if (Input.GetKeyDown (KeyCode.C))
			objectPlayer.transform.localScale = new Vector3 (0.5f,0.25f, 0.5f);

		if (Input.GetKeyUp (KeyCode.C))
			objectPlayer.transform.localScale = new Vector3 (0.5f,0.5f, 0.5f);
			//transform.localScale = new Vector3 (1, Random.Range(1,6), 1);
			//transform.localScale += new Vector3(0, 0.1F, 0);


		if(Input.GetKey(KeyCode.LeftArrow))
			objectPlayer.transform.Translate(-Vector3.right * 2f * Time.deltaTime);
		
		if(Input.GetKey(KeyCode.RightArrow))
			objectPlayer.transform.Translate(Vector3.right * 2f * Time.deltaTime);

		if(Input.GetKeyDown(KeyCode.Space))
			objectPlayer.rigidbody.AddForce (Vector3.up * 250 );

	}
}