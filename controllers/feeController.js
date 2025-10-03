import prisma from "../config/db_config.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getFees = asyncHandler(async(req, res) => {

});

export const createFees = asyncHandler(async(req, res) => {
  const { amount, dueDate, status, paidAmount, paymentDate, studentId} = req.body;
  const existing = await prisma.fee.findFirst({
   where: { studentId }
  });

  if(existing) {
    throw new apiError(409, "Fee already exists for this student");
   }

  const newFee = await prisma.fee.create({
    data:{
      amount,
      dueDate,
      status,
      paidAmount,
      studentId,
    }
  });

  return res.status(201).json(new apiResponse(201, "Fee created successfully", newFee));
});