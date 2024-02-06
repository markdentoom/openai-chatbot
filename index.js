// LangChain documentation on QA chatbots
// https://js.langchain.com/docs/use_cases/question_answering/

const sample_qa = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking on the 'Forgot Password' link on the login page, then following the prompts.",
  },
  {
    question: "Where can I view my order history?",
    answer:
      "You can view your order history by logging into your account and navigating to the 'Order History' section.",
  },
  {
    question: "How do I update my shipping address?",
    answer:
      "You can update your shipping address by going to the 'My Account' page, then clicking on 'Address Book' and adding or updating your address.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Our return policy allows returns within 30 days of purchase, provided the item is in its original condition.",
  },
  {
    question: "Where is my order?",
    answer:
      "You can track your order status by logging into your account and going to the 'Order History' section.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact customer support by calling our helpline at 1-800-123-4567 or by emailing support@example.com.",
  },
  {
    question: "Do you offer expedited shipping?",
    answer:
      "Yes, we offer expedited shipping options at checkout for an additional fee.",
  },
  {
    question: "How do I cancel my order?",
    answer:
      "To cancel your order, please contact customer support as soon as possible. Note that orders already shipped cannot be canceled.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, American Express, Discover, and PayPal.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, we take data security very seriously and implement strong security measures to protect your personal information.",
  },
  {
    question: "Do you have a physical store location?",
    answer:
      "Yes, we have physical store locations. Please visit our 'Store Locator' page on our website to find a store near you.",
  },
  {
    question: "How do I track my shipment?",
    answer:
      "You can track your shipment by using the tracking number provided in your shipping confirmation email.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes, we offer complimentary gift wrapping at checkout.",
  },
  {
    question: "How do I create an account?",
    answer:
      "You can create an account by clicking on the 'Sign Up' button on our website and following the prompts.",
  },
  {
    question: "Can I change my order after placing it?",
    answer:
      "It may be possible to change your order if it has not yet been processed. Please contact customer support for assistance.",
  },
]

// Setting the api key this way because windows powershell doesn't
// recognize exports
process.env["OPENAI_API_KEY"] = ""

import { Document } from "@langchain/core/documents"
import { OpenAIEmbeddings } from "@langchain/openai"
import { MemoryVectorStore } from "langchain/vectorstores/memory"

const questionsDocs = sample_qa.map(
  (qa, index) =>
    new Document({ pageContent: qa.question, metadata: { index: index } })
)
const embeddings = new OpenAIEmbeddings()
const vectorStore = await MemoryVectorStore.fromDocuments(
  questionsDocs,
  embeddings
)

async function getanswer(question) {
  const relevantDocs = await vectorStore.similaritySearch(question)
  const answer = sample_qa[relevantDocs[0].metadata.index].answer
  return answer
}

console.log(await getanswer("I can't log in. What should I do?"))
console.log(await getanswer("How do I update my address?"))
console.log(await getanswer("How do I delete my account?"))
