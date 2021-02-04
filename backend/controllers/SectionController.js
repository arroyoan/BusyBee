import asyncHandler from 'express-async-handler'

import Section from '../models/Section.js'

// @desc    Create a new section
// @route   POST /api/v1/sections/
// @access  Private
const createSection = asyncHandler(async (req, res) => {
  const { title, color } = req.body

  // This creates a new Section
  const section = new Section({
    title,
    color,
    user: req.user._id
  })

  // This sends the new Section to the DB
  const newSection = await Section.create(section)

  res.status(201).json(newSection)

})

// @desc    Get all sections
// @route   GET /api/v1/sections/
// @access  Private
const getAllSections = asyncHandler(async (req, res) => {
  // filter sections with the users _id
  const sections = await Section.find({ user: req.user._id })
  res.status(200).json(sections)
})

// @desc    Get a section by Id
// @route   GET /api/v1/sections/:id
// @access  Private
const getSingleSection = asyncHandler(async (req, res) => {
  // finds by the section id
  const section = await Section.findById(req.params.id)

  // checks if the section exists
  if (section) {
    // check if this section belongs to the user
    if (String(req.user._id) !== String(section.user)) {
      res.status(401)
      throw new Error(`Unauthorized to Access this Section`)
    }

    res.json(section)
  } else {
    res.status(404)
    throw new Error(`Sorry could not find a section with id ${req.params.id}`)
  }
})

// @desc    Update a Section
// @route   PUT /api/v1/sections/:id
// @access  Private
const updateSection = asyncHandler(async (req, res) => {
  const { title, color } = req.body

  const section = await Section.findById(req.params.id)

  // checks if the section exists
  if (section) {
    // Check if this section belongs to the user
    if (String(req.user._id) !== String(section.user)) {
      res.status(401)
      throw new Error(`Unauthorized to Update this Section`)
    }

    // Replaces title and color if there
    section.title = title || section.title
    section.color = color || section.color

    const updatedSection = await section.save({ validateModifiedOnly: true })

    res.status(200).json({
      _id: updatedSection._id,
      title: updatedSection.title,
      color: updatedSection.color,
      user: updatedSection.user
    })
  } else {
    res.status(404)
    throw new Error(`Could not find section with id ${req.params.id}`)
  }
})

// @desc    Delete Section
// @route   DELETE /api/v1/sections/:id
// @access  Private
const deleteSection = asyncHandler(async (req, res) => {
  const section = await Section.findById(req.params.id)

  // checks if the section exists
  if (section) {
    // Check if this section belongs to the user
    if (String(req.user._id) !== String(section.user)) {
      res.status(401)
      throw new Error(`Unauthorized to Delete this Section`)
    }

    await Section.deleteOne({ _id: req.params.id })

    res.status(200).json({})
  } else {
    res.status(404)
    throw new Error(`Could not find section with id ${req.params.id}`)
  }
})


// For now only basic CRUD routes
export {
  createSection,
  getAllSections,
  getSingleSection,
  updateSection,
  deleteSection
}