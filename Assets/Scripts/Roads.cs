/*private LinkedList<Transform> roads = new LinkedList<Transform>();

// Update is called once per frame
public void Update () {
        
        Transform firstRoad = roads.First.Value;
        Transform lastRoad = roads.Last.Value;
        
        // Create a new road if the first one is not 
        // in sight anymore and destroy the first one
        if(firstRoad.localPosition.z < -15f) {
                        roads.Remove(firstRoad);
                Destroy(firstRoad.gameObject);
                
                Transform newRoad = Instantiate(prefab, new Vector3(0, posY ,
                        lastRoad.localPosition.z + lastRoad.localScale.z), 
                        Quaternion.identity) as Transform;
                        roads.AddLast(newRoad);
                        
        }
                
        // Move the available roads along the z-axis
        foreach(Transform road in roads) {
                road.Translate(0,0, -8f * Time.deltaTime);      
        }
                
}
*/