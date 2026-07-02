const axios = require("axios");

async function Log(stack, level, packageName, message) {
    try {
        await axios.post(
            process.env.LOG_API,
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.BEARER_TOKEN}`
                }
            }
        );
    } catch (error) {
        console.log("Log Error:", error.message);
    }
}

module.exports = Log;