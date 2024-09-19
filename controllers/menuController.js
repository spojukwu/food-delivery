const Menu = require("../MODEL/menuModel")
//create menu
const menufxn = async(req, res)=>{
    try {
        const menu = new Menu(req.body)
        await menu.save(),
        res.status(201).send(menu)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}
//get menu 
const getMenufxn = async(req, res)=>{
    const menus = await Menu.find()
    res.send(menus);
}
//get oneMenu
const getOneMenufnx = async (req, res)=>{

    try {
        const { id } = req.params
    
        const oneMenu = await Menu.findById(id)
        if(!oneMenu){
            return res.status(404).json({message:"This item does not exist"})
        }
        return res.status(200).json({message:"Successful", menu: oneMenu})
    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: "Internal server error." });  
    }  
}
//updateMenu
const updateMenufnx = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const { itemName, price } = req.body;  

        // Initialize an array to hold validation errors  
        const errors = [];  

        // Validate itemName  
        if (!itemName || typeof itemName !== 'string' || itemName.trim() === '') {  
            errors.push("itemName is required and must be a non-empty string.");  
        }  

        // Validate price  
        if (price === undefined || typeof price !== 'number' || price < 0) {  
            errors.push("price is required and must be a non-negative number.");  
        }  

        // If there are validation errors, return the errors in the response  
        if (errors.length > 0) {  
            return res.status(400).json({ errors });  
        }  

        // Proceed to update the menu item if validation is successful  
        const updatedMenu = await Menu.findByIdAndUpdate(  
            id,  
            { itemName, price },  
            { new: true }  
        );  

        // Check if the menu item was found and updated  
        if (!updatedMenu) {  
            return res.status(404).json({ message: "Menu item not found." });  
        }  

        return res.status(200).json({ message: "Successful", menu: updatedMenu });  

    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: "Internal server error." });  
    }  
}
const deleteMenufnx = async (req, res)=>{
    try {
        const { id } = req.params
        
        const deleteMenu = await Menu.findByIdAndDelete(id)
        if (!deleteMenu){
            return res.status(400).json({message: "User not found"})
        }
        return res.status(200).json({message: "Successful"})
    }catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: "Internal server error." });  
    }  
}


module.exports = {
    menufxn,
    getMenufxn,
    getOneMenufnx,
    updateMenufnx,
    deleteMenufnx
}