import express from "express";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId: '6e98aa3ba003d2c279e79711ddbaec88',
    secretAccessKey: 'ba8c1699ef36e159ce70203f14c77593ac2bf2d66e5f0172cc6a731135ea489b',
    endpoint: 'https://964cc39b87cffa873b9b8c1d162da524.r2.cloudflarestorage.com',
})
const app = express();

app.get("/*", async (req, res) => {
    // id.host.com
    const host = req.hostname;
    console.log(host);
    const id = host.split(".")[0];
    const filePath = req.path;
    console.log(filePath);
    console.log(id);
    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
});