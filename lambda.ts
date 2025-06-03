import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { fileTypeFromBuffer } from "file-type";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

app.get("/:hash", async function (req, res) {
  let timeout = setTimeout(function () {
    res.status(404).send("FILE_NOT_FOUND");
  }, 30000);
  try {
    const hash = req.params.hash;
    console.log("Downloading file from IPFS: " + hash);
    const response = await axios.get(
      `${process.env.IPFS_PROVIDER || "https://ipfs.io"}/ipfs/${hash}`,
      {
        responseType: "arraybuffer",
      }
    );
    const buffer = Buffer.from(response.data, "binary");
    clearTimeout(timeout);
    const fileType = await fileTypeFromBuffer(buffer);
    console.log("File type: ", fileType);
    if (fileType === undefined) {
      res.setHeader("Content-Type", "application/octet-stream");
    } else {
      res.setHeader("Content-Type", fileType.mime);
    }
    res.end(buffer);
  } catch (e) {
    console.log(e.message);
    clearTimeout(timeout);
    res.status(404).send({ message: "Can't fetch file from IPFS" });
  }
});

app.listen(3000, () => {
  console.log(`Metamount running.`);
});
