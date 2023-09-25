const express = require('express');
const router = express.Router();
const { Student } = require('../models/');

router.post('/students', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/students', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ error: `Student with ID ${studentId} not found` });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const [rowsUpdated] = await Student.update(req.body, {
            where: { id: studentId },
        });
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: `Student with ID ${studentId} not found` });
        }
        res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const rowsDeleted = await Student.destroy({
            where: { id: studentId },
        });
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: `Student with ID ${studentId} not found` });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
