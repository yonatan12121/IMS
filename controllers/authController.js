const User = require('../models/User');
const generateToken = require('../utils/jwt');

// POST /api/users/register
exports.register = async (req, res) => {
    const { name, userName, password, role, email } = req.body;

    try {
        // Check if the userName or email already exists
        let user = await User.findOne({ $or: [{ userName }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({
            name,
            userName,
            password,
            role,
            email
        });

        // Save the user
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
// POST /api/users/login
exports.login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Find the user by userName
        const user = await User.findOne({ userName });

        if (user && (await user.matchPassword(password))) {
            // Generate token with user ID and role
            const token = generateToken(user._id, user.role);

            res.json({
                _id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                role: user.role,
                token,
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// GET /api/users/profile
exports.getProfile = async (req, res) => {
    try {
        // Find the user by ID from the JWT token payload
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
