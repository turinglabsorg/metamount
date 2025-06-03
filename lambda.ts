import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { fileTypeFromBuffer } from "file-type";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

app.get(
  "/:hash*",
  async function (req: Request<{ hash: string; "0": string }>, res) {
    let timeout = setTimeout(function () {
      res.status(404).send("FILE_NOT_FOUND");
    }, 30000);
    try {
      const hash = req.params.hash.replace("ipfs", "");
      const subPath = req.params[0].replace("ipfs", "") || ""; // This captures everything after the hash
      let fullPath = `${hash}${subPath}`;
      console.log("Downloading file from IPFS: " + fullPath);
      // Check if there's an initial / in the fullPath
      if (fullPath.startsWith("/")) {
        fullPath = fullPath.slice(1);
      }
      const response = await axios.get(
        `${process.env.IPFS_PROVIDER || "https://ipfs.io"}/ipfs/${fullPath}`,
        {
          responseType: "stream",
        }
      );

      clearTimeout(timeout);

      // Forward the content type from IPFS
      if (response.headers["content-type"]) {
        res.setHeader("Content-Type", response.headers["content-type"]);
      }

      // Pipe the stream directly to the response
      response.data.pipe(res);
    } catch (e) {
      console.log(e.message);
      clearTimeout(timeout);
      res.status(404).send({ message: "Can't fetch file from IPFS" });
    }
  }
);

app.get("/", (req, res) => {
  res.send("Health Check.");
});

app.listen(3000, () => {
  console.log(`Metamount running.`);
});
