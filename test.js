
var hashtagifyText=
  '"Image Recognition" with the Google Vision API and Ionic? Test 6 and test.js';

var analizeText=
  'Image recognition allows computers to recognize images in a similar way to humans. In the past developers had to use complex image recognition techniques and algorithms such as pattern recognition. With the release of the Cloud Vision API by Google, developers now have a powerful suite of tools available from a company with some of the best image recognition functionality available. In this tutorial you’ll build an Ionic app that allows users to take a picture recognizable by the Cloud Vision API. More from this author Authentication in React Native with Firebase Build a Peer-to-Peer File Sharing Component in React & PeerJS Getting Started Using the API involves uploading a JSON file containing the type of image detection wanted and the base64 encoding of the image to the API endpoint. Here’s an example of the JSON file: In this example, you have to replace base64-encoded-image with the actual base64 encoded string representation of the image. The features property is where you supply an array of objects containing the type of image detection that you want. LABEL_DETECTION attempts to classify the image by giving it a label or description. Once you have a response, it will be something like the below: Since you specified LABEL_DETECTION for the feature and maxResults to 1, you get a single object in the responses array. In this case, labelAnnotations. Aside from LABEL_DETECTION, you could also use the following: FACE_DETECTION: Detects human faces in a photo, returning coordinates which you could use to draw around the detected faces. LANDMARK_DETECTION: Detects landmarks such as the Opera House in Sydney or Stonehenge in Wiltshire. LOGO_DETECTION: Detects different company logos. TEXT_DETECTION: Employs Optical Character Recognition (OCR) technology to extract text from images. SAFE_SEARCH_DETECTION: Classifies an image based on safe-search parameters. This classifies the image as adult, spoof, medical, or violence. Signing up for the Cloud Vision API At time of writing, the Google Cloud Vision API is in beta, which means that it’s free to try. Go to the Google Cloud Platform website and click the try for free button. This will take you to a page asking for your business and credit information, but don’t worry, Google won’t charge you anything up to $300. Once complete, create a new project on Google console, enable billing for your project, and enable the Cloud Vision API. I recommend you skip the normal process and use the ‘API Key’ option. API Key Building the App Now you’re ready to build the app. But first I’d like to give a brief overview of the app you’re going to build. The app will have one page which contains all the elements needed to interact with the Cloud Vision API. It will have a dropdown for selecting what type of image detection the user wants, a button for taking a picture, an image element for displaying the picture taken, and a heading element for displaying the description of the picture. Here’s how the final app will look: ionic vision app You can find the final code for the project on GitHub. Installing Dependencies In your working directory, open a new terminal window an install Cordova and Ionic: npm install -g cordova ionic Create a new Ionic project using the blank template: ionic start ionic-vision blank Add the platforms you want to use. I’m only going to install Android, but the code should work on iOS as well. ionic platform add android You need to install a few plugins for interacting with the device APIs for working with the camera, file and uploading files. cordova plugin add cordova-plugin-camera cordova plugin add cordova-plugin-file cordova plugin add cordova-plugin-file-transfer Install ngCordova using bower: bower install ngCordova The ngCordova library provides AngularJS wrappers for the plugins installed. These wrappers makes it easier for working with the plugins inside an Ionic app. Adding the Controller Open the www directory, create a controllers/HomeController.js file inside the js directory and add the following code: Breaking down the code above. First you create the controller and import the libraries needed. Inside the controller, set the default data used by the view. This includes the placeholder image to display, an empty description, and the default detection type. LABEL_DETECTION is used since its more generalized than the others. Inside the method, declare the options for the camera plugin, setting destinationType to Camera.DestinationType.DATA_URL. This means that once the picture is selected, the callback function will have the data URI of the image. As this data URI is already base64 encoded, it no longer needs converting. sourceType is Camera.PictureSourceType.CAMERA so it uses the image taken from the camera as the source. targetWidth and targetHeight set the preferred dimensions of this image. correctOrientation is true so that it automatically changes the image orientation to portrait and cameraDirection is 0 so it uses the back camera. Finally, encodingType is Camera.EncodingType.JPEG, allowing you to prepend data:image/jpeg;base64, to the data URI so you can display the image. var options = {destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.CAMERA, targetWidth: 500, targetHeight: 500, correctOrientation: true, cameraDirection: 0, encodingType: Camera.EncodingType.JPEG }; This opens the default camera app on the device by calling $cordovaCamera.getPicture. It uses options as an argument, calling then and supplying the success and error callback functions. The same pattern is true for all plugins that you’ll be using later. Inside the success callback, update the image source (current_image) and reset the description to an empty string. Use the Cordova File plugin to write the file_contents to the file.json file stored in the root directory of the apps sandbox. The third argument for the writeFile method is a boolean value for setting whether to create the file if it doesn’t already exist. When the contents are written to the file, declare the variables needed by the file transfer plugin to work. Below is a headers variable which is the http headers for the request. Since you’re sending a JSON file, you have to set the Content-Type to application/json. The server is the full URL of the API to send the request to and filePath the full path to the JSON file that you’ll be sending. You send the file to the server using the upload method of the file transfer plugin. The fourth argument supplied to the upload method is a boolean value for setting whether to accept security certificates from all hosts. Once you get a response, convert it to a JavaScript object using JSON.parse. Construct the key by concatenating the value of the current detection type and the word ‘Annotations’. This allows you to form the string labelAnnotations if the user selected LABEL_DETECTION as the detection type. You can then use this string to extract the actual description of the image. Adding the View Create a templates/home.html file and add the following code: Inside the ion-view is the header and the ion-content which are the UI elements that you see below the header. Things like the image, image description, the list of detection types, and the button for taking a picture. Styling Most of the styling work is handled by Ionic, so you only need a couple of style declarations. Add the following to css/style.css: .text-center {text-align: center; } .picture {max-width: 100%; max-height: 100%; } Bringing Everything Together Open the js/app.js file that contains the code for initializing Ionic and ngCordova. If you used the Ionic blank starter template, most of the code is already filled out. All that’s needed is to specify the use of ngCordova and edit the contents of the config method to point to the home.html file. Open index.html and link to the ng-cordova.js file after the ionic.bundle.js file. Below the app.js file, link to the HomeController.js file. Don’t forget to specify starter as the value for the ng-app, and inside body, add ion-nav-view so that it will display the home.html view. Running the App You can run the app on your device or on an emulator by executing the following command: ionic run android Final Thoughts In this tutorial you built an image recognition app with ionic and the help of the Cloud Vision API. I covered the use of different image detection types such as the label, landmark, logo, and text detection. I didn’t cover Face detection or safe-search detection, but for face detection, you can use something like Fabric.js. This will convert the image into a canvas object and draw circles on the detected faces. For more information on the Cloud Vision API, read the official documentation and I would love to hear your experiences and thoughts. Tags: api, google, image recognition';

hashtagify.debug=true;
// hashtagify.doFollowedByNumber=false;
// hashtagify.doDottedAndDashed=false;

var myTitle=hashtagify(hashtagifyText,analizeText,[]);

document&&document.body.appendChild(document.createTextNode(myTitle));
