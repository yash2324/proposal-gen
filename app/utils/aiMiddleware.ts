import OpenAI from "openai";

const anonymizeData = (data: any) => {
  const map = new Map();
  let counter = 0;

  const replaceSensitiveInfo = (obj: any): any => {
    if (typeof obj === "string" && obj.includes("@")) {
      const placeholder = `[EMAIL_${counter++}]`;
      map.set(placeholder, obj);
      return placeholder;
    }
    if (typeof obj === "string" && obj.includes("http")) {
      const placeholder = `[URL_${counter++}]`;
      map.set(placeholder, obj);
      return placeholder;
    }
    if (typeof obj === "string" && /\d{2,}/.test(obj)) {
      const placeholder = `[NUMBER_${counter++}]`;
      map.set(placeholder, obj);
      return placeholder;
    }
    if (typeof obj === "string") {
      const placeholder = `[TEXT_${counter++}]`;
      map.set(placeholder, obj);
      return placeholder;
    }
    if (Array.isArray(obj)) {
      return obj.map(replaceSensitiveInfo);
    }
    if (typeof obj === "object" && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          replaceSensitiveInfo(value),
        ])
      );
    }
    return obj;
  };

  const anonymizedData = replaceSensitiveInfo(data);
  return { anonymizedData, map };
};

export async function processProposalWithAI(
  templateContent: string,
  userData: any,
  openai: OpenAI
) {
  console.log(userData, "user data");
  if (!templateContent) {
    throw new Error("Template content is missing");
  }
  if (!userData) {
    throw new Error("User data is missing");
  }

  console.log("Processing proposal with:", { templateContent, userData });
  const { anonymizedData, map } = anonymizeData(userData);

  const prompt = `
  You are a professional proposal writer. Your task is to generate a detailed proposal based on the given data.

  Data:
  ${JSON.stringify(anonymizedData)}

  Generate a proposal including sections for executive summary, company info, testimonials, projects, pricing, and team members. Format the output as an HTML component . Dont give me the whole boiler plate with styles and everything just refer to the example and generate similar tags with everything required.Do not include \`\`\`html or \`\`\` tags at the start or end of the response.

  Ensure the Output:
  - Does not use excessive <br> tags.
  - Sizes the logo appropriately.
  - You can add sections like Next Steps , Why we are better , Strategy,Dissemination,Project Activity, Methodology and Outcomes,Abstract/Summary etc. on a non specific manner to make the proposal more detailed.
  - Formats text clearly and concisely.
  - Wherever you have to include pricing data use the following format for the pricing table:  <p>Basic Package: <p class="ql-align-right">$5,000</p></p>
  <p>Pro Package: <p class="ql-align-right">$10,000</p></p>
  <p>Enterprise Package: <p class="ql-align-right">$20,000</p></p>
  <p><strong>Total: <p class="ql-align-right">$35,000</p></strong></p>
  Do not use other tags like span or div for the pricing table.
  - Do not include \`\`\`html or \`\`\` tags at the start or end of the response.
  Example:
  ${templateContent}
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
    console.log("AI output:", generatedContent);

    // Efficiently replace placeholders with actual values
    for (const [placeholder, value] of map.entries()) {
      generatedContent = generatedContent.split(placeholder).join(value);
    }

    // Ensure the generated content is properly formatted
    // if (!generatedContent.trim().startsWith("<")) {
    //   generatedContent = `<div class="ql-editor">${generatedContent}</div>`;
    // }

    return generatedContent;
  } catch (error) {
    console.error("Error processing proposal with AI:", error);
    throw error;
  }
}
