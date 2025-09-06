import React,{useState,useEffect,useRef} from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
import './FaqSection.css'
import { FaPlus, FaMinus } from 'react-icons/fa';
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
function FaqSection() {
  const [activeId, setActiveId] = useState(1);
  const imageRef = useRef(null)
  useEffect(()=>{
    gsap.fromTo(
      imageRef.current,
      {x : 0},
      { 
        x : -300,
        duration:2,
        ease : "power2.out",
        scrollTrigger : {
          trigger : imageRef.current,
          start:"top 50%",
          end : " top 60%",
          scrub : true,
          markers:false
        }
      }
    )
  },[])
  const toggleFaq = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };
  return (
    <section className="faq-container mt-15">
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
            <div className='faq-image-div' ref={imageRef}>
              <img
          src="./chicken-legs-with-herbs.png"
          alt="FAQ Illustration"
          className="faq-image"
        />
        </div>
    </section>
  )
}

export default FaqSection
