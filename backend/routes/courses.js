const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', auth, async (req, res) => {
    try {
        const newCourse = new Course({
            ...req.body,
            instructor: req.user.id
        });
        const course = await newCourse.save();
        res.send(course);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router; 