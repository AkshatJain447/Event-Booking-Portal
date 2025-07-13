import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * OfferModal component for creating or editing an offer.
 * Props:
 * - isOpen: boolean, whether modal is visible
 * - onClose: function to close modal
 * - onSuccess: callback after successful creation/update
 * - initialData: (optional) object with existing offer data
 */

const OfferModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Both title and description are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://event-booking-portal.onrender.com/api/offers",
        // "http://localhost:5000/api/offers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      toast.success(`Offer created successfully`);
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Submission failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold pb-3 border-b">
          Create New Offer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="title"
            placeholder="Offer Title"
            value={formData.title}
            onChange={handleChange}
            className="input w-full border py-2 px-3 rounded-md"
            required
          />
          <textarea
            name="description"
            placeholder="Offer Description"
            value={formData.description}
            onChange={handleChange}
            className="input w-full h-24 resize-none border py-2 px-3 rounded-md"
            required
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded-lg shadow-lg hover:bg-red-100 hover:text-red-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-accent3 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-accent2"
            >
              Create Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferModal;
