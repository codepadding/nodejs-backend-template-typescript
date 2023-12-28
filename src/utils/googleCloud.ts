import { Storage } from "@google-cloud/storage";
import path from "path";

// Create a Storage instance with the service account key file path
const storage = new Storage({
    keyFilename: path.join(__dirname, "../../service_account.json"), // Replace with your service account file path
});

export async function uploadFileToGC(
    filePath: string,
    destinationFileName: string
) {
    const bucketName = "datadocx";
    try {
        // Specify the bucket and file path for upload
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(destinationFileName);

        // Upload the file to the specified location in the bucket
        await file.save(filePath);

        console.log(
            `File ${filePath} uploaded to ${destinationFileName} in ${bucketName}.`
        );
    } catch (err) {
        console.error("Error uploading file:", err);
    }
}

export async function deleteFileFromGC(fileName: string) {
    const bucketName = 'datadocx';
    try {
      // Specify the bucket and file to be deleted
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(fileName);
  
      // Delete the file from the bucket
      await file.delete();
  
      console.log(`File ${fileName} deleted from ${bucketName}.`);
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  }