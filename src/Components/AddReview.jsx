import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Textarea, Modal } from 'flowbite-react';
import { HiOutlineExclamation } from 'react-icons/hi';
import React from 'react';
import Review from './Review';

const Star = ({ selected, onSelect }) => (
  <span
    onClick={onSelect}
    style={{
      cursor: 'pointer',
      fontSize: '24px',
      color: selected ? 'gold' : 'black',
    }}
  >
    {selected ? '★' : '☆'}
  </span>
);

const StarRating = ({ totalStars, rating, onRatingChange }) => (
  <div>
    {[...Array(totalStars)].map((_, index) => (
      <Star
        key={index}
        selected={index < rating}
        onSelect={() => onRatingChange(index + 1)}
      />
    ))}
  </div>
);

export default function AddReview() {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [commentError, setCommentError] = useState(null);
  const [ratingError, setRatingError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await fetch('/api/auth/getReview');
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getReview();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch('/api/auth/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment, rating: rating, userID: currentUser._id }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setRating(0);
        setCommentError(null);
        setRatingError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
      setRatingError(error.message);
    }
  };

  const handleEdit = (editedComment) => {
    setComments((prevComments) =>
      prevComments.map((c) => (c._id === editedComment._id ? { ...c, content: editedComment.content } : c))
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/auth/deleteReview/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3 " >
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p> Signed in as: </p>
          <Link className="text-xs text-cyan-600 hover:underline" to={`/@${currentUser.username}`}>
            @{currentUser.username || currentUser.InstructorName}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}

      {!currentUser?.isAdmin && !currentUser?.isInstructor && (
        <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
          {/* Star Rating */}
          <div className="flex items-center gap-3 mb-5">
            <p className="text-gray-500">Rate:</p>
            <StarRating totalStars={5} rating={rating} onRatingChange={setRating} />
          </div>

          <Textarea
            placeholder="Add a comment..."
            rows={'3'}
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />

          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">{200 - comment.length} characters remaining</p>
            <Button outline type="submit">
              Submit
            </Button>
          </div>

          {(commentError || ratingError) && (
            <Alert color={'failure'} className="mt-5">
              {commentError}
              {ratingError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5"> No comments yet! </p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p> Comments </p>
            <div className="border border-gray-400 py1 px-2 rounded-sm">
              <p> {comments.length} </p>
            </div>
          </div>

          {comments.map((comment) => (
            <Review
              key={comment._id}
              review={comment}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body className="text-center">
          <HiOutlineExclamation className="h-14 w-14 text-gray-400 mb-4 mx-auto dark:text-gray-200" />
          <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the comment?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => handleDelete(commentToDelete)}>
              Yes, I'm Sure
            </Button>
            <Button color="gray" onClick={() => setShowModal(false)}>
              No, Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
