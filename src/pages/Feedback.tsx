import { useFeedback } from "@/hooks/useFeedback";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import type { Feedback } from "@/schemas/feedback.schema";

export default function Feedback() {
  const { feedbackQuery, approveFeedback, deleteFeedback } = useFeedback();

  const { data, isLoading, isError } = feedbackQuery;

  if (isLoading) return <p>Loading feedback...</p>;
  if (isError) return <p>Error loading feedback</p>;

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This feedback will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFeedback(id);
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Feedback Management</h1>

      <div className="grid gap-4">
        {data?.map((feedback: Feedback) => (
          <div
            key={feedback.id}
            className="border rounded-xl p-4 shadow-md bg-white"
          >
            {/* Message */}
            <p className="text-gray-800 mb-2">{feedback.message}</p>

            {/* Rating */}
            <p className="text-yellow-500 mb-2">
               {feedback.rating} / 5
            </p>

            {/* Email */}
            <p className="text-sm text-gray-500 mb-2">
              {feedback.userEmail}
            </p>

            {/* Status */}
            <p className="mb-3">
              Status:{" "}
              {feedback.approved ? (
                <span className="text-green-600 font-semibold">
                  Approved
                </span>
              ) : (
                <span className="text-red-500 font-semibold">
                  Pending
                </span>
              )}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              {!feedback.approved && feedback.id !== undefined && (
                <button
                  onClick={() => approveFeedback(feedback.id!)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => handleDelete(feedback.id!)}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}