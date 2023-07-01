// const tf = require("@tensorflow/tfjs-node");
// const natural = require("natural");
// const tokenizer = new natural.WordTokenizer();
// const stemmer = natural.PorterStemmer.stem;

// function preprocess(content) {
//   // Tokenize the email content
//   const tokens = tokenizer.tokenize(content);

//   // Remove stop words and punctuation
//   const stopwords = natural.stopwords;
//   const filteredTokens = tokens.filter(
//     (token) => !stopwords.includes(token) && !/[^\w\s]/.test(token)
//   );

//   // Stem the remaining tokens
//   const stemmedTokens = filteredTokens.map((token) => stemmer(token));

//   return stemmedTokens;
// }

// function extractFeatures(content) {
//   // Extract keywords or phrases that indicate the email's category
//   const shortlistedPhrases = ["shortlisted", "next round", "further round"];
//   const selectedPhrases = ["selected", "accept", "approval"];
//   const rejectedPhrases = [
//     "not selected",
//     "not shortlisted",
//     "not accepted",
//     "reject",
//     "not approve",
//   ];

//   const features = [
//     shortlistedPhrases.reduce(
//       (count, phrase) =>
//         count + preprocess(content).filter((token) => token === phrase).length,
//       0
//     ),
//     selectedPhrases.reduce(
//       (count, phrase) =>
//         count + preprocess(content).filter((token) => token === phrase).length,
//       0
//     ),
//     rejectedPhrases.reduce(
//       (count, phrase) =>
//         count + preprocess(content).filter((token) => token === phrase).length,
//       0
//     ),
//   ];

//   return features;
// }

// function createModel() {
//   // Define the neural network architecture
//   const model = tf.sequential();
//   model.add(
//     tf.layers.dense({ units: 4, inputShape: [3], activation: "relu" })
//   );
//   model.add(tf.layers.dense({ units: 3, activation: "softmax" }));
//   model.compile({
//     optimizer: "adam",
//     loss: "categoricalCrossentropy",
//     metrics: ["accuracy"],
//   });
//   return model;
// }

// async function trainModel() {
//   // Prepare the training data
//   const data = [
//     {
//       content: "You have been selected for the next round of interviews.",
//       category: "selected",
//     },
//     {
//       content: "We regret to inform you that you have not been shortlisted for the position.",
//       category: "rejected",
//     },
//     {
//       content: "Congratulations! You have been shortlisted for further rounds of selection.",
//       category: "shortlisted",
//     },
//     // Add more training data here
//   ];
//   const xTrain = data.map((example) => extractFeatures(example.content));
//   const yTrain = tf.oneHot(
//     data.map((example) => ["shortlisted", "selected", "rejected"].indexOf(example.category)),
//     3
//   );

//   // Train the model
//   const model = createModel();
//   await model.fit(tf.tensor2d(xTrain), yTrain, { epochs: 10 });

//   // Save the model
//   await model.save("file://path/to/model.json");
// }

// trainModel();


// const data = [
//   {
//     content:
//       "We are pleased to inform you that you have been shortlisted for the next round of interviews.",
//     category: "shortlisted",
//   },
//   {
//     content:
//       "Thank you for your application. Unfortunately, we are unable to offer you a position at this time.",
//     category: "rejected",
//   },
//   {
//     content: "Congratulations! You have been selected for the position.",
//     category: "selected",
//   },
//   {
//     content:
//       "We have reviewed your application and regret to inform you that you have not been selected for the position.",
//     category: "rejected",
//   },

//   {
//     content:
//       "We are pleased to invite you to the final round of interviews for the position.",
//     category: "shortlisted",
//   },
//   {
//     content:
//       "We are sorry to inform you that you have not been shortlisted for the position.",
//     category: "rejected",
//   },
//   {
//     content:
//       "We are happy to inform you that you have been shortlisted for the next stage of selection.",
//     category: "shortlisted",
//   },
//   {
//     content:
//       "We have reviewed your application and regret to inform you that you have not been shortlisted for the position.",
//     category: "rejected",
//   },
//   {
//     content:
//       "Congratulations! You have been selected for the next round of interviews.",
//     category: "selected",
//   },
//   {
//     content:
//       "Thank you for your interest in the position. Unfortunately, we have decided not to shortlist you for further rounds.",
//     category: "rejected",
//   },
//   {
//     content:
//       "We are pleased to inform you that you have been selected for the final round of interviews.",
//     category: "selected",
//   },
//   {
//     content:
//       "We regret to inform you that you have not been shortlisted for the position at this time.",
//     category: "rejected",
//   },
//   {
//     content:
//       "Congratulations! You have been selected for the next stage of selection.",
//     category: "selected",
//   },
//   {
//     content:
//       "Thank you for your application. We have decided not to proceed with your application at this time.",
//     category: "rejected",
//   },
//   {
//     content:
//       "We are pleased to invite you to the next round of interviews for the position.",
//     category: "shortlisted",
//   },
//   {
//     content:
//       "We regret to inform you that you have not been selected for the position.",
//     category: "rejected",
//   },
//   {
//     content:
//       "Congratulations! You have been shortlisted for further rounds of selection.",
//     category: "shortlisted",
//   },
//   {
//     content:
//       "Thank you for your interest in the position. We have decided not to proceed with your application at this time.",
//     category: "rejected",
//   },
//   {
//     content:
//       "We are pleased to inform you that you have been selected for the position.",
//     category: "selected",
//   },
//   {
//     content:
//       "We regret to inform you that you have not been shortlisted for the next round of interviews.",
//     category: "rejected",
//   },
//   {
//     content:
//       "Congratulations! You have been selected for the final round of interviews.",
//     category: "selected",
//   },
//   {
//     content:
//       "Thank you for your application. Unfortunately, we have decided not to shortlist you for further rounds of selection.",
//     category: "rejected",
//   },
//   {
//     content:
//       "Congratulations! You have been selected for the final round of interviews.",
//     category: "selected",
//   },
//   {
//     content:
//       "Thank you for your application. Unfortunately, we have decided not to shortlist you for further rounds of selection.",
//     category: "rejected",
//   },
//   {
//     content:
//       "We are pleased to inform you that you have been shortlisted for the next stage of selection.",
//     category: "shortlisted",
//   },
//   {
//     content:
//       "Thank you for your application. We have decided not to proceed with your application at this time.",
//     category: "rejected",
//   },
//   {
//     content:
//       "We are sorry to inform you that you have not been selected for the position at this time. However, we would like to keep your application on file for future opportunities.",
//     category: "rejected",
//   },
//   {
//     content:
//       "We are pleased to inform you that you have been shortlisted for the position. Please come to our office on Monday for the next round of interviews.",
//     category: "shortlisted",
//   },
//   {
//     content:
//       "Thank you for your application. We regret to inform you that you have not been selected for the position at this time.",
//     category: "rejected",
//   },
//   {
//     content:
//       "Congratulations! You have been selected for the next stage of the recruitment process.",
//     category: "selected",
//   },
//   {
//     content:
//       "We are sorry to inform you that you have not been shortlisted for the position. We appreciate your interest in our company and encourage you to apply for future opportunities.",
//     category: "rejected",
//   },
//   {
//     content:
//       "We are pleased to invite you to the second round of interviews for the position. Please come to our office on Friday at 10am.",
//     category: "shortlisted",
//   },
//   {
//     content:
//       "Thank you for your application. We have decided not to proceed with your application at this time. However, we would like to keep your resume on file for future opportunities.",
//     category: "rejected",
//   },
//   {
//     content:
//       "Congratulations! You have been selected for the final stage of the recruitment process.",
//     category: "selected",
//   },
//   {
//     content:
//       "We are sorry to inform you that you have not been selected for the position. We received a large number of applications and had to make some tough decisions.",
//     category: "rejected",
//   },
// ];


// const fs = require('fs');

// fs.writeFile('training_data.json', JSON.stringify(data), function (err) {
// if (err) throw err;
// console.log('Data written to file');
// });


// const natural = require('natural');
// const stopwords = require('stopwords').english;

// // Use the stopwords as an array
// console.log(stopwords);


// function preprocess(text) {
//   const tokens = tokenizer.tokenize(text.toLowerCase());
//   const lemmatizedTokens = tokens.filter(token => {
//     return natural.JaroWinklerDistance(token, stopWords) < 0.6;
//   }).map(token => natural.PorterStemmer.stem(token));
//   return lemmatizedTokens;
// }





// const tf = require('@tensorflow/tfjs');

// const tf = require('@tensorflow/tfjs');
// require('@tensorflow/tfjs-node');

// // Load the model
// async function loadModel() {
//   console.log("******");
//   const model = await tf.loadLayersModel('D:\interview_dashboard2\frontend\src\model.h5');
//   return model;
// }

// Use the model
// async function useModel() {
//   const model = await loadModel();
  // Perform inference with the model

//   const categories = ['shortlisted', 'rejected', 'selected'];

//   // Preprocess and extract features from the input text
//   const text = "Your application has been rejected.";
//   const tokens = preprocess(text);
//   const features = extractFeatures(tokens);
//   const inputArray = tf.tensor2d(features, [1, features.length]);

//   // Make predictions
//   const prediction = model.predict(inputArray);
//   const categoryIndex = prediction.argMax(1).dataSync()[0];
//   const category = categories[categoryIndex];

//   // Print the predicted category
//   console.log(category);
// }


// useModel();




/*

// Define the URL of the model
const MODEL_URL = "https://sharmaya123.s3.amazonaws.com/models.json";
import * as tf from '@tensorflow/tfjs';

// Load the model
const model =  tf.loadLayersModel(MODEL_URL);
import stopwords from 'stopword';

// import  lemmatizer from 'lemmatizer';
import lemmatizer from 'node-lemmatizer';
// import * as natural from 'natural';
// const lemmatizer = new natural.Lemmatizer();
// const lemmatizer = require('lemmatizer');

// Define the categories
const categories = ['shortlisted', 'rejected', 'selected'];

// Define a list of text to categorize
const texts = ["you have been shortlisted for further rounds.",
             "We regret to inform you that your application has been rejected.",
             "You have been selected for the next round of interviews."];

// Initialize counters for each category
let shortlistedCount = 0;
let rejectedCount = 0;
let selectedCount = 0;


function isStopword(token) {
  for (let i = 0; i < stopwords.length; i++) {
    if (stopwords[i] === token) {
      return true;
    }
  }
  return false;
}

function preprocess(text) {
  let tokens = text.toLowerCase().match(/\b\w+\b/g);
  tokens = tokens.filter(token => !isStopword(token));
  tokens = tokens.map(token => lemmatizer.lemmas(token));
  return tokens;
}


function extractFeatures(content) {
  const keywords = {
    "shortlisted": ["shortlisted", "further rounds", "proceed", "invite", "next stage", "progress"],
    "selected": ["selected", "next round", "further interview", "final round", "offer", "join", "appointment"],
    "rejected": ["regret", "not selected", "not shortlisted", "not proceed", "unsuccessful", "unable", "apologies", "rejected"]
  };

  const features = [];
  for (let category in keywords) {
    let count = 0;
    for (let keyword of keywords[category]) {
      count += content.split(keyword).length - 1;
    }
    features.push(count);
  }
  return features;
}


// Loop through each text and extract features to categorize
texts.forEach(text => {
    const tokens = preprocess(text)
    const features = extractFeatures(tokens) // assuming you have defined this function
    const tensor = tf.tensor2d(features);
    const prediction = model.predict(tensor);
    const categoryIndex = prediction.argMax(axis=1).dataSync()[0];
    const category = categories[categoryIndex];

    // Increment the corresponding category counter
    if (category === 'shortlisted') {
        shortlistedCount++;
    } else if (category === 'rejected') {
        rejectedCount++;
    } else if (category === 'selected') {
        selectedCount++;
    }
});

// Print the category counts
console.log(`Shortlisted count: ${shortlistedCount}`);
console.log(`Rejected count: ${rejectedCount}`);
console.log(`Selected count: ${selectedCount}`);


*/


import * as tf from '@tensorflow/tfjs';
import stopwords from 'stopword';
import lemmatizer from 'node-lemmatizer';

const MODEL_URL = "https://sharmaya123.s3.amazonaws.com/models.json";
const categories = ['shortlisted', 'rejected', 'selected'];
const texts = [
  "you have been shortlisted for further rounds.",
  "We regret to inform you that your application has been rejected.",
  "You have been selected for the next round of interviews."
];

let shortlistedCount = 0;
let rejectedCount = 0;
let selectedCount = 0;

async function loadModel() {
  const model = await tf.loadLayersModel(MODEL_URL);
  return model;
}

function isStopword(token) {
  return stopwords.includes(token);
}

function preprocess(text) {
  const tokens = text.toLowerCase().match(/\b\w+\b/g);
  const filteredTokens = tokens.filter(token => !isStopword(token));
  const lemmatizedTokens = filteredTokens.map(token => lemmatizer.lemmas(token));
  return lemmatizedTokens;
}

function extractFeatures(content) {
  const keywords = {
    "shortlisted": ["shortlisted", "further rounds", "proceed", "invite", "next stage", "progress"],
    "selected": ["selected", "next round", "further interview", "final round", "offer", "join", "appointment"],
    "rejected": ["regret", "not selected", "not shortlisted", "not proceed", "unsuccessful", "unable", "apologies", "rejected"]
  };

  const features = [];
  for (const category in keywords) {
    let count = 0;
    const categoryKeywords = keywords[category];
    for (const keyword of categoryKeywords) {
      count += content.filter(token => token.includes(keyword)).length;
    }
    features.push(count);
  }
  return features;
}

async function categorizeTexts() {
  const model = await loadModel();

  texts.forEach(text => {
    const tokens = preprocess(text);
    const features = extractFeatures(tokens);
    const tensor = tf.tensor2d([features]);
    const prediction = model.predict(tensor);
    const categoryIndex = prediction.argMax(axis = 1).dataSync()[0];
    const category = categories[categoryIndex];

    if (category === 'shortlisted') {
      shortlistedCount++;
    } else if (category === 'rejected') {
      rejectedCount++;
    } else if (category === 'selected') {
      selectedCount++;
    }
  });

  console.log(`Shortlisted count: ${shortlistedCount}`);
  console.log(`Rejected count: ${rejectedCount}`);
  console.log(`Selected count: ${selectedCount}`);
}

categorizeTexts();
