<!--
Student 1: Darsh Patel
Student 2: Bhumitkumar Patel
File: startPage.aspx
Description: This is the client-side of the project which handles all user interface.
Date: 2023-12-03
-->


<!DOCTYPE html>
<html lang="en">

<head runat="server">
    <meta charset="UTF-8">
    <title>Online Text Editor</title>
    <!-- Styles -->
    <style>
        /* General styles */
        body {
            background-color: #212121;
            margin: 0;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            color: #9171f8;
        }

        h1 {
            text-align: center;
        }
        /* Editor container styles */
        .editor-container {
            display: grid;
            grid-template-columns: 0.8fr auto;
            gap: 10px;
            align-items: flex-start;
        }

        #textEditor {
            background-color: lightgray;
            grid-column: 1 / 2;
            resize: none;
            min-width: 250px; /* Adjust this value to change the minimum width */
            width: 100%; /* Set width to 100% for responsiveness */
            height: 400px;
            margin:20px;
            padding: 5px;
            border-radius:10px;
            border: 3px solid black;
            font-size:20px;
        }
        /* Buttons, dropdown, and message styles */
        button,
        #fileList,
        #message{
            padding: 5px;
            background-color: #a668fa;
            grid-column: 2 / 3;
            max-width: 200px; /* Adjust button width */
            margin: 7px 0px 7px 35px;
            border-radius:6px;
            padding: 10px;
            font-size: 15px;
            border: 3px solid black;
        }
        #message{
            background-color:transparent;
            color: lightgray;
            border:0px;
        }
        button:hover
        {
            background-color: #8d4ef7; /* Change background color on hover */
            cursor: pointer; /* Show pointer cursor on hover */
        }
        #fileList {
            background-color: lightgray;
            min-width: 100px; /* Adjust minimum width */
            margin: 20px 0px 7px 35px;
        }
        #saveAs{
            margin-left: 10px;
        }
        /* Popup styles */
        #popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);   
            padding: 15px 20px 20px;
            border: 1px solid #ccc;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            border-radius:5px;
            background-color:black;
        }
        #popupOverlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
    </style>
</head>

<body>
    <div>
        <!-- Header -->
        <h1>My Text Editor</h1>
    </div>
    <!-- Main Editor Container -->
    <div class="editor-container">
        <!-- Textarea for text editing -->
        <textarea id="textEditor" placeholder="Enter text here"></textarea>
        <!-- Sidebar with file-related actions -->
        <div>
            <!-- Dropdown to display available files -->
            <select id="fileList">
                <option style="color:darkgray">--Select a file--</option>
            </select>
            <br>
            <!-- Buttons for actions -->
            <button id="loadContent" >Load Content</button>
            <br>
            <button id="save">Save</button>
            <button id="saveAs">Save As</button>
            <br>
            <!-- Message display area -->
            <p id="message"></p>
        </div>
        <!-- Popup for Save As action -->
        <div id="popupOverlay"></div>
        <div id="popup">
            <h2 style="text-align:center">Save New File</h2>
            <input type="text" id="newFileName" placeholder="Enter the name of new file" style="font-size:15px; margin-bottom:20px;padding: 7px; margin-right:10px;"/>
            <button onclick="closePopup()"style="margin:0px;">Save</button>
        </div>

    </div>
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
    <script>
        $(document).ready(function () {
            load_files();
        });
    </script>
</body>

</html>