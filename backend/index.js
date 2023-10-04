const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ServerClient } = require('postmark');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Postmark client with your API token
const postmark = new ServerClient('2c735e29-6a25-428b-9085-6f5cd7fb6b0e');

// Middleware to parse JSON and form data
app.use(cors());
app.use(bodyParser.json());


// Serve your HTML file
app.get('/', (req, res) => {
  console.log('Success');
});

// Handle form submission
app.post('/submit', (req, res) => {
	const { schoolName, numStudents, schoolEmail, schoolPhone, package, bill } = req.body;

	// Do something with the data
	console.log("Received data:", {
	  schoolName,
	  numStudents,
	  schoolEmail,
	  schoolPhone,
	  package,
	  bill,
	});

  // Prepare template model
  const templateModel = {
    product_url: 'sms.codecraftsmen.com.ng',
    product_name: 'AcademiX',
    school_name: schoolName,
    number_of_students: numStudents,
    school_email: schoolEmail,
    phone_number: schoolPhone,
    package: package,
    bill: bill,
    company_name: 'TheCodeCraftsmen',
    company_address: 'Abuja',
  };

  // Send email using Postmark
  postmark
    .sendEmailWithTemplate({
      From: '191103019@nileuniversity.edu.ng',
      To: schoolEmail,
      TemplateId: 33369652,
      TemplateAlias: 'welcome',
      TemplateModel: templateModel,
      MessageStream: 'outbound',
    })
    .then((response) => {
      console.log('Email sent successfully!', response);
      // You can send a response back to the client here
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      // Handle the error and send a response back to the client
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
