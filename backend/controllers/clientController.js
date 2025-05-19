
const asyncHandler = require('express-async-handler');
const Client = require('../models/clientModel');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private/Admin
const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({});
  res.json(clients);
});

// @desc    Get client by ID
// @route   GET /api/clients/:id
// @access  Private/Admin
const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    res.json(client);
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc    Create a client
// @route   POST /api/clients
// @access  Private/Admin
const createClient = asyncHandler(async (req, res) => {
  const { name, company, email, phone, status } = req.body;

  const client = await Client.create({
    name,
    company,
    email,
    phone,
    status
  });

  if (client) {
    res.status(201).json(client);
  } else {
    res.status(400);
    throw new Error('Invalid client data');
  }
});

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Private/Admin
const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    client.name = req.body.name || client.name;
    client.company = req.body.company || client.company;
    client.email = req.body.email || client.email;
    client.phone = req.body.phone || client.phone;
    client.status = req.body.status || client.status;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Private/Admin
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    await client.deleteOne();
    res.json({ message: 'Client removed' });
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc    Get clients by company
// @route   GET /api/clients/company/:companyId
// @access  Private/Admin
const getClientsByCompany = asyncHandler(async (req, res) => {
  const clients = await Client.find({ company: req.params.companyId });
  res.json(clients);
});

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientsByCompany
};
