const Mailgun = require('mailgun-js');

module.exports = async (data) =>{
	const apiKey = 'b30c38a2bb16e533eb19d9cc195d62e7-2a9a428a-d32c3275';
	const domain = 'sandbox48719cc71af648a2b9a05bfed02838e6.mailgun.org';
	const mailgun = new Mailgun({apiKey: apiKey, domain: domain});
  try{
	  let d = await mailgun.messages().send(data);
		return d;
  }
  catch(error){
  	return error
  }
}