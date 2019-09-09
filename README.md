*NEIU MeetUp Documentation*

**Background**

Northeastern Illinois University (NEIU) is a Chicago Public University with a total student enrollment of nearly 8000 students. Currently, students aren&#39;t able to easily locate information about school activities or events. While events are advertised on the school email (NMail) and bulletin boards, many students overlook these sources. A mobile application will help keep students up to date with an easy-to-use interface that displays current events on-campus.

The goal is to encourage new students and old students to become more active on-campus.

**Vision**

The NEIU MeetUp mobile application will allow students to easily access information about current school activities and events. Students will be able to scroll through current events and login to RSVP to any events that interest them. The login process will be simplified by utilizing school credentials to gain access to the application. A main feature of this app will be a school map that displays the current number of students at events to encourage students to engage and drop-by. The help keep some sort of privacy, the map will not display the exact location of students, but just a heatmap of the concentration of students. Students will have the option to share their own location on the school map.

**Major Features**

- User Login that allows students to login with school user credentials
- Add, Delete, Update, and Modify records of student locations
- Add, Delete, Update, and Modify records of school events
- Students will be able to RSVP to events and share their location
- School Map that shows real-time concentration of students currently engaged in school activities

**Planned Features**

- Social aspect that allows students to share and create school events
- Social aspect that allows students to share which events they are participating in
- Interactable Map that allows students to find nearby events
- Notify students of their preferred set of school activities
- Add off-main-campus sites to school map such as El Centro









**Project Description**

On-line heat map that represents the congregation of Northeastern Illinois University students throughout campus and the near-by facilities. The student, through Smartphone, may share her/his location (e.g., using GPS, using campus descriptive labels) along with his/her preferences (e.g., searching for certain music event) as an HTTP connection request to our server. Based on the aggregate data collected through incoming requests from students, database population density on our server is updated for specific coordinates and preferences.

Dynamic representation of population density depends on the continuous connection between the individual users and the server that is measured through a finite lapse of time in which the database will verify current connections, update accordingly, and ultimately reflect the data onto the heat map.

**Organization**

Project implementation involved its division into two parts, the Front-end and backend side. The server side involved the development of a functioning server through the combination of programming techniques (javascript programming language, express framework, and NodeJS run-time environment) and schema-less database technologies (MongoDB database and mongoose javascript library facilitated the management of dynamic data). The client side development involved the use of HTML markup language and the bootstrap framework to present the webpage elements that constructed the heat map.

**Server**

| File | Function |
| --- | --- |
| Index | Utilizes Node.js and Express to route users. Listens for incoming requests and sends back a response |
| HeatmapUpdater | Updates table based on data in MongoDB data into frontend |





**Database**

We used MongoDB, a schema-less database to store map coordinates and their corresponding count which, represented the number of individuals at a particular location. Mongoose, a library used to translate information between our run-time environment and our database was used conjunction with MongoDB to to facilitate object representation between NodeJS and MongoDB. The stored information in MongoDB was then retrieved and used to represent the data onto the heat map . NodeJS, a javascript run-time environment was used to develop our server which, listened for incoming requests and reacted accordingly by returning a corresponding response based on the request to the client.

**Mobile Application**

 The client side involved the development of an Android-based application (that resides the student&#39;s smartphone), where using such application - the client creates an initial connection with the server and sends a request that involved (e.g., current location, user&#39;s profile and preferences, ....)
