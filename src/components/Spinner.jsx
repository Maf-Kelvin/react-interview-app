import PropTypes from "prop-types";

export default function Spinner({ fullPage = false }) {
  const spinner = (
    <div
      role="status"
      aria-label="Loading"
      className="w-10 h-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"
    />
  );

  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        {spinner}
      </div>
    );
  }

  return <div className="flex justify-center py-16">{spinner}</div>;
}

Spinner.propTypes = {
  fullPage: PropTypes.bool,
};