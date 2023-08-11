# Pain-Portraits by Annabella Riley
# Minimum vital server implementation provided by Hyung-Chul Lee (vital@snu.ac.kr)

Please download nodejs server (LTS version) from https://nodejs.org
In the folder containing minimum_vitalserver.js, run "npm install"
-----------------------------------------------------------------------
To run tsParticle animations seeded with my pre-recorded vital data,
  execute "node minimum_vitalserver.js"
-----------------------------------------------------------------------
To seed animations with your own live data in real-time,
  download VitalRecorder at https://vitaldb.net/vital-recorder/
  set up a hardware connection with your patient monitor
  execute "node minimum_vitalserver.js"
  allow access when the warning pops up
  add "SERVER_IP=127.0.0.1:3000" to vr.conf
  run VitalRecorder and add your device
  open the browser and connect to "http://localhost:3000"

note: this was built specifically to use live PLETH, HR, PLETH_SPO2 and PLETH_HR data recorded from a B40 patient monitor using an SPO2 clip. 
note: minor changes might be needed to run with alternative monitors and data sources.
