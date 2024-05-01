### Set Up Instructions:

    run "npm start" to run the project

# Functionality and Routes:

### Home Route /:

    user can select the role if he wants to assign the tasks he can click "Admin" or if he wants to login as user to see the tasks assigned to him by clicking "User"

### Admin Begistration Route /admin/registration:

    admin can register by giving some data "user name, password, confirm password" as Admin if he is new Admin

### Admin Login Route /admin/login:

    after successfully registered Admin can log in to his account as Admin by using his credentials "user name, password",
    after successfull login the jwt token is generated, this token is saved in session storage and access that token from sesson storage and use the token for every protected routes, only a valid jwt token can successfully fetch the routes otherwise it will return error.

### Main Portal Route /mainPortal:

    in this route ui is depends up on the the role of user who logged in, if an admin logged in he can see the tasks whatever he added and assigned to the users, and he can delete the task if he wants to, and he can add the users (create user accounts) and assign tasks for them, he can see the task status and tasks report, and he can add the new task and assign it to the users by cliccking add task button

    if a user logged in he can see the tasks he assigned to do, and he can change the status to (pending, inprogress, completed), and he can see the report for the tasks he was assigned to.

### User Registration Route /user/registration:

    only admins can create the user accounts and assign the tasks for them , users can not create new account by their own, admins create user accounts by giving some credentials like (username, password) and after successfull registration user can login by using those credentials
