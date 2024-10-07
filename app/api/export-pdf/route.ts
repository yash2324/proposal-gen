import { NextRequest, NextResponse } from "next/server";
import { getProposal } from "@/app/actions/getProposal";
import puppeteer from "puppeteer";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing proposal ID" }, { status: 400 });
  }

  try {
    const proposal = await getProposal(id);

    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 }
      );
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate HTML content for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${proposal.title}</title>
        <style>
          ${getStyles()}
        </style>
      </head>
      <body>
        <div class="container">
          
          <div class="ql-snow">
            <div class="ql-editor">
              ${proposal.content}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(htmlContent);
    const pdf = await page.pdf({
      format: "A4",

      margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
    });

    await browser.close();

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${proposal.title}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Error generating PDF" },
      { status: 500 }
    );
  }
}

function getStyles() {
  return `
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 210mm;
      margin: 0 auto;
      background: white;
    }
    .ql-editor {
      min-height: 100mm;
    }
    .ql-editor img.company-logo {
      max-width: 100px;
      height: auto;
    }
    .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor p {
      margin: 0;
      padding: 8px 0;
    }
    .ql-editor table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    .ql-editor table, .ql-editor th, .ql-editor td {
      border: 1px solid #ddd;
    }
    .ql-editor th, .ql-editor td {
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    td.ql-align-right {
      text-align: right;
    }
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    tr:hover {
      background-color: #f5f5f5;
    }
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .team-member {
      margin-bottom: 1em;
    }
    .proposal-footer {
      text-align: center;
      margin-top: 2em;
      padding-top: 1em;
      border-top: 1px solid #ddd;
    }
  `;
}
