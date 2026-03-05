import PropTypes from "prop-types";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="bg-red-50 border border-red-200 rounded-xl p-5 text-center max-w-md mx-auto mt-12"
    >
      <p className="text-red-600 font-semibold mb-1">Something went wrong</p>
      <p className="text-red-500 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};