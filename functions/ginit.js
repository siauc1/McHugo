const { GoogleSpreadsheet } = require('google-spreadsheet')
const axios = require('axios').default;

exports.handler = async (event, context, callback) => {
  try {

    const doc = new GoogleSpreadsheet('1quYbWU9PCt0rWHqtTWVVw61MpFtMxJJKdbl5A-4G2ZM')
    await doc.useServiceAccountAuth(require('./netlify.json'))
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0];//const sheet = await doc.addSheet({ headerValues: ['t', 'ip'] });

    var date = new Date();

    // console.log(sheet.title);
    // console.log(sheet.rowCount);
    const this_ip = `${event.headers['client-ip']}`
    // const this_ip = '70.50.162.241'// for debugging

    // console.log(date)
    // console.log(this_ip)
const this_url = 'http://ip-api.com/json/' + this_ip;

    // console.log('fetching ip at ' + this_url);
let response = await axios.get(this_url);

let ip_info = response.data ;
delete ip_info.query;



const date_option= {timeZone: ip_info.timezone};
var local_time =
    date.toLocaleDateString('en-US',{year:'numeric',...date_option}) + "-" +
    date.toLocaleDateString('en-US',{month:'2-digit',...date_option}) + "-" +
    date.toLocaleDateString('en-US',{day:'2-digit',...date_option}) +
    " T " +
    date.toLocaleTimeString('en-US',date_option)
;
        console.log('local_time');
        console.log(local_time);

        //get user-agent info
        const this_user = `${event.headers['user-agent']}`;
        console.log(this_user);
        // let user_info_response = await axios.get(encodeURI("http://www.useragentstring.com/?uas=" +
        // this_user +
        // "&getJSON=all"));
        // let user_info = user_info_response.data;

        //console.log(user_info);

// console.log(Object.keys(ip_info))
// console.log((ip_info))
  let out = {
          't': date
          , 'ip': this_ip
          , 'user-agent':  this_user
          , 'local_time': local_time
          , 'map': 'https://www.google.com/maps/place/' + ip_info.lat + ',' + ip_info.lon
          , ...ip_info
        //  , ...user_info
        };

         console.log(out);

    //
    //
    // append rows


    const addedRow = await sheet.addRow(out);




  //  const data =JSON.parse(event.body)
    //const addedRow = await sheet.addRow({ ip: '123'}})

      callback(null, {
      statusCode: 200,
      body: ``
      });
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     message: `row added`,
    //   }),
    // }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.toString(),
    }
  }
}
