var axios = require("axios");
var qs = require("qs");

class GmailAPI {
  accessToken = "";

  constructor() {
    this.accessToken = this.getAcceToken();
  }

  getAcceToken = async () => {
    var data = qs.stringify({
      client_id:
        "819179062308-5ofa1b2ffjmpbkrcdh5tfum144engd8a.apps.googleusercontent.com",
      client_secret: "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",
      refresh_token:
        "1//0g21T6yeOPeCKCgYIARAAGBASNwF-L9Ir4UwNQB2n10Z9DND4zPfB560z4wa1t8RYYCgv51pd_SITNixiZQPGO8ylSurDAXdhp44",
      grant_type: "refresh_token",
    });
    var config = {
      method: "post",
      url: "https://accounts.google.com/o/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept-encoding": "*",
        // 'Cookie': '__Host-GAPS=1:ZtlgVEyim60MZMZ3Sfkm7leoB7_XfA:pkZX1RHW9oH5VBr7'
      },
      data: data,
    };

    let accessToken = "";

    await axios(config)
      .then(async function (response) {
        // console.log(JSON.stringify(response.data));
        accessToken = await response.data.access_token;
        // console.log("Access Token " + accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });

    return accessToken;
  };

  getGmail = async () => {
    var config = {
      method: "get",    
      url: "https://gmail.googleapis.com/gmail/v1/users/me/messages",
      headers: {
        Authorization: `Bearer ${await this.getAcceToken()}`,
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

  searchGmail = async (searchItem) => {
    var axios = require("axios");

    var config1 = {
      method: "get",
      url:
        "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=" +
        searchItem,
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
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

  readGmailContent = async (messageId) => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
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

  search_word(text, word) {
    var x = 0,
      y = 0;
    let i = 0;
    let j = 0;
    for (i = 0; i < text.length; i++) {
      if (text[i] == word[0]) {
        for (j = i; j < i + word.length; j++) {
          if (text[j] == word[j - i]) {
            y++;
          }
          if (y == word.length) {
            x++;
          }
        }
        y = 0;
      }
    }

    // console.log(search_word('The quick brown fox', 'fox'));

    return "'" + word + "' was found " + x + " times.";
  }

  getMails = async () => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "https://gmail.googleapis.com/gmail/v1/users/me/messages",
      headers: {
        Authorization: "Bearer {{accessToken}}",
        "accept-encoding": "*",
      },
    };

    await axios(config)
      .then(function async(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  readInboxContent = async (searchText) => {
    const threadId = await this.searchGmail(searchText);
    const message = await this.readGmailContent(threadId);
    // console.log(typeof message);

    const encodedMessage = message.payload["parts"][0].body.data;
    
    const decodestr = Buffer.from(encodedMessage, "base64").toString("ascii");
    
    console.log(decodestr);
    const realmessage = JSON.stringify(decodestr);
    // console.log(realmessage);
    // console.log(typeof realmessage)
    let x = this.search_word(realmessage, "shortlisted");
    let y = this.search_word(realmessage, "rejected");
    let z = this.search_word(realmessage, "selected");
    console.log(x, y, z);
    return decodestr;
  };
}

// console.log(search_word('aa, bb, cc, dd, aa', 'aa'));

module.exports = new GmailAPI();
