import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../config/db_config.js";

export const getClasses = asyncHandler(async(req, res) => {
    const classes = await prisma.class.findMany();
    if (classes.length === 0) {
      throw new apiError(404, "No class found");
    }
    return res.status(200).json(new apiResponse(200, classes ));
});

export const createClass = asyncHandler(async (req, res) => {
  const { name, section } = req.body;

    const existing = await prisma.class.findUnique({
      where: { name }
    });

    if (existing) {
      throw new apiError(409, "Class already exists");
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        section,
      }
    });

    return res.status(201).json(new apiResponse(201, "Class created successfully" ));
});

export const findClass = async (req, res) => {
  const classId = Number(req.params.id);

  try {
    const existClass = await prisma.class.findUnique({
      where: { id: classId }
    });
    if (!existClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({ existClass });

  } catch (error) {
    console.log("Error while finding class by ID", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const editClass = asyncHandler(async (req, res) => {

});

export const deleteClass = asyncHandler(async (req, res) => {

});
