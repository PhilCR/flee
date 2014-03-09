public var bpm : double = 140.0;
public var gain : float = 0.5f;
public var signatureHi : int = 4;
public var signatureLo : int = 4;
private var nextTick : double = 0.0;
private var amp : float = 0.0f;
private var phase : float = 0.0f;
private var sampleRate : double = 0.0;
private var accent : int;
private var running : boolean = false;


function Start(){
	accent = signatureHi;
    var startTick = AudioSettings.dspTime;
    sampleRate = AudioSettings.outputSampleRate;
    nextTick = startTick * sampleRate;
    running = true;
}


function OnAudioFilterRead(data:float[], channels:int){
    if(!running)
        return;
    var samplesPerTick = sampleRate * (60.0f / bpm) * (4.0 / signatureLo);
    var sample = AudioSettings.dspTime * sampleRate;
    var dataLen = data.length / channels;
    for(var n = 0; n < dataLen; n++)
    {
        var x : float = gain * amp * Mathf.Sin(phase);
        for(var i = 0; i < channels; i++)
            data[n * channels + i] += x;
        while (sample + n >= nextTick)
        {
            nextTick += samplesPerTick;
            amp = 1.0;
            if(++accent > signatureHi)
            {
                accent = 1;
                amp *= 2.0;
            }
            Debug.Log("Tick: " + accent + "/" + signatureHi);
        }
        phase += amp * 0.3;
        amp *= 0.993;
    }
}