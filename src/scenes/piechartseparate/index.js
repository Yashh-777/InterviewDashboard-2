import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import react, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import axios from "axios";
import qs from "qs";
import { Buffer } from "buffer";
import { readInboxContent } from "../../GmailApi";
import PieChart from "../pie";
import ClickableColumnChart from "../clickableColumnChart";

const Piechartseparate = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  const getAcceToken = async () => {
    var data = qs.stringify({
      client_id:
        "819179062308-5ofa1b2ffjmpbkrcdh5tfum144engd8a.apps.googleusercontent.com",
      client_secret: "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",
      refresh_token:
        "1//0g5Fr0VU9q5Y_CgYIARAAGBASNwF-L9IrLN7wipLeonLHU4ysTVLRb9UTS3U9qedA7xj6D1n5W6ESljQ6E6vJwWaadvYPPYLziwY",
      grant_type: "refresh_token",
    });
    var config = {
      method: "post",
      url: "https://accounts.google.com/o/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept-encoding": "*",
      },
      data: data,
    };

    var accessToken = "";

    await axios(config)
      .then(async function (response) {
        accessToken = await response.data.access_token;
        console.log("Access Token" + accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });

    return accessToken;
  };

  var accessTkn = getAcceToken();
  // console.log("8888888888888")
  // console.log(accessTkn);

  // Returns number of mails
  const getGmail = async () => {
    var config = {
      method: "get",
      url: "https://gmail.googleapis.com/gmail/v1/users/me/messages",
      headers: {
        Authorization: `Bearer ${await accessTkn}`,
        "accept-encoding": "*",
      },
    };

    var data = "";

    await axios(config)
      .then(async function (response) {
        // console.log(JSON.stringify(response.data));
        data = await response.data;
        let x = data["resultSizeEstimate"];
        console.log(x);
        // console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(data);
    let x = data["resultSizeEstimate"];
    return x;
  };
  var number = getGmail();
  console.log("Total number of mails in inbox-----");
  number.then(function (result) {
    console.log(result); // will log 39
  });

  const getAllGmail = async () => {
    var config = {
      method: "get",
      url: "https://gmail.googleapis.com/gmail/v1/users/me/messages",
      headers: {
        Authorization: `Bearer ${await accessTkn}`,
        "accept-encoding": "*",
      },
    };

    var data = "";

    await axios(config)
      .then(async function (response) {
        // console.log(JSON.stringify(response.data));
        data = await response.data;
        let x = data["messages"];
        console.log(x);
        // console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(data);
    let x = data["messages"];
    return x;
  };


  const searchGmail1 = async (searchItem) => {
    var config1 = {
      method: "get",
      url:
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=" +
        searchItem,
      headers: {
        Authorization: `Bearer ${await accessTkn}`,
        "accept-encoding": "*",
      },
    };

    var threadId = "";
    // console.log(x);
    await axios(config1)
      .then(async function (response) {
        // console.log("Searched Results : " + JSON.stringify(response.data));

        // let x = await this.getGmail();
        // let i = 0;
        // for (i = 0; i < x; i++) {
        //   threadId.push(await response.data["messages"][x].id);
        // }

        threadId = await response.data["messages"][0].id;

        // console.log("ThreadId = " + threadId);
      })
      .catch(function (error) {
        console.log(error);
      });

    return threadId;
  };

  const searchGmail = async (searchItem) => {
    var config1 = {
      method: "get",
      url:
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=" +
        searchItem,
      headers: {
        Authorization: `Bearer ${await accessTkn}`,
        "accept-encoding": "*",
      },
    };
  
    var threadIds = [];
    await axios(config1)
      .then(async function (response) {
        const messages = response.data.messages;
        messages.forEach(function (message) {
          threadIds.push(message.id);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  
    return threadIds;
  };
  

  console.log("__________")
  searchGmail("from:grp14.project@gmail.com").then((values) => {
    console.log(values);
  })

  const readGmailContent1 = async (messageId) => {
    var config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${await accessTkn}`,
        "accept-encoding": "*",
      },
    };

    var data = "";

    await axios(config)
      .then(async function (response) {
        // console.log(JSON.stringify(response.data));
        data = await response.data;
        // console.log(Object.keys(data));
        // console.log(typeof data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return data;
  };

  // console.log("***************");
  // let ans = readGmailContent(threadIdd);
  // console.log(ans);
  // console.log("**************");

  const readGmailContent = async (threadIds) => {
    const contentArray = [];
  
    for (let i = 0; i < threadIds.length; i++) {
      // const messageId = await getLatestMessageId(threadIds[i]);
  
      var config = {
        method: "get",
        url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${threadIds[i]}`,
        headers: {
          Authorization: `Bearer ${await accessTkn}`,
          "accept-encoding": "*",
        },
      };
  
      var data = "";
  
      await axios(config)
        .then(async function (response) {
          data = await response.data;
          // const encodedMessage = data.payload["parts"][0].body.data;
          // const decodestr = Buffer.from(encodedMessage, "base64").toString("ascii");
        })
        .catch(function (error) {
          console.log(error);
        });
        const encodedMessage = data.payload["parts"][0].body.data;
        const decodestr = Buffer.from(encodedMessage, "base64").toString("ascii");
      contentArray.push(decodestr);
    }
  
    return contentArray;
  };
  
console.log("IMIMIMIMIMIMIMIMMIMMIMMIMIMIMMIM")



// searchGmail("from:grp14.project@gmail.com")
//   .then((threadIds) => {
//     console.log(`Found ${threadIds.length} threads for query `);
//     readGmailContent(threadIds)
//       .then((contentArray) => {
//         console.log(contentArray);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

  console.log("IMIMIMIMIMIMIMIMMIMMIMMIMIMIMMIM");

  const search_word = (text, word) => {
    var x = 0,
      y = 0;
    let i = 0;
    let j = 0;
    for (i = 0; i < text.length; i++) {
      if (text[i] == word[0]) {
        for (j = i; j < i + word.length; j++) {
          if (text[j] === word[j - i]) {
            y++;
          }
          if (y === word.length) {
            x++;
          }
        }
        y = 0;
      }
    }

    // console.log(search_word('The quick brown fox', 'fox'));

    return x;
  };

  const search_words = (text) => {
    const words = ["shortlisted", "rejected", "selected"];
    let results = {};
    words.forEach((word) => {
      const count = search_word(text, word);
      results[word] = count;
    });
    return results;
  };

  const search_words_in_array = (array) => {
    let results = [];
    array.forEach((text) => {
      const word_counts = search_words(text);
      results.push(word_counts);
    });
    return results;
  };

  
  searchGmail("from:grp14.project@gmail.com")
  .then((threadIds) => {
    console.log(`Found ${threadIds.length} threads for query`);
    readGmailContent(threadIds)
      .then((contentArray) => {
        let shortlistedCount = 0;
        let rejectedCount = 0;
        let selectedCount = 0;

        contentArray.forEach((content) => {
          // Search for specific words in the email content
          const sCount = search_word(content, "shortlisted");
          const rCount = search_word(content, "rejected");
          const selCount = search_word(content, "selected");

          // Increment the corresponding counter
          shortlistedCount += sCount;
          rejectedCount += rCount;
          selectedCount += selCount;
        });

        console.log(`Shortlisted count: ${shortlistedCount}`);
        console.log(`Rejected count: ${rejectedCount}`);
        console.log(`Selected count: ${selectedCount}`);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });


  const getMails = async () => {
    var config = {
      method: "get",
      url: "https://gmail.googleapis.com/gmail/v1/users/me/messages",
      headers: {
        Authorization: "Bearer {{accessToken}}",
        "accept-encoding": "*",
      },
    };

    var data1 = "";
    await axios(config)
      .then(function async(response) {
        data1 = JSON.stringify(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return data1;
  };

  let allmymails = getMails();
  console.log(allmymails);

  readInboxContent = async (searchText) => {
    const threadId = await searchGmail1(searchText);
    const message = await readGmailContent1(threadId);

    const encodedMessage = message.payload["parts"][0].body.data;
    const decodestr = Buffer.from(encodedMessage, "base64").toString("ascii");

    const emailContent = decodestr.trim();

    return { emailContent};
  };


  let allthreads = getAllGmail();

  console.log("All the threads***********************************");

  const getThreadIds = async () => {
    return new Promise((resolve, reject) => {
      let threadIds = [];
  
      allthreads.then((array) =>{
        for (let i = 0; i < array.length; i++) {
          const threadId = array[i].threadId;
          threadIds.push(threadId);
        }
        resolve(threadIds);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  // getThreadIds().then((threadIds) => {
  //   console.log(threadIds); // Prints all the thread IDs
  // }).catch((error) => {
  //   console.log(error);
  // });

  let ans1 = readInboxContent("from:grp14.project@gmail.com");

  const [numberOfMails, setNumberOfMails] = useState(null);

  const [emailContent, setEmailContent] = useState("");
  

  useEffect(() => {
    number.then((value) => {
      setNumberOfMails(value);
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { emailContent} = await readInboxContent("from:grp14.project@gmail.com");
      setEmailContent(emailContent);
    }

    fetchData();
  }, []);


  // New ---------

  const [shortlistedCount1, setShortlistedCount1] = useState(0);
  const [rejectedCount1, setRejectedCount1] = useState(0);
  const [selectedCount1, setSelectedCount1] = useState(0);


  useEffect(() => {
    // Call your searchGmail and readGmailContent functions here
    searchGmail("from:grp14.project@gmail.com")
      .then((threadIds) => {
        console.log(`Found ${threadIds.length} threads for query`);
        readGmailContent(threadIds)
          .then((contentArray) => {
            let sCount = 0;
            let rCount = 0;
            let selCount = 0;

            contentArray.forEach((content) => {
              // Search for specific words in the email content
              sCount += search_word(content, "shortlisted");
              rCount += search_word(content, "rejected");
              selCount += search_word(content, "selected");
            });

            // Update the state variables
            setShortlistedCount1(sCount);
            setRejectedCount1(rCount);
            setSelectedCount1(selCount);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    
    <div>
        <h1>&nbsp;&nbsp; PieChart based on categories of mails</h1>

        <PieChart
        shortlisted={shortlistedCount1}
        rejected={rejectedCount1}
        selected={selectedCount1}
      />

      {/* <ClickableColumnChart
      shortlisted={shortlistedCount1}
      rejected={rejectedCount1}
      selected={selectedCount1}
      />
         */}
      </div>
  );
};

export default Piechartseparate;
