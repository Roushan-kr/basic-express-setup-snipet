import User from "../../models/user/User.model.js";
import { Router } from "express";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const router = Router();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    sameSite: 'strict',
};

// affter sucessful login, user can update his/her profile
// also need user to refresh their page to get updated data
router.put("/", asyncHandler(async (req, res) => {
    const { userName, fName, email, password, role, semester, section } = req.body;

    // Validate required fields
    const requiredFields = [userName, fName, email, password, role];
    if (requiredFields.some(field => !field)) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Additional validation for students
    if (role === "student") {
        if (!semester || !section) {
            return res.status(400).json({ message: "Please provide semester and section for a student." });
        }
    }

    // Check if the user already exists
    const userExists = await User.findOne({ $or: [{ email }, { userName }] });
    if (userExists) {
        throw new ApiError(400, "User already exists");
    }

    // Create new user
   const user = await User.create({ userName, fName, email, password, role, ...(role === "student" && { semester, section }) });
    const authToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();
    // Send response
    const response = new ApiResponse(201,{}, "User created successfully.");
    res.cookie("token", authToken, cookieOptions);
    res.cookie("reftoken", refreshToken, cookieOptions);
    res.status(response.status).json(response);
   
}));

// auth.protect, via middleware
router.get("/", asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const users = await User.findById(userId).select("-password");
    const response = new ApiResponse(200, users);
    res.status(response.status).json(response);
}));

router.put("/student/update", asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { userName, email, password, role, fatherName, mobile, department, semester, section, DOJ } = req.body;

    // Validate if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Validate required fields
    if (!userName || !email || !password || !role || !fatherName || !mobile || !department) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Additional validation for students
    if (role === "student") {
        if (!semester || !section) {
            return res.status(400).json({ message: "Semester and Section are required for students." });
        }
    }

    // Check if the updated email or username already exists for another user
    const checkUser = await User.findOne({ 
        $or: [{ email }, { userName }], 
        _id: { $ne: userId } // Exclude current user
    });

    if (checkUser) {
        throw new ApiError(400, ["Email or Username already in use by another user."]);
    }

    // Update user fields
    user.userName = userName;
    user.email = email;
    user.password = password;
    user.role = role;
    user.fatherName = fatherName;
    user.mobile = mobile;
    user.department = department;
    user.DOJ = DOJ;

    // Conditionally update fields for students
    if (role === "student") {
        user.semester = semester;
        user.section = section;
    } else {
        // Remove semester and section if not a student
        user.semester = undefined;
        user.section = undefined;
    }

    // Save the updated user
    const authToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();
    await user.save();
    res.cookie("token", authToken, cookieOptions);
    res.cookie("reftoken", refreshToken, cookieOptions);
    const response = new ApiResponse(200,{}, "User updated successfully.");
    res.status(response.status).json(response);
}));

router.put("/faculty/update", asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { userName, email, password, role, fatherName, mobile, department, DOJ } = req.body;

    // Validate if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Validate required fields
    if (!userName || !email || !password || !role || !fatherName || !mobile || !department) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Check if the updated email or username already exists for another user
    const checkUpdate = await User.findOne({ 
        $or: [{ email }, { userName }], 
        _id: { $ne: userId } // Exclude current user
    });
    if(checkUpdate){
        throw new ApiError(400, ["Email or Username already in use by another user."]);
    }

    // Update user fields
    user.userName = userName;
    user.email = email;
    user.password = password;
    user.role = role;
    user.fatherName = fatherName;
    user.mobile = mobile;
    user.department = department;
    user.DOJ = DOJ;

    // Save the updated user
    const authToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();
    await user.save();

    res.cookie("token", authToken, cookieOptions);
    res.cookie("reftoken", refreshToken, cookieOptions);
    const response = new ApiResponse(200,{}, "User updated successfully.");
    res.status(response.status).json(response);
}));

router.delete("/", asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { password } = req.body;
    if(!password){
        throw new ApiError(400, "Please provide password to delete your account.");
    }
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404, "User not found.");
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw new ApiError(400, "Invalid password.");
    }
    // Delete user
    await User.findByIdAndDelete(userId);
    const response = new ApiResponse(200,{}, "User deleted successfully.");
    res.status(response.status).json(response);
}));

export default router;
