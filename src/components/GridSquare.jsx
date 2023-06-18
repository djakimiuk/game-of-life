import PropTypes from "prop-types";
function GridSquare(props) {
  const classes = `grid-square color-${props.color}`;
  return <div className={classes} onClick={props.onClick}></div>;
}

GridSquare.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default GridSquare;
