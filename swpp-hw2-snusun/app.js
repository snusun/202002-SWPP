// TODO: edit this file

// This is a list where your records should be stored. See `parseAndSave`.
let records = [];

// `parseAndSave(text)` is a function called with one argument `text`, the content of the babyname CSV file.
// It is invoked only once at the start of application.
// TODO: parse the csv text and save data records into the global variable `records` properly,
// so that the other functions use them with ease. After calling this function, `records` should
// contain the parsed data of every year like below.
//     e.g. records: [{year: 2001, rank: 1, name: "Jacob", gender: "M", rankChange: null},
//                    {year: 2001, rank: 2, name: "Michael", gender: "M", rankChange: null},
//                    ...]
// Note: a CSV text can end with trailing line-break character '\n'. Whether it exists or not, 
// the function should parse `text` correctly. Also, records should be stored in the same order
// in which they appear in a csv text. You can assume that at the first line is always a csv header.
function parseAndSave(text) {
    // TODO: Fill this function. (3 points)
    var textLines = text.split(/\r\n|\n/);
 
    for(var i=1; i<textLines.length-1; i++) {
        var data = textLines[i].split(',');
        records[i-1] = {
            year: Number(data[0]),
            rank: Number(data[1]),
            name: data[2],
            gender: data[3],
            rankChange: (data[4] === "") ? null : Number(data[4])
        };
    }
    //console.log(records);
}


// `provideYearData(year)` is a function that receives a year and returns an array of data object corresponding to that year.
// Note that male and female record with the same rank should be joined together to form one object.
// TODO: return all data objects of a specific year, that are joined and organized by rank in an ascending order.
// The example of returned array is as follows.
//     e.g. [{rank: 1, male: "Jacob", maleRankChange: 0, female: "Isabella", femaleRankChange: 0},
//           {rank: 2, male: "Ethan", maleRankChange: 0, female: "Sophia", femaleRankChange: -2},    
//           ...,
//           {rank: 1000, male: "Keshawn", maleRankChange: 113, female: "Karley", femaleRankChange: 17}]
function provideYearData(year) {
    // TODO: Fill in this function. (5 points)
    var yearRecords = [];

    for(var i=0; i<records.length; i++) {
        if(records[i].year === year) {
            if(yearRecords[records[i].rank-1] == null) {
                yearRecords[records[i].rank-1] = { rank: records[i].rank }; 
            }
            if(records[i].gender === 'M') {
                yearRecords[records[i].rank-1].male = records[i].name;
                yearRecords[records[i].rank-1].maleRankChange = records[i].rankChange;
            }
            else if(records[i].gender === 'F') {
                yearRecords[records[i].rank-1].female = records[i].name;
                yearRecords[records[i].rank-1].femaleRankChange = records[i].rankChange;
            }
        }
        else continue;
    }
    //console.log(yearRecords);
    
    // This is just a reference for the return value's format. Delete this and fill your own 
    // proper code to return the correct data.
    return yearRecords;
}

// provideChartData(name, gender) is a function called when a user wants
// to see the chart showing the year-on-year change of rank of a specific name.
// TODO: return a list of all objects from 2001 to 2018 in the format of `{year: <year>, rank: <rank>}`
// of a specific name specified by the arguments, name and gender.
// If there are no records with the name and gender for some years,
// either you can set the values of the ranks to `undefined` or not return those records at all.
// The example of return data is as follow.
//     e.g. [{year: 2001, rank: undefined},
//           {year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
// You can also return data excluding `undefined` value as below.
//     e.g. [{year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
function provideChartData(name, gender) {
    // TODO: Fill in this function. (2 points)
    var chartData = [];

    for(var i=0; i<records.length; i++) {
        if(records[i].name == name && records[i].gender == gender) {
            chartData[i] = { year: records[i].year, rank: records[i].rank};
        }
    }

    //console.log(chartData);
    // This is just a reference for the return value's format. Delete this and fill your own 
    // proper code to return the correct data.
    return chartData;
}


// `handleSignUpFormSubmit(form)` is called when a user submits the sign up form.
// `form` is the target HTML form element (L82~ in index.html).
// TODO: validate the form. (5 points)
function handleSignUpFormSubmit(form) {
    // TODO: Fill in the rest of function to get the HTML form element as above.

    // Hint: you can use the `RegExp` class for matching a string.

    // The return data format is as follows. For the given `form` argument, you should
    // correctly process the validation, filling in `alertMessage`, and `validationResults`. 
    // When you deal with `validationResults`, the values of `message` should be set to `null`
    // for the valid input fields. (See the example below.)
    // Below is just a reference for the return value's format. Delete this and fill your own
    // proper code to return the correct data.

    // IMPORTANT NOTE: You must use the argument `form` rather than directly using APIs such as `document.getElementId` or `document.querySelector`.
    //                 Plus, please do not call `alert` function here.
    //                 For debugging purpose, you can use `console.log`.
    let firstName = form['first-name'].value;
    let lastName = form['last-name'].value;
    let Email = form['email'].value;
    let dateOfBirth = form['date-of-birth'].value;

    var firstPat = new RegExp(/^[A-Z]{1}[a-z]+$/);
    var firstMes = "Invalid first name";

    var lastPat = new RegExp(/^[A-Z]{1}[a-z]+$/);
    var lastMes = "Invalid last name";

    var EmailPat = new RegExp(/^[^\s@]+@[^\s@\.]+.[A-Za-z]{2,3}$/i);
    var EmailMes = "Invalid email";

    var datePat = new RegExp(/^[\d]{4,4}-[\d]{2,2}-[\d][\d]$/);
    var dateMes = "Invalid date of birth";
    var dateRange = true;
    var dateParse = dateOfBirth.split("-");
    const intDate = dateParse.map(x => Number(x));
    if(intDate[0] < 1900 || intDate[0] > 2020) dateRange = false;
    if(intDate[1] < 1 || intDate[1] > 12) dateRange = false;
    if(intDate[2] < 1 || intDate[2] > 31) dateRange = false;

    firstVal = firstPat.test(firstName);
    lastVal = lastPat.test(lastName);
    EmailVal = EmailPat.test(Email);
    dateVal = datePat.test(dateOfBirth) && dateRange;

    let alertMessage = "You must correct:\n\n";
    if(!firstVal) alertMessage += "First Name\n"; 
    if(!lastVal) alertMessage += "Last Name\n";
    if(!EmailVal) alertMessage += "Email\n";
    if(!dateVal) alertMessage += "Date of Birth\n";
    if(firstVal && lastVal && EmailVal && dateVal)
        alertMessage = "Successfully Submitted!";

    return {
        alertMessage: alertMessage,
        validationResults: [
            {name: "first-name", valid: firstVal, message: (firstVal) ? null : firstMes},
            {name: "last-name", valid: lastVal, message: (lastVal) ? null : lastMes},
            {name: "email", valid: EmailVal, message: (EmailVal) ? null : EmailMes},
            {name: "date-of-birth", valid: dateVal, message: (dateVal) ? null : dateMes}
        ]
    };
    /*
    if(!firstPat.test(firstName)) alertMessage += "First Name\n"; 
    if(!lastPat.test(lastName)) alertMessage += "Last Name\n";
    if(!EmailPat.test(Email)) alertMessage += "Email\n";
    if(!(datePat.test(dateOfBirth) && dateRange)) alertMessage += "Date of Birth\n";
    if(firstPat.test(firstName) && lastPat.test(lastName) && EmailPat.test(Email) && (datePat.test(dateOfBirth) && dateRange))
        alertMessage = "Successfully Submitted!";

    return {
        alertMessage: alertMessage,
        validationResults: [
            {name: "first-name", valid: firstPat.test(firstName), message: firstMes},
            {name: "last-name", valid: lastPat.test(lastName), message: lastMes},
            {name: "email", valid: EmailPat.test(Email), message: EmailMes},
            {name: "date-of-birth", valid: datePat.test(dateOfBirth) && dateRange, message: dateMes}
        ]
    };*/
}
