const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const drive = require("./gDrive/gconfig");
const cors = require("cors");
const port = 5000;

app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// create directory
app.post("/create-dir", async (req, res) => {
  try {
    const { directoryName } = req.body; // Assuming you have a 'directoryName' field in your request body
    if (!directoryName) {
      return res.status(400).json({ message: "Directory name is required" });
    }
    const response = await drive.files.create({
      requestBody: {
        name: directoryName, // Specify the name of the new directory
        mimeType: "application/vnd.google-apps.folder",
      },
    });
    console.log("done ");
    console.log("Directory created:", response.data);
    res.json({ message: "Directory created", data: response.data });
  } catch (error) {
    console.error("Error creating directory:", error.message);
    res
      .status(500)
      .json({ message: "Error creating directory", error: error.message });
  }
});

// create directory structure
// app.post("/create-dir-structure", async (req, res) => {
//   try {
//     const { directoryName } = req.body; // Assuming you have a 'directoryName' field in your request body
//     if (!directoryName) {
//       return res.status(400).json({ message: "Directory name is required" });
//     }
    
//     const mainDirectoryResponse = await drive.files.create({
//       requestBody: {
//         name: directoryName,
//         mimeType: "application/vnd.google-apps.folder",
//       },
//     });

//     const mainDirectoryId = mainDirectoryResponse.data.id;

//     // Create subdirectories "raw" and "edited" inside the main directory
//     const rawDirectoryResponse = await drive.files.create({
//       requestBody: {
//         name: "raw",
//         mimeType: "application/vnd.google-apps.folder",
//         parents: [mainDirectoryId],
//       },
//     });

//     const editedDirectoryResponse = await drive.files.create({
//       requestBody: {
//         name: "edited",
//         mimeType: "application/vnd.google-apps.folder",
//         parents: [mainDirectoryId],
//       },
//     });

//     const rawDirectoryId = rawDirectoryResponse.data.id;
//     const editedDirectoryId = editedDirectoryResponse.data.id;

//     // Create subdirectories "photo" and "video" inside the "raw" directory
//     const rawPhotoDirectoryResponse = await drive.files.create({
//       requestBody: {
//         name: "photo",
//         mimeType: "application/vnd.google-apps.folder",
//         parents: [rawDirectoryId],
//       },
//     });

//     const rawVideoDirectoryResponse = await drive.files.create({
//       requestBody: {
//         name: "video",
//         mimeType: "application/vnd.google-apps.folder",
//         parents: [rawDirectoryId],
//       },
//     });

//     // Create subdirectories "photo" and "video" inside the "edited" directory
//     const editedPhotoDirectoryResponse = await drive.files.create({
//       requestBody: {
//         name: "photo",
//         mimeType: "application/vnd.google-apps.folder",
//         parents: [editedDirectoryId],
//       },
//     });

//     const editedVideoDirectoryResponse = await drive.files.create({
//       requestBody: {
//         name: "video",
//         mimeType: "application/vnd.google-apps.folder",
//         parents: [editedDirectoryId],
//       },
//     });

//     console.log("Directory structure created successfully!");
//     res.json({ message: "Directory structure created successfully!" });
//   } catch (error) {
//     console.error("Error creating directory structure:", error);
//   }
// });
app.post("/create-dir-structure", async (req, res) => {
    try {
      const { directoryName } = req.body;
      if (!directoryName) {
        return res.status(400).json({ message: "Directory name is required" });
      }
      
      const mainDirectoryResponse = await drive.files.create({
        requestBody: {
          name: directoryName,
          mimeType: "application/vnd.google-apps.folder",
        },
      });
  
      const mainDirectoryId = mainDirectoryResponse.data.id;
  
      // Create subdirectories "raw" and "edited" inside the main directory
      const rawDirectoryResponse = await drive.files.create({
        requestBody: {
          name: "raw",
          mimeType: "application/vnd.google-apps.folder",
          parents: [mainDirectoryId],
        },
      });
  
      const editedDirectoryResponse = await drive.files.create({
        requestBody: {
          name: "edited",
          mimeType: "application/vnd.google-apps.folder",
          parents: [mainDirectoryId],
        },
      });
  
      const rawDirectoryId = rawDirectoryResponse.data.id;
      const editedDirectoryId = editedDirectoryResponse.data.id;
  
      // Create subdirectories "photo" and "video" inside the "raw" directory
      const rawPhotoDirectoryResponse = await drive.files.create({
        requestBody: {
          name: "photo",
          mimeType: "application/vnd.google-apps.folder",
          parents: [rawDirectoryId],
        },
      });
  
      const rawVideoDirectoryResponse = await drive.files.create({
        requestBody: {
          name: "video",
          mimeType: "application/vnd.google-apps.folder",
          parents: [rawDirectoryId],
        },
      });
  
      // Create subdirectories "photo" and "video" inside the "edited" directory
      const editedPhotoDirectoryResponse = await drive.files.create({
        requestBody: {
          name: "photo",
          mimeType: "application/vnd.google-apps.folder",
          parents: [editedDirectoryId],
        },
      });
  
      const editedVideoDirectoryResponse = await drive.files.create({
        requestBody: {
          name: "video",
          mimeType: "application/vnd.google-apps.folder",
          parents: [editedDirectoryId],
        },
      });
  
      console.log("Directory structure created successfully!");
      res.json({ message: "Directory structure created successfully!" });
    } catch (error) {
      console.error("Error creating directory structure:", error);
      res.status(500).json({ message: "Error creating directory structure", error: error.message });
    }
  });

  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
