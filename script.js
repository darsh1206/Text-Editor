/*
Student 1: Darsh Patel
Student 2: Bhumitkumar Patel
File: script.js
Description: This is the javascript file which calls the server for various needs.
Date: 2023-12-03
*/

// Function to load files into the dropdown list
function load_files() {
    // AJAX call to fetch the list of files from the server
    $.ajax({
        method: 'POST',
        url: 'FileHandler.aspx/LoadFiles', // Endpoint to fetch file list
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            try {
                // Parsing the received JSON data to get file names
                var innerArray = JSON.parse(data.d);

                // Clearing the existing dropdown and populating it with file names
                $('#fileList').empty();
                $('#fileList').append($('<option>').text("--Select a file--").val("--Select a file--"));
                innerArray.forEach(function (item) {
                    $('#fileList').append($('<option>').text(item).val(item));
                });
            } catch (error) {
                console.error('Error parsing inner JSON:', error);
            }
        },
        error: function (xhr, status, error) {
            // Handling errors in AJAX call to fetch file list
            console.error('AJAX Error:', status, error);
            console.log(xhr.responseText);
        }
    });
};

// Event listener for the "Load Content" button
$('#loadContent').click(function () {
    // Retrieving the selected file name from the dropdown
    var fileName = $('#fileList').val();

    // Checking if a valid file is selected
    if (fileName != "--Select a file--" && fileName != null) {
        // AJAX call to fetch the content of the selected file
        $.ajax({
            url: 'FileHandler.aspx/GetFileContent',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ fileName: fileName }),
            success: function (data) {
                // Parsing received file content and displaying it in the text editor
                var innerArray = JSON.parse(data.d);
                $('#textEditor').val(innerArray);

                // Displaying success message after loading file content
                var message = document.getElementById("message");
                message.textContent = "File contents loaded!";
                message.style.color = "green";
                message.style.fontSize = "20px";
                message.style.fontFamily = "Times New Roman";
            },
            error: function (e) {
                // Handling errors during file content retrieval
                console.error('Error loading File Content:', e);
                var message = document.getElementById("message");
                message.textContent = "Error loading file contents";
                message.style.color = "red";
                message.style.fontSize = "20px";
                message.style.fontFamily = "Times New Roman";
            }
        });
    } else {
        // Displaying a message if no file is selected
        var message = document.getElementById("message");
        message.textContent = "Please, Select a file.";
        message.style.color = "red";
        message.style.fontSize = "20px";
        message.style.fontFamily = "Times New Roman";
    }
});

// Event listener for the "Save" button
$('#save').click(function () {
    // Code to save the content of the text editor
    var fileName = $('#fileList').val();
    var fileData = $('#textEditor').val();
    var message = document.getElementById("message");
    message.style.fontSize = "20px";
    message.style.fontFamily = "Times New Roman";

    // Validation to ensure a file is selected
    if (fileName != "--Select a file--" && fileName != null) {
        // AJAX call to save the file content
        $.ajax({
            url: 'FileHandler.aspx/SaveFile',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ fileName: fileName, fileData: fileData }),
            success: function (data) {
                // Displaying a success message on successful file save
                message.textContent = "File saved successfully!";
                message.style.color = "green";
            },
            error: function (e) {
                // Handling errors during file save
                message.textContent = "Error saving file";
                message.style.color = "red";
            }
        });
    }
});

// Event listener for the "Save As" button to open the popup
$('#saveAs').click(function () {
    openPopup(); // Function to open the Save As popup
});

// Function to open the Save As popup
function openPopup() {
    var popup = document.getElementById('popup');
    var overlay = document.getElementById('popupOverlay');
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

// Function to close the Save As popup and save the new file
function closePopup() {
    var popup = document.getElementById('popup');
    var overlay = document.getElementById('popupOverlay');

    popup.style.display = 'none';
    overlay.style.display = 'none';

    // Saving the new file content using AJAX after closing the popup
    var fileName = $('#newFileName').val();
    var fileData = $('#textEditor').val();
    var message = document.getElementById("message");
    message.textContent = "File saved successfully!";
    message.style.color = "green";
    message.style.fontSize = "20px";
    message.style.fontFamily = "Times New Roman";

    // Validation checks for file name and data
    if (fileName != "" && fileData != "") {
        // AJAX call to save the new file
        $.ajax({
            url: 'FileHandler.aspx/SaveAsFile',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ fileName: fileName, fileData: fileData }),
            success: function (data) {
                // Reloading the file list after successful file creation
                load_files();
                message.textContent = "File created successfully!";
                message.style.color = "green";
            },
            error: function (e) {
                // Handling errors during new file creation
                message.textContent = "Error saving new file";
                message.style.color = "red";
            }
        });
    } else {
        // Displaying error messages for empty file name or data
        if (fileData == "") {
            message.textContent = "File data cannot be empty!";
        } else {
            message.textContent = "File name cannot be empty!";
        }
        message.style.color = "red";
    }
}
