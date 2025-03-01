# Healthcare Translation Web App with Generative AI

#### Objective: 
Develop a web-based prototype that enables real-time, multilingual translation between patients and healthcare providers. This application should convert spoken input into text, provide a live transcript, and offer a translated version with audio playback. 
<!--  -->

#### Introduction
In this writeup, several concepts and approaches used in building the Healthcare Translation Web app will be discussed. The includes topics like, code structure, AI tools, and security considerations.

#### Tools
The nextjs web framework was used to develop the application per it ability to allow both serverside and client side code to be deployed on the vercel platform. 

#### Libraries
Core libraries used include;
 - google-cloud/speech: "^6.7.1",
  -  @google-cloud/text-to-speech: "^5.8.1",
  -  "@google-cloud/translate

#### Code Structure
The coode base contains two major directories which are the public and src directories. The public directory contains static files to be served by the application. The src directory contained almost all the code of the application. It has an app folder, component folder and a lib folder for utility functions used by the api directory inside the app directory. The app diretory
contains the page routes under the site and the api directory contains the various api routes used in the application.

The speech to text route handle the request to the google cloud speech to text ai.

The text to speech route handle the request to the google cloud text to speech ai.

Under the site is a single page file that contains the home component which handle the ui and other funcitons calls that make the application work.

#### Security
The nature of the app did not require extensive security measures like authentication checks. It may be a future work. The application made use of env files to hide secret variables. These variable include the google api key named "GOOGLE_APPLICATION_CREDENTIALS".


#### How to run
After cloning the repository,
1. run npm install
2. create the .env.local file and add the variable GOOGLE_APPLICATION_CREDENTIALS
3. run npm run dev


#### [🚀 Live Demo](https://voice-to-text-translation-web-app.vercel.app/)

#### [🌐 Visit Website](https://voice-to-text-translation-web-app.vercel.app/)

