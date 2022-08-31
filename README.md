# Introduction

This is an E-commerce website based on REST-API to simulate the functionalities of e-commerce services between different organizations (e.g., banks, suppliers, etc). A total of three backend servers are present, namely the E-commerce server, the Bank server, and the Supplier Organization server. Only the client application of the e-commerce site can connect the user to the e-commerce server. The platform can be used by anyone with a valid email, username, password, bank account, and bank secret. 

# Environment Setup

1. Make sure you have a Linux-based/Windows Operating System running on your machine.

2. Install Node, NPM, Docker, Docker-Compose and git.

3. Clone this repository to your preferred local directory using the following command.

  
        git clone git@github.com:abkafi001/E-Commerce-Site.git
        

# Running The Application

1. Open a command line terminal and go to the roor director of the project by the following command

        cd /path/to/the/project/directory/Ecommerce

2. Run the following command to up the docker

        docker-compose up

3. Go the /path/to/the/project/directory/Ecommerce/bank directory and run npm install , npm start.

        npm install
        npm start
        
4. Go the /path/to/the/project/directory/Ecommerce/supplier directory and run npm install , npm start.

        npm install
        npm start

5. Go the /path/to/the/project/directory/Ecommerce/e-commerce directory and run npm install , npm start.

        npm install
        npm start
        
6. Go the /path/to/the/project/directory/Ecommerce/client directory and run npm install , npm start.

        npm install
        npm start
        

Now the application(client side) should be running on localhost at an existing port (if available) or at port 3000 (otherwise) which is at localhost:3000/
