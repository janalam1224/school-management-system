import apiError from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
  if(err instanceof apiError){
    return res.status(err.statusCode).json({
      success:err.success,
      message:err.message,
      errors:err.errors,
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}