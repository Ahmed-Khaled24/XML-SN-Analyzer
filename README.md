### Application diagram

![diagram](/diagram.png)
This figure describes every operation done in this app, when a user wants to perform any operation on XML data the following sequence happens:
1. the user type (or open) XML data and press any command button.
2. the command is sent to the `main` function which read the command and direct it to the corresponding handler.
3. the `handler` is responsible for ensuring that the given data is compatible with the `feature` function, then send the data to the corresponding feature function.
4. the `feature` function is the core of the program that performs the actual work on the data, then send the result back to the `handler`.
5. the `handler` send the response back to the `GUI` to be displayed to the user.


### How to install and build
For trying the project you can download the pre-build copy for windows platform from [**here**](https://google.com) or clone the repo and build your own copy.   
For building your copy make sure you have node and npm installed on your machine, then follow these instructions.
1. Clone the repo
   ``` 
   git clone https://github.com/Ahmed-Khaled24/XML-Analyzer.git
    ```
2. Install project dependencies 
    ``` 
    npm install
    ```
3. For the building process there are two options
   + Use the pre-configured scripts in package.json 
     ```bash
     npm run win
     npm run linux
     npm run mac
     ```
     for windows, linux, and mac platforms respectively.
   + Customize your build options using electron-builder  [**reference**](https://www.electron.build/)