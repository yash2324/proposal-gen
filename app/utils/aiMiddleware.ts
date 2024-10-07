import OpenAI from "openai";
import Groq from "groq-sdk";
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
  groq: any
) {
  if (!templateContent) {
    throw new Error("Template content is missing");
  }
  if (!userData) {
    throw new Error("User data is missing");
  }

  const { anonymizedData, map } = anonymizeData(userData);

  const prompt = `
  You are a professional proposal writer. Your task is to generate a detailed proposal based on the given data.

  Data:
  ${JSON.stringify(anonymizedData)}

  Generate a proposal including sections for executive summary, company info, testimonials, projects, pricing, and team members. Format the output as an HTML component . Dont give me the whole boiler plate with styles and everything just refer to the example and generate similar tags with everything required.Do not include \`\`\`html or \`\`\` tags at the start or end of the response.

  Ensure the Output:
  - Strictly adhere to the Data given to you do not hallucinate things at all regarding the data present only the anonymized Data thats given to you is the data that is present so if you take any other value it will mess up the whole response.
  - Add more sections yourself that highlight how good the company may be etc. just do not add facts or numbers that are not present in the Data rest add all possible sections.
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
    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "llama-3.1-70b-versatile",
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

    for (const [placeholder, value] of map.entries()) {
      generatedContent = generatedContent.split(placeholder).join(value);
    }

    return generatedContent;
  } catch (error) {
    console.error("Error processing proposal with AI:", error);
    throw error;
  }
}
