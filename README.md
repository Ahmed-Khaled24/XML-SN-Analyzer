# XML/Social-Network analyzer

This application is divided into two phases:

- `XML` which takes an xml file and do various operations on it:  
`Validate`/ `Correct`/ `compress`/ `decompress`/ `convertToJSON`/ `minify`/ `prettify `

- `Social-Network` which takes the social network written as an xml from the previous phase and do various operations on:  
`SN visualization`/ `Search in Posts`/ `get Mutual users`/ `Most active user`/  
`Most influencer user`/ `Suggest Friends`    

*** `Note` The social network must be in this format  
![sample](/sample.png)  


### GUI Manual

#### Menu bar
- `open`  
![open](/open.ong.png)  
`Open File` opens xml file.  
`Open Compressed` opens a compressed .tkf file.

- `save`  
![save](/save.png)  
 `Save As` saves the content of the output window in the xml (.tkf or .json) in file system.


#### XML Analyzer

![XML window](/xml-window.png)


- `Validate` validates the xml in the input window and shows errors if found in output window.
- `Correct` correct errors shown in validate.
- `Prettify` prettifies the xml data in the input window
- `Minify` minified the input data in the input window
- `To JSON`  takes xml data from input window  
`compact` shows a compact json in output window
`non-compact` shows non-compact json in output window.  reference
- `Compress` compresses the xml data and shows in output window (.tkf)
- `Decompress` takes compressed data and shows it as prettified xml in output window
- `SN analyzer` takes the valid xml data and goes to the next phase

#### Social Network Analyzer

![SN window](/sn-window.png)


- `Search in posts` case insensitive search in users posts.
- `get Mutual Friends` get the mutual users that two users follow.
- `Suggest friends` suggest users to follow based on mutual based on users you follow and follow you.
- `Most influencer user` gets the most followed user.
- `most active user` gets the users who followed the most users.
- `XML Analyzer` moves back to the previous phase.


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
   git clone https://github.com/Ahmed-Khaled24/XML-SN-Analyzer.git
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