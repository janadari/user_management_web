```User Management Web ~~~
A simple user management system built as a test project.



Setup Instructions:
_____________________________________________________________

1.Clone this repository:
git clone https://github.com/janadari/user_management_web.git

2.Open the project in VS Code (or your preferred editor).

3.Install dependencies:
npm install

4.Start the server:
npm start




Assumptions and Notes:
_____________________________________________________________

Since this is a test project,


* Username and password fields include hints for easier identification.

* Pagination or infinite scroll is not implemented as the user list is assumed to be small.

* Only the GET API is available to fetch results, so the user list updates only in memory after adding or editing users.

* Data is not persisted (not saved to async storage), so changes will be lost upon refresh.

* New users are assigned an ID using the current timestamp.

* Search functionality works with first name and last name only.

* Existing users show images from their image URLs; newly added users get a default image.

* Dark mode is enabled by default (personal preference).

* Responsive design: the same layout is used for both mobile and tablet views.



How to Test/Run:
_____________________________________________________________

1.Follow the setup instructions above.

2.Use the provided username and password to sign in.

3.You’ll see a list of users and available filters.

4.Use the FAB in the bottom-right corner to add a new user.


To test mobile responsiveness:

1.Right-click on the webpage and select Inspect.

2.Click the device toolbar icon in the top-left corner of the DevTools panel.

3.Choose a mobile device or set custom dimensions.




you can see the demo here

https://user-management-web-kohl.vercel.app/login



<!-- by janadari  -->
```
