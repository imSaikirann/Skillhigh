import React, { useState, useEffect } from "react";
import axios from "../auth/axiosConfig";
import Alert from '../components/Alert';

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  console.log(selectedFAQ)
  // Fetch FAQs on component mount
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get("/api/v1/faqs/getFAQs");
        setFaqs(response.data.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  // Handle form submission for adding or updating FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the question ends with a question mark
    if (!question.endsWith("?")) {
    
      setAlertMessage("Question must end with a question mark.");
      setAlertVisible(true);
      return;
    }
  
    try {
      if (editMode) {
        console.group(selectedFAQ.id)
       const res =  await axios.put(`/api/v1/faqs/updateFAQ/${selectedFAQ.id}`, {
          question,
          answer,
        });
  
     
        setFaqs(
          faqs.map((faq) =>
            faq.id === selectedFAQ.id ? { ...faq, question, answer } : faq
          )
        );
        setAlertMessage(res.data.message);
        setAlertVisible(true);
        setEditMode(false);
      } else {
       
       const res =  await axios.post("/api/v1/faqs/addFAQ", { question, answer });
       console.log(res.data)
        setFaqs([...faqs, { question, answer }]);
        setAlertMessage(res.data.message);
        setAlertVisible(true);
      
      }
  
      // Clear the form fields after submission
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error saving FAQ:", error);
      if (error.response) {
        console.error("Error Response:", error.response.data);
        setAlertMessage(error.response.data.message || "Something went wrong.");
        setAlertVisible(true);
      }
    }
  };
  
  
  
  const handleAlertClose = () => {
    setAlertVisible(false);
};
  // Handle delete FAQ
  const handleDelete = async (id) => {
    try {
     const res= await axios.delete(`/api/v1/faqs/deleteFAQ/${id}`);
      setFaqs(faqs.filter((faq) => faq.id !== id));
      setAlertMessage(res.data.message);
      setAlertVisible(true);
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  // Handle edit FAQ
  const handleEdit = (faq) => {
    setEditMode(true);
    setSelectedFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  return (
    <div className="container mx-auto p-4 sm:pl-80 font-poppins">
         <Alert 
                message={alertMessage} 
                isVisible={alertVisible} 
                onClose={handleAlertClose} 
            />
      <h2 className="text-2xl font-bold mb-4">FAQs</h2>
      
      {/* FAQ Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-main text-white p-2 rounded"
        >
          {editMode ? "Update FAQ" : "Add FAQ"}
        </button>
      </form>

      {/* FAQs List */}
      <div className="faq-list">
        {faqs.length === 0 ? (
          <p>No FAQs available</p>
        ) : (
          faqs.map((faq) => (
            <div key={faq.id} className="faq-item border-b py-4">
              <h3 className="text-xl">{faq.question}</h3>
              <p>{faq.answer}</p>
              <div className="actions mt-2">
                <button
                  onClick={() => handleEdit(faq)}
                  className="bg-yellow-400 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
