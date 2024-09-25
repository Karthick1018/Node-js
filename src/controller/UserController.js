import UserModel from "../model/UserModel.js";



export async function getUsers(req, res) {
    try {
        const data = await UserModel.find({});
        const listData = [{
            data: data,
            count: data.length
        }];
        res.json(listData);
    } catch (e) {
        res.json(e);
    }
}
export async function createUser(req, res) {
    try {
        const NewUser = new UserModel({
            name: req.body.name,
            age: req.body.age,
            mobile: req.body.mobile
        });

        // Save the new user to the database
        const savedUser = await NewUser.save();

        // Send a success response
        res.status(201).json({
            message: 'User created successfully',
            status_code: 201
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Error creating user',
            error: e
        });
    }
}
export async function updateUser(req, res) {
    try {
        const { _id } = req.params;
        const { name, age, mobile } = req.body;
        // Update the user by ID
        const updatedUser = await UserModel.findByIdAndUpdate(
            _id,
            { name, age, mobile },
            { new: true }
        );

        if (updatedUser) {
            res.status(200).json({
                message: 'User updated successfully',
                status_code: 200
            });
        } else {
            res.status(404).json({
                message: 'User not found',
                status_code: 400
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Error updating user',
            error: e
        });
    }
}
export async function deleteUser(req, res) {
    try {
        const { _id } = req.params; // Get the user ID from route parameters

        // Delete the user by ID
        const deleteUser = await UserModel.findByIdAndDelete(_id); // Only pass the ID

        if (deleteUser) {
            res.status(200).json({
                message: 'User deleted successfully',
                status_code: 200
            });
        } else {
            res.status(404).json({
                message: 'User not found',
                status_code: 404 // Use 404 status code for not found
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Error deleting user', // Change the message to reflect the delete action
            error: e
        });
    }
}
