const fs = require("fs");

// asynchronous
// fs.mkdir("temp", { recursive: true }, (err) => {
//   if (err) throw err;
// });

// synchronous
// fs.mkdirSync("Aniket");


// write file
// asynchronous
fs.writeFile("output.txt", "Hello, Node.js!", (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return;
    }
    console.log("File written successfully.");
});

// synchronous
fs.writeFileSync("output.txt", "This is a new file content.");
console.log("File written successfully.");

// read file
// asynchronous
fs.readFile("output.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File content:", data);
});

// synchronous
const data = fs.readFileSync("output.txt", "utf8");
console.log("File content:", data);


// append file
//asynchronous
fs.appendFile("output.txt", "\nAppending new content.", (err) => {
    if (err) {
        console.error("Error appending to file:", err);
        return;
    }
    console.log("Content appended successfully.");
});

// synchronous
fs.appendFileSync("output.txt", "\nAnother line added.");
console.log("Content appended.");


// Deleting files
// asynchronous
fs.unlink("output.txt", (err) => {
    if (err) {
        console.error("Error deleting file:", err);
        return;
    }
    console.log("File deleted successfully.");
});

// synchronous
fs.unlinkSync("output.txt");
console.log("File deleted.");


// checking file existence
if (fs.existsSync("example.txt")) {
    console.log("File exists!");
} else {
    console.log("File does not exist.");
}

// creating and managing directories

// make directory
fs.mkdir("myfolder", (err) => {
    if (err) {
        console.error("Error creating directory:", err);
        return;
    }
    console.log("Directory created.");
});

// removing directory
fs.rmdir("myfolder", (err) => {
    if (err) {
        console.error("Error removing directory:", err);
        return;
    }
    console.log("Directory removed.");
});

// checking if directory exist
if (!fs.existsSync("newfolder")) {
    fs.mkdirSync("newfolder");
    console.log("Directory created.");
} else {
    console.log("Directory already exists.");

}

// reading directory content
fs.readdir(".", (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }
    console.log("Files in directory:", files);
});


// renaming files
fs.rename("oldname.txt", "newname.txt", (err) => {
    if (err) {
        console.error("Error renaming file:", err);
        return;
    }
    console.log("File renamed successfully.");
});



// watching file changes
fs.writeFile

fs.watch("output.txt", (eventType, filename) => {
    console.log(`File ${filename} changed! Event: ${eventType}`);
});
