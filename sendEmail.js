const nodemailer = require("nodemailer")


const sendUserEmail = async (userEmail )=>{
    
    try {

        // Login Details
    
        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        })
        // Details to send
    
        const detailsToSend = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: "WELCOME TO BACKEND DEV",
            html: `<div>
            <h1>Hello, user</h1>  
            <h2>This is a confirmation Email</h2>  
            <h4> Dear ${userEmail}, welcome to backend software development</h4>  
            <p style="color: blue;">Thanks! We wish to inform you that you have successfully enrolled in web app development.</p>
            </div>`
        }
        const result = await mailTransporter.sendMail(detailsToSend)
    
        
    } catch (error) {
        console.log(error)
    }
}




module.exports = sendUserEmail