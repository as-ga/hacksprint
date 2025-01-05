"use client";
import { useEffect, useState } from "react";
import { useSession} from "next-auth/react";

export default function MockTestsPage() {
  const { data: session } = useSession();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('/api/mock-test');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
        setError('Failed to load quizzes');
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleSubmit = async (e, quizId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = Array.from(formData.entries()).map(([key, value]) => value);

    if (!session) {
      setError('You must be logged in to submit the quiz');
      return;
    }

    try {
      const response = await fetch('/api/mock-test/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizId, answers, userId: session.user.id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults((prevResults) => ({
        ...prevResults,
        [quizId]: data.score,
      }));
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Mock Tests</h2>
      {error && <p className="text-red-500">{error}</p>}
      {!selectedQuiz ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleQuizSelect(quiz)}
            >
              <h3 className="text-2xl font-bold mb-2">{quiz.topic}</h3>
              <p className="text-gray-700 mb-4">Questions: {quiz.questions.length}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">{selectedQuiz.topic}</h3>
          <form onSubmit={(e) => handleSubmit(e, selectedQuiz._id)}>
            {selectedQuiz.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-700 mb-2">{question.question}</p>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        className="form-radio"
                        required
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </form>
          {results[selectedQuiz._id] !== undefined && (
            <p className="mt-4 text-green-500">
              Your score: {results[selectedQuiz._id]} / {selectedQuiz.questions.length}
            </p>
          )}
          <button
            onClick={() => setSelectedQuiz(null)}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Back to Quizzes
          </button>
        </div>
      )}
    </div>
  );
}