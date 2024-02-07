/*
Student 1: Darsh Patel
Student 2: Bhumitkumar Patel
File: FileHandler.aspx.cs
Description: This is the server of the project which handles all the logical operations.
Date: 2023-12-03
*/


using System;
using System.IO;
using System.Web;
using System.Web.Script.Serialization;  
using System.Web.Services;

public partial class FileHandler : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // This method is triggered when the page loads; currently, it's empty.
    }

    /*
    Function: LoadFiles()
    Parameters: None
    Description: This method loads the files in file list.
    Return values: json file list
    */
    [WebMethod]
    public static string LoadFiles()
    {
        string path = HttpContext.Current.Server.MapPath("MyFiles/"); // Get the server's path to the folder

        if (Directory.Exists(path)) // Check if the directory exists
        {
            string[] files = Directory.GetFiles(path); // Get all file paths in the directory

            // Extract only file names without paths
            for (int i = 0; i < files.Length; i++)
            {
                files[i] = Path.GetFileName(files[i]);
            }

            // Convert the array of file names to a JSON string
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string json = serializer.Serialize(files);
            json.Trim(); // Trimming the JSON string (doesn't change the original string)

            // Return the JSON representation of the file names
            return json;
        }
        else
        {
            // Return an error message if the folder is not found
            return "{\"error\": \"Folder not found\"}";
        }
    }

    /*
    Function: GetFileContent()
    Parameters: string fileName: name of file
    Description: This method returns the content of a file.
    Return values: json file content
    */
    [WebMethod]
    public static string GetFileContent(string fileName)
    {
        try
        {
            string filePath = HttpContext.Current.Server.MapPath("~/MyFiles/") + fileName;

            if (File.Exists(filePath)) // Check if the file exists
            {
                string fileContent = File.ReadAllText(filePath); // Read the content of the file

                // Convert the file content to a JSON string
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string json = serializer.Serialize(fileContent);

                // Set content type for success response
                HttpContext.Current.Response.ContentType = "application/json";
                return json; // Return the file content as JSON
            }
            else
            {
                // Return an error message if the file is not found
                return "{\"error\": \"File not found\"}";
            }
        }
        catch (Exception ex)
        {
            // Return an error message if an exception occurs during file content retrieval
            return "{\"error\": \"" + ex.Message + "\"}";
        }
    }

    /*
    Function: SaveFile()
    Parameters: string fileName: name of file
                string fileData: data to be saved 
    Description: This method saves the contents in a file.
    Return values: None
    */
    [WebMethod]
    public static void SaveFile(string fileName, string fileData)
    {
        try
        {
            string filePath = HttpContext.Current.Server.MapPath("~/MyFiles/") + fileName;

            if (File.Exists(filePath)) // Check if the file exists
            {
                File.WriteAllText(filePath, fileData); // Write the content to the file
            }
            else
            {
                Console.WriteLine("File not found!");
            }
        }
        catch (Exception ex)
        {
            // Log the exception if an error occurs during file saving
            Console.WriteLine(ex.Message);
        }
    }

    /*
    Function: SaveAsFile()
    Parameters: string fileName: name of new file
                string fileData: data to be saved 
    Description: This method creates new file and saves the contents in a file.
    Return values: None
    */
    [WebMethod]
    public static void SaveAsFile(string fileName, string fileData)
    {
        try
        {
            string filePath = HttpContext.Current.Server.MapPath("~/MyFiles/") + fileName;
            File.WriteAllText(filePath, fileData); // Write the content to a new file
        }
        catch (Exception ex)
        {
            // Log the exception if an error occurs during new file creation
            Console.WriteLine(ex.Message);
        }
    }
}
