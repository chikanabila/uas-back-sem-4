const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one car
router.get('/:id', getCar, (req, res) => {
  res.json(res.car);
});

// Create a car
router.post('/', async (req, res) => {
  const car = new Car({
    nama: req.body.nama,
    model: req.body.model,
    tanggal_keluar: req.body.tanggal_keluar
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a car
router.patch('/:id', getCar, async (req, res) => {
  if (req.body.name != null) {
    res.car.name = req.body.name;
  }
  if (req.body.model != null) {
    res.car.model = req.body.model;
  }

  try {
    const updatedCar = await res.car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a car
router.delete('/:id', getCar, async (req, res) => {
  try {
    await res.car.deleteOne();
    res.json({ message: 'Deleted Car' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCar(req, res, next) {
  let car;
  try {
    car = await Car.findById(req.params.id);
    if (car == null) {
      return res.status(404).json({ message: 'Cannot find car' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.car = car;
  next();
}

module.exports = router;
