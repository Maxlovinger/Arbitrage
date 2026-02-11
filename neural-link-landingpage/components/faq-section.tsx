import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Is the Neural Link procedure safe?",
      answer:
        "Yes, the procedure is performed by a precision surgical robot and has been extensively tested. All materials are biocompatible and FDA-approved for medical use.",
    },
    {
      question: "How long does the surgery take?",
      answer:
        "The minimally invasive procedure typically takes 2-3 hours and is performed under local anesthesia with sedation.",
    },
    {
      question: "Can the device be removed?",
      answer:
        "Yes, the Neural Link is designed to be fully reversible. The device can be safely removed if needed, though this is rarely necessary.",
    },
    {
      question: "What does it feel like to use Neural Link?",
      answer:
        "Users report that controlling devices with their thoughts feels natural and intuitive after a brief learning period. There's no physical sensation from the implant itself.",
    },
    {
      question: "How long does the battery last?",
      answer:
        "The device is wirelessly charged and can operate for a full day on a single charge. Charging is done through an external device placed near the head.",
    },
    {
      question: "Who is eligible for Neural Link?",
      answer:
        "Currently, we're focusing on individuals with severe paralysis. Eligibility is determined through a comprehensive medical evaluation process.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Get answers to common questions about Neural Link technology, safety, and the patient experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
