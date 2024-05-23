const User = require('../models/User');
const Notification = require('../models/notification ');

const sendNotificationToManagers = async (message) => {
    try {
        // Find all users with the manager role
        const managers = await User.find({ role: 'manager' });

        // Create notifications for each manager
        const notifications = managers.map(manager => ({
            userId: manager._id, // Provide the userId
            message: message,
        }));

        // Save notifications to the database
        const savedNotifications = await Notification.insertMany(notifications);

        // Update the notifications field of each manager user
        const managerIds = managers.map(manager => manager._id);
        await User.updateMany(
            { _id: { $in: managerIds } }, // Find manager users
            { $push: { notifications: { $each: savedNotifications.map(notification => notification._id) } } } // Add notifications to notifications array
        );

        console.log('Notifications sent to managers:', message);
    } catch (error) {
        console.error('Error sending notifications to managers:', error);
    }
};

module.exports = sendNotificationToManagers;
