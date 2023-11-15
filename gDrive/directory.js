const drive = require("./gconfig.js");

// async function createDirectory(name) {
//   try {
//     const response = await drive.files.create({
//       requestBody: {
//         name: name, // Specify the name of the new directory
//         mimeType: "application/vnd.google-apps.folder",
//       },
//     });

//     console.log("Directory created:", response.data);
//   } catch (error) {
//     console.error("Error creating directory:", error.message);
//   }
// }

// async function createDirectoryStructure() {
//   try {
//     // Create the main directory "shoot1"
//     const mainDirectoryResponse = await drive.files.create({
//       requestBody: {
//         name: "shoot1",
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
//   } catch (error) {
//     console.error("Error creating directory structure:", error);
//   }
// }

// export default { createDirectoryStructure, createDirectory };
// module.exports = { createDirectoryStructure, createDirectory };

async function createDirectory(parentId, directoryName) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: directoryName,
        mimeType: "application/vnd.google-apps.folder",
        parents: parentId ? [parentId] : [],
      },
    });

    return response.data.id;
  } catch (error) {
    console.error(`Error creating ${directoryName} directory:`, error);
    throw error;
  }
}

async function deleteDirectory(directoryId) {
  try {
    await drive.files.delete({
      fileId: directoryId,
    });
    console.log(`Directory with ID ${directoryId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting directory with ID ${directoryId}:`, error);
    throw error;
  }
}

async function createDirectoryStructure() {
  try {
    // Create the main directory "shoot1"
    const mainDirectoryId = await createDirectory(null, "shoot1");

    // Create "raw" and "edited" directories inside the main directory "shoot1"
    const rawDirectoryId = await createDirectory(mainDirectoryId, "raw");
    const editedDirectoryId = await createDirectory(mainDirectoryId, "edited");

    // Create "photo" and "video" directories inside the "raw" directory
    await createDirectory(rawDirectoryId, "photo");
    await createDirectory(rawDirectoryId, "video");

    // Create "photo" and "video" directories inside the "edited" directory
    await createDirectory(editedDirectoryId, "photo");
    await createDirectory(editedDirectoryId, "video");

    // Delete any unwanted directories created along with "shoot1"
    await deleteDirectory(rawDirectoryId);
    await deleteDirectory(editedDirectoryId); 

    console.log("Directory structure created successfully!");
  } catch (error) {
    console.error("Error creating directory structure:", error);
  }
}


createDirectoryStructure();
