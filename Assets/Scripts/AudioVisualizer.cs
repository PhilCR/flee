using UnityEngine;
using System.Collections;


public class AudioVisualizer : MonoBehaviour{
	//tales test var
	public float inc = 0f;
	//An AudioSource object so the music can be played
	public AudioSource aSource;
	//A float array that stores the audio samples
	public float[] samples = new float[256];
	//A renderer that will draw a line at the screen
	private LineRenderer lRenderer;
	//A reference to the cube prefab
	public GameObject cube;
	//The transform attached to this game object
	private Transform goTransform;
	//The position of the current cube. Will also be the position of each point of the line.
	private Vector3 cubePos;
	//An array that stores the Transforms of all instantiated cubes
	private Transform[] cubesTransform;
	//The velocity that the cubes will drop
	private Vector3 gravity = new Vector3(0.0f,0.25f,0.0f);

	private Vector3 test;
	
	void Awake (){
		//Get and store a reference to the following attached components:
		//LineRenderer
		this.lRenderer = GetComponent<LineRenderer>();
		//Transform
		this.goTransform = GetComponent<Transform>();
	}
	
	void Start()
	{
		//The line should have the same number of points as the number of samples
		lRenderer.SetVertexCount(samples.Length);
		//The cubesTransform array should be initialized with the same length as the samples array
		cubesTransform = new Transform[samples.Length];
		//Center the audio visualization line at the X axis, according to the samples array length
		goTransform.position = new Vector3(goTransform.position.x -samples.Length,goTransform.position.y,goTransform.position.z);
		//goTransform.localScale = new Vector3 (1, 2, 1);
		//goTransform.rot

		
		//Create a temporary GameObject, that will serve as a reference to the most recent cloned cube
		GameObject tempCube;
		
		//For each sample
		for(int i=0; i<samples.Length/2;i++)
		{
			//Instantiate a cube placing it at the right side of the previous one
			tempCube = (GameObject) Instantiate(cube, new Vector3(goTransform.position.x + i*3, goTransform.position.y, goTransform.position.z),Quaternion.identity);
			//Get the recently instantiated cube Transform component
			cubesTransform[i] = tempCube.GetComponent<Transform>();
			//Make the cube a child of this game object
			cubesTransform[i].parent = goTransform;
			cubesTransform[i].Rotate(inc, 0 , 30f);
			tempCube.renderer.material.color = new Color(Random.value, Random.value, Random.value);
			
		}
	}
	
	void Update ()
	{

		//Obtain the samples from the frequency bands of the attached AudioSource
		aSource.GetSpectrumData(this.samples,0,FFTWindow.BlackmanHarris);
		
		//For each sample

		for(int i=0; i<samples.Length;i++/*i = i+2*/)
		{
			/*Set the cubePos Vector3 to the same value as the position of the corresponding
			 * cube. However, set it's Y element according to the current sample.*/
			//cubePos.Set(cubesTransform[i].position.x, Mathf.Clamp(samples[i]*(25+i*i),0,25), cubesTransform[i].position.z);
			//cubePos.Scale(new Vector3(1, Mathf.Clamp(samples[i]*(50+i*i),0,50), 1));
			test.Set(2, Mathf.Clamp(samples[i]*(15+i*i),1,15)+3,2);

			cube.renderer.material.color = new Color(Random.value, Random.value, Random.value);

			//If the new cubePos.y is greater than the current cube position
			if(test.y >= cubesTransform[i].localScale.y)
			{
				//Set the cube to the new Y position
				//cubesTransform[i].position = cubePos;
				cubesTransform[i].localScale = test;
			}
			else if (cubesTransform[i].localScale.y > 2)
			{
				//The spectrum line is below the cube, make it fall
				//cubesTransform[i].position -= gravity;

				//if(test.y>1)
				cubesTransform[i].localScale -= gravity;
				//cubesTransform[i].localScale += 1;
			}
			
			/*Set the position of each vertex of the line based on the cube position.
			 * Since this method only takes absolute World space positions, it has
			 * been subtracted by the current game object position.*/
			lRenderer.SetPosition(i, cubePos - goTransform.position);
		}
	}
}