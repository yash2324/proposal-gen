import OpenAI from "openai";

function sanitizeData(data: any): any {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  const sanitized: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      sanitized[key] = value.map((item) => sanitizeData(item));
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeData(value);
    } else if (key === "name" || key === "email" || key === "phone") {
      sanitized[key] = `[${key.toUpperCase()}]`;
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}
function replaceTokens(text: string, data: any): string {
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        text = replaceTokens(text, { [`${key}_${index}`]: item });
      });
    } else if (typeof value === "object" && value !== null) {
      text = replaceTokens(text, value);
    } else {
      const regex = new RegExp(`\\[${key.toUpperCase()}\\]`, "g");
      text = text.replace(regex, value as string);
    }
  }
  return text;
}

export async function processProposalWithAI(
  templateContent: string,
  userData: any,
  openai: OpenAI
) {
  if (!templateContent) {
    throw new Error("Template content is missing");
  }
  if (!userData) {
    throw new Error("User data is missing");
  }

  // Log the input data
  console.log("Processing proposal with:", { templateContent, userData });

  const sanitizedUserData = sanitizeData(userData);
  console.log("Sanitized user data:", sanitizedUserData);
  const pricingData =
    sanitizedUserData?.pricingSection?.items?.map(
      (item: any, index: number) => ({
        description: item.description,
        amount: `[PRICE_${index}]`,
      })
    ) || [];

  const prompt = `
    You are a professional proposal writer. Your task is to generate a detailed proposal based on the given template and user data. Fill in the placeholders with appropriate content, expand on the ideas, and ensure the proposal is coherent and professional.

    Template:
    ${templateContent}

    User Data:
    Company Info: ${JSON.stringify(sanitizedUserData.companyInfo, null, 2)}
    
    Executive Summary: ${
      sanitizedUserData.companyInfo.executiveSummary || "[EXECUTIVE_SUMMARY]"
    }

    Testimonials: ${JSON.stringify(sanitizedUserData.testimonials, null, 2)}

    Projects: ${JSON.stringify(sanitizedUserData.projects, null, 2)}

    Team Members: ${JSON.stringify(
      sanitizedUserData.teamMembers.map((member: any) => ({
        position: member.position,
        bio: member.bio,
      })),
      null,
      2
    )}

    Pricing: ${JSON.stringify(pricingData, null, 2)}

    Instructions:
    1. Use the provided template as a structure for the proposal.
    2. Fill in the placeholders (e.g., [COMPANY_NAME], [TEAM_MEMBER_0_NAME]) with appropriate content based on the user data.
    3. Expand on the ideas and add relevant details to make the proposal comprehensive and persuasive.
    4. Maintain a professional tone throughout the document.
    5. Do not invent or hallucinate any specific financial figures or company details not provided in the user data.
    6. If you need more information for a section, use general, non-specific language instead of making up details.
    7. Ensure that your response is in HTML format, compatible with the Quill rich text editor.
    8. Preserve all HTML tags and classes from the original template.
    9. Use appropriate HTML tags for formatting (e.g., <p>, <h1>, <h2>, <ul>, <li>, etc.).
    10. For pricing, use placeholders like [PRICE_0], [PRICE_1], etc., which will be replaced later with actual prices.

    Please generate the complete proposal based on these instructions, maintaining the HTML structure of the template.
  `;
  console.log("Prompt:", prompt);

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4o",
    });

    if (
      !completion ||
      !completion.choices ||
      !completion.choices[0] ||
      !completion.choices[0].message
    ) {
      throw new Error("Invalid response from OpenAI API");
    }

    let generatedContent = completion.choices[0].message.content || "";

    // Add null checks before using userData
    if (userData && userData.data) {
      generatedContent = replaceTokens(generatedContent, userData.data);

      if (userData.data.pricingSection && userData.data.pricingSection.items) {
        userData.data.pricingSection.items.forEach(
          (item: any, index: number) => {
            const regex = new RegExp(`\\[PRICE_${index}\\]`, "g");
            generatedContent = generatedContent.replace(
              regex,
              item.amount ? item.amount.toString() : "[PRICE]"
            );
          }
        );
      }
    }

    if (!generatedContent.trim().startsWith("<")) {
      generatedContent = `<div class="ql-editor">${generatedContent}</div>`;
    }

    return generatedContent;
  } catch (error) {
    console.error("Error processing proposal with AI:", error);
    throw error;
  }
}
