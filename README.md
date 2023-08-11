# Pain-Portraits
By Annabella Riley | Minimum vital server provided by Hyung-Chul Lee (vital@snu.ac.kr)

> Please download nodejs server (LTS version) from https://nodejs.org<br> 
> In the folder containing `minimum_vitalserver.js` run `npm install`<br> 

### To run tsParticle animations seeded with my pre-recorded vital data,
  > execute `node minimum_vitalserver.js`<br> 

### To seed animations with your own live data in real-time,
  > download VitalRecorder at https://vitaldb.net/vital-recorder/<br> 
  > set up a hardware connection with your patient monitor<br> 
  > execute `node minimum_vitalserver.js`<br> 
  > allow access when the warning pops up<br> 
  > add `SERVER_IP=127.0.0.1:3000` to `vr.conf`<br> 
  > run VitalRecorder app and add your device<br> 
  > open the browser and connect to `http://localhost:3000`<br> 

note: this was built specifically to use live PLETH, HR, PLETH_SPO2 and PLETH_HR data recorded from a B40 patient monitor using an SPO2 clip.<br> 
note: minor changes might be needed to run with alternative monitors and data sources.
