##### *Author: LeonGuerreroM*

## Overview
This API project is created following **Clean Architecture** layers and modularization, aiming to be efficient, high-performance, maintainable and scalable.
The main functionalities include: 
- **Login**: Provides authentication and authorization to te user.
- **Tasks**: Module aimed to have a full tasks management capacity. It includes creation, update and deletion taking care of allowed fields.
It also includes searching tools using filters according to different task characteristics.
- **TaskSharing**: Task sharing feature is also managed by its own services so that linking between users and task can be fully preserved and can operate efficiently (in terms of performance) when needed.


Database structure consists of:
- Users Table: Stores valid users information and access level as role. It includes Admin and Subscriber role. 
- Tasks Table: Stores tasks general information, linking with the creator and responsible user.
- TaskSharing relation: Stores relations between tasks and those users whose that task was shared with. 


## Features
The following features and technologies are included in this project:
- API REST created using  ***Node.js & Express.js*** designed driven by scalability and optimization.
- ***MySQL*** db created/managed using ***Sequelize***.
- Authentication, sessions management & routes protection using ***Passport.js*** & ***JWT***.
- ***Docker*** containers with MySQL & PHPMyAdmin images so that no additional installations are needed.

Some other implementations:

- Incoming data validation using Joi
- Error handlers and error simplification using Boom
- Environment variables usage utilizing dotenv
- Passwords encryption using Bcrypt

Postman Collecion available [here](https://www.postman.com/leonguerrerom/workspace/nextline)