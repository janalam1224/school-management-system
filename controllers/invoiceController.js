import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import puppeteer from "puppeteer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateInvoice = asyncHandler(async(req, res) => {

const browser = await puppeteer.launch();
const page =  await browser.newPage();
const invoiceData = {
  invoiceNumber: 1234,
  customer: 'janalam',
  product:'electronic mouse',
  price: 30,
}

    const htmlContent = await ejs.renderFile(
      path.join(__dirname, "../views", "invoice.ejs"), invoiceData 
    );

await page.setContent(htmlContent, { waitUntil: 'domcontentloaded'});
const pdfBuffer = await page.pdf({
  format:'A4',
  margin:{ top:'20px', right:'20px', left:'20px', bottom:'20px'}
});

await browser.close();
res.setHeader("Content-Type", "application/pdf");
res.send(pdfBuffer);
});

