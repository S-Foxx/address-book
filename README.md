# AngularJS Address Book (iOS Compatible)

This is an AngularJS 1.8.2 address book demo.  
It loads contacts from `ab.xml` and shows them in a table or card view.

---

## How to Run

1. Put all files in the same folder:
index.html
app.js
ab.xml


2. Open a terminal in that folder and start a tiny web server:

**Python 3 (built-in)**
```bash
python3 -m http.server 8080

## Or NodeJs Server

npm install -g http-server
http-server -p 8080

## PHP

php -S localhost:8080

open your browser and go to:
http://localhost:8080

The page will load ab.xml and display the contacts.
Use the buttons to switch between Table view and Business card view.

## iOS

Make sure your computer is on the same network as your iOS device and test locally in the following way:

1. Run the server as above.
2. Enter the address of your workstation as follows: http://<your-computer-ip>:8080/

You should see the app displayed on the phone as a browser page.

