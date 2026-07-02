const axios = require("axios");

const logData = async (req, res) => {
  const { stack, level, package, message } = req.body;
  if(!stack){
    return res.status(400).json({ error: "stack is required" });
  }
  if(!level){
    return res.status(400).json({ error: "level is required" });
  }
  if(!package){
    return res.status(400).json({ error: "package is required" });
  }
  if(!message){
    return res.status(400).json({ error: "message is required" });
  }
  try {
    const response = await axios.post(process.env.LOG_API, {
      stack,
      level,
      package,
      message,
    },
    {
      headers: {
        'Authorization':`Bearer ${process.env.BEARER_TOKEN}`
      }
    });
    
    console.log(` Logged [${stack}] [${level}] [${package}] ${message}`);
     console.log(`Response Log `,response.data)

    res.status(200).json({
      message: "Log sent successfully",
      data: response.data
    });
    
  } catch (error) {
    console.error(" Failed to send log:", error.message);
    res.status(500).json({ 
      message: "Failed to send log", 
      error: error.message 
    });
  }
};

module.exports = {
  logData,
};