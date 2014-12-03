# attendance

Sails Application


#How to use

Clone the repo 
Install dependancies 
Lift the app
Add details using APIs

```
git clone https://github.com/pranavrajs/sensomate-attendance.git
cd sensomate-attendance
sudo npm install
```

Lift the app

Add sample data
```
localhost:1337/employee/create?name=Pranav&email=pranav@maangalabs.com&desig=Consultant&empid=1234&uid=EM-1234&phone=9446284490
```

Add attendance data through API

```
localhost:1337/attendance/pushtodb
```

using POST parameters 

- uid : NFC scan ID
- capturedAt: timestamp (NFC Scan Time)
- deviceid: Device from which data is scanned

Attendance wraps up model association with Employee through `emp_entry` attribute which is generated automatically by the system by searching it with UID



