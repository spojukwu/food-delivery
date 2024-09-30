
const validatefxn =  (req, res)=>{

    return res.status(200).json({
      message: "Successful",
      user: req.user
    })
  }
  module.exports = validatefxn