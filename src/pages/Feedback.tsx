import { useFeedback } from "@/hooks/useFeedback";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import type { Feedback } from "@/schemas/feedback.schema";

export default function Feedback() {
  const { feedbackQuery, approveFeedback, deleteFeedback } = useFeedback();

  const { data, isLoading, isError } = feedbackQuery;

  if (isLoading)
    return (
      <p className="text-center py-10 text-[var(--color-text-color)]">
        Loading feedback...
      </p>
    );

  if (isError)
    return (
      <p className="text-center py-10 text-[var(--color-error)]">
        Error loading feedback
      </p>
    );

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
    <div className="p-6 bg-[var(--color-main-bg)] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[var(--color-text-color)]">
        Feedback Management
      </h1>

      <div className="grid gap-4">
        {data?.map((feedback: Feedback) => (
          <div
            key={feedback.id}
            className="border rounded-xl p-4 shadow-md 
            bg-[var(--color-card)] 
            border-[var(--color-border)] 
            shadow-[0_2px_6px_var(--color-shadow)]"
          >
            {/* Message */}
            <p className="text-[var(--color-text-color)] mb-2">
              {feedback.message}
            </p>

            {/* Rating */}
            <p className="text-[var(--color-pie-2)] font-semibold mb-2">
              {feedback.rating} / 5
            </p>

            {/* Email */}
            <p className="text-sm text-[var(--color-muted-foreground)] mb-2">
              {feedback.userEmail}
            </p>

            {/* Status */}
            <p className="mb-3 text-[var(--color-text-color)]">
              Status:{" "}
              {feedback.approved ? (
                <span className="text-[var(--color-green)] font-semibold">
                  Approved
                </span>
              ) : (
                <span className="text-[var(--color-error)] font-semibold">
                  Pending
                </span>
              )}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              {!feedback.approved && feedback.id !== undefined && (
                <button
                  onClick={() => approveFeedback(feedback.id!)}
                  className="px-4 py-2 rounded-lg 
                  bg-[var(--color-green)] 
                  text-[var(--color-button-text)] 
                  hover:opacity-90 
                  transition"
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => handleDelete(feedback.id!)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg 
                bg-[var(--color-error)] 
                text-[var(--color-button-text)] 
                hover:opacity-90 
                transition"
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