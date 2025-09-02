import React,{useState} from 'react'
import './FaqSection.css'
import { FaPlus, FaMinus } from 'react-icons/fa';
function FaqSection() {

    const faqs = [
        {
          id: 1,
          question: "How do you ensure the meat stays fresh during delivery?",
          answer:
            "The vast majority of products that we sell are fresh and have never been frozen. A small selection of our products, like some of our sausages, are frozen to ensure that they remain at their peak freshness.",
        },
        {
          id: 2,
          question: "Can I choose the cuts of meat in my order?",
          answer:
            "Yes, you can choose the cuts of meat when placing your order. We offer customization depending on the product.",
        },
        {
          id: 3,
          question: "What if I’m not home for my delivery?",
          answer:
            "If you’re not home, our team will follow the delivery instructions you provided at checkout to ensure safe storage.",
        },
        {
          id: 4,
          question: "Do you offer any guarantees on your meat?",
          answer:
            "Absolutely! We guarantee the quality and freshness of all our products. If you’re not satisfied, we’ll make it right.",
        },
      ];

        // Default open first FAQ
  const [activeId, setActiveId] = useState(1);

  const toggleFaq = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };
  return (
    <section className="faq-container">
      <div className="faq-left">

      </div>

      <div className="faq-right">
        <p className="faq-subtitle">Have a Question</p>
        <h2 className="faq-title">Do You Have Any Questions ?</h2>

        <div className="faq-accordion">
        {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${activeId === faq.id ? "active" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => toggleFaq(faq.id)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {activeId === faq.id ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              {activeId === faq.id && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
            <div className='faq-image-div'>
              <img
          src="https://demo2.wpopal.com/meatlers/wp-content/uploads/2024/12/h2_img1.png"
          alt="FAQ Illustration"
          className="faq-image"
        />
        </div>
    </section>
  )
}

export default FaqSection
