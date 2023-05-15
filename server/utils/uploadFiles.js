const fs = require("fs");
const path = require("path");

const fileUpload = (file, namePath)=>{
    try {
        let matches = file.match(/^data:(.+);base64,(.+)$/);
        let response = {};
        if(matches.length !== 3) 
            return new Error("Formato invalido, recuerde que debe ser de base64");
        response.type = matches[1];
        let extension = response.type.split("/");
        extension = extension[1];
        response.data = Buffer.from(matches[2], "base64");

        if (
            !fs.existsSync(`${path.dirname(require.main.filename)}/server/public`)
            ){
            fs.mkdirSync(
                `${path.dirname(require.main.filename)}/server${namePath}`,
                true
            );
        }

        let fileName = `${new Date().getTime()}.${extension}`;

        fs.writeFileSync(
            `${path.dirname(require.main.filename)}/server${namePath}/${fileName}`,
            response.data,
            {
                encoding: "utf8",
            }
        );

        return `${namePath}/${fileName}`;
    } catch (error) {
       return new Error("Error de servidor"); 
    }
};

module.exports = {fileUpload};