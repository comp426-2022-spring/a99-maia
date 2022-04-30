# a99 Final Project - Mental Log

![MentalLog logo](front/assets/lightlogo.svg)

*MentalLog* is a web application that allows individuals to keep records of their daily moods in the form of a journal, using a mood scale and an option to enter any text about details of their day. The users will be able to see trends and a summary about their mood on the home page in the form of a graph, as well as mental health resources if their trends show concerns or they mark a day unusually low. This application can help people keep track of their moods and take care of their mental health and find resources as needed. 

>View the deployment [here](https://comp426-2022-spring.github.io/a99-maia/front/index.html).

## Directory

- [Team Meeting Notes](https://github.com/comp426-2022-spring/a99-maia/blob/main/docs/Meeting-Notes.md)
- [Project Board](https://github.com/comp426-2022-spring/a99-maia/projects/1)
- [Figma Mockup](https://www.figma.com/file/ActriAr8yrSDnxJXgsbCwE/COMP-426?node-id=0%3A1)

## Getting Started

Run app with the command <node ./backend/server.js> and to access the app go to http://localhost:5000/MentalLog.

## API Endpoints

### /MentalLog/CreateAccount/:name/:password

Creates an account assuming the name and password do not already exist in the database.

### /MentalLog/LogIn/:name/:password

Checks to see if name and password exist in database. If so, it takes you to your dashboard. 

### /MentalLog/:choice(Up|Down|Neutral)/:name/:password

Checks if you have already made a log today. If you didn't make a log today, it will log your mood by updating the database. 

## Team mangement

1. Front end and Design lead - Cecilia
2. Back end lead - Xavier and Stefano
3. Database lead - Sagar